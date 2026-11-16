"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useMount, useWindowSize } from "react-use";
import { toast } from "sonner";

import {
  completeJumpUnit,
  completeLessonBonus,
  completePracticeSession,
  submitChallengeAnswer,
} from "@/actions/challenge-progress";
import { Button } from "@/components/ui/button";
import { DAILY_ENERGY, MAX_HEARTS } from "@/constants";
import { challengeOptions, challenges, userSubscription } from "@/db/schema";
import type { Exercise, VocabItem } from "@/lib/exercise-types";
import { useEnergyModal } from "@/store/use-energy-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { useSettings } from "@/store/use-settings";

import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { Header } from "./header";
import { QuestionBubble } from "./question-bubble";
import { ResultCard } from "./result-card";
import { RichChallenge } from "./rich-challenge";
import { VocabModal } from "./vocab-modal";

type QuizChallenge = typeof challenges.$inferSelect & {
  completed: boolean;
  challengeOptions: (typeof challengeOptions.$inferSelect)[];
  payload?: Exercise | null;
};

type QuizProps = {
  initialPercentage: number;
  initialHearts: number;
  initialGems?: number;
  initialEnergy?: number;
  initialLessonId: number;
  lessonTitle?: string;
  lessonVocab?: VocabItem[] | null;
  initialLessonChallenges: QuizChallenge[];
  userSubscription:
    | (typeof userSubscription.$inferSelect & {
        isActive: boolean;
      })
    | null;
  isLegendary?: boolean;
  mode?: "normal" | "legendary" | "jump" | "practice";
  jumpUnitId?: number;
  jumpUnitOrder?: number;
  practiceMode?: string;
};

export const Quiz = ({
  initialPercentage,
  initialHearts,
  initialGems = 100,
  initialEnergy = DAILY_ENERGY,
  initialLessonId,
  lessonTitle = "Bài học",
  lessonVocab,
  initialLessonChallenges,
  userSubscription,
  isLegendary = false,
  mode,
  jumpUnitId,
  jumpUnitOrder,
  practiceMode,
}: QuizProps) => {
  const effectiveMode =
    mode ?? (isLegendary ? "legendary" : "normal");
  const isJumpMode = effectiveMode === "jump";
  const isPracticeMode = effectiveMode === "practice";

  const { animations, playSound, triggerVibrate } = useSettings();
  const { width, height } = useWindowSize();

  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const { open: openPracticeModal } = usePracticeModal();
  const { open: openEnergyModal } = useEnergyModal();

  // Vocab preview modal (khong bat trong che do Hoc vuot / Luyen tap)
  const hasVocab =
    !isJumpMode &&
    !isPracticeMode &&
    Boolean(lessonVocab && lessonVocab.length > 0);
  const [isVocabOpen, setIsVocabOpen] = useState(
    () => hasVocab && initialPercentage !== 100
  );

  useMount(() => {
    if (!isJumpMode && !isPracticeMode && initialPercentage === 100) {
      openPracticeModal();
    }
  });

  const [lessonId] = useState(initialLessonId);
  const [gems] = useState(initialGems);
  const [energy, setEnergy] = useState(initialEnergy);
  const [jumpHearts, setJumpHearts] = useState(
    isJumpMode ? MAX_HEARTS : initialHearts
  );
  const [isJumpFailed, setIsJumpFailed] = useState(false);

  const [streak, setStreak] = useState(0);
  const [startTime] = useState<number>(() => Date.now());
  const [mistakesCount, setMistakesCount] = useState(0);

  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });

  const [challengesList, setChallengesList] = useState(initialLessonChallenges);
  const [totalQuestions] = useState(initialLessonChallenges.length);
  const [correctAnswerText, setCorrectAnswerText] = useState<string | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challengesList.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number | string>();
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none");
  const completedSubmittedRef = useRef(false);

  const challenge = challengesList[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    if (isJumpMode && jumpHearts <= 0) {
      setIsJumpFailed(true);
      return;
    }
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (val: number | string) => {
    if (status !== "none") return;
    setSelectedOption(val);
  };

  // override: dung cho nut "Hien khong nghe duoc" / "Hien khong noi duoc" (bo qua = tinh sai)
  const onContinue = (override?: unknown) => {
    const answer = typeof override === "string" ? override : selectedOption;
    if (status === "none" && (answer === undefined || answer === "")) return;

    if (status === "wrong") {
      if (isJumpMode && jumpHearts <= 0) {
        setIsJumpFailed(true);
        return;
      }
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      setCorrectAnswerText(null);
      return;
    }

    if (status === "correct") {
      onNext();
      setStatus("none");
      setSelectedOption(undefined);
      setCorrectAnswerText(null);
      return;
    }

    // 1. Kiem tra tinh dung sai cua dap an va lay dap an dung
    let isCorrect = false;
    let computedCorrectAnswer = "";

    const norm = (s: string) =>
      s
        .trim()
        .toLowerCase()
        .replace(/[.!?,']/g, "")
        .replace(/\s+/g, " ");

    if (challenge.type === "EXERCISE" && challenge.payload) {
      const p = challenge.payload;
      if (p.kind === "choice") {
        const correctChoice = p.options.find((o) => o.correct);
        isCorrect = correctChoice?.text === answer;
        computedCorrectAnswer = correctChoice?.text || "";
      } else if (p.kind === "real-word") {
        const expected = p.isReal ? "true" : "false";
        isCorrect = answer === expected;
        computedCorrectAnswer = p.isReal
          ? `"${p.word}" là từ tiếng Anh có nghĩa`
          : `"${p.word}" là từ không có nghĩa`;
      } else if (p.kind === "listen-type") {
        isCorrect = norm(String(answer)) === norm(p.audio);
        computedCorrectAnswer = p.audio;
      } else if (p.kind === "type-missing") {
        isCorrect = norm(String(answer)) === norm(p.answer);
        computedCorrectAnswer = p.answer;
      } else if (p.kind === "fill-letters") {
        const typed = norm(String(answer));
        isCorrect =
          typed === norm(p.answer) || typed === norm(p.prefix + p.answer);
        computedCorrectAnswer = p.prefix + p.answer;
      } else if (p.kind === "build") {
        isCorrect = norm(String(answer)) === norm(p.answer);
        computedCorrectAnswer = p.answer;
      } else if (p.kind === "speak") {
        if (answer === "__skip__") {
          isCorrect = false;
        } else {
          const targetWords = norm(p.text).split(" ").filter(Boolean);
          const spokenWords = new Set(norm(String(answer)).split(" ").filter(Boolean));
          const hits = targetWords.filter((w) => spokenWords.has(w)).length;
          isCorrect =
            norm(String(answer)) === norm(p.text) ||
            (targetWords.length > 0 && hits / targetWords.length >= 0.5);
        }
        computedCorrectAnswer = p.text;
      } else if (p.kind === "write") {
        const typed = norm(String(answer));
        isCorrect = p.accepted.some((acc) => norm(acc) === typed);
        computedCorrectAnswer = p.accepted[0] || "";
      } else {
        isCorrect = true;
      }
    } else {
      // Standard SELECT / ASSIST challenge
      const correctOption = options.find((opt) => opt.correct);
      isCorrect = correctOption?.id === answer;
      computedCorrectAnswer = correctOption?.text || "";
    }

    // 2. Phan hoi ngay lap tuc tren giao dien
    if (isCorrect) {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      playSound("/correct.wav");
      triggerVibrate(80);
      setStatus("correct");
      setPercentage((prev) =>
        totalQuestions === 0
          ? prev
          : Math.min(100, prev + 100 / totalQuestions)
      );
    } else {
      setMistakesCount((prev) => prev + 1);
      setStreak(0);
      playSound("/incorrect.wav");
      triggerVibrate([100, 50, 100]);
      setStatus("wrong");
      setCorrectAnswerText(computedCorrectAnswer);

      if (isJumpMode) {
        const remainingHearts = Math.max(0, jumpHearts - 1);
        setJumpHearts(remainingHearts);
        if (remainingHearts === 0) {
          toast.error("Bạn đã sai đủ 5 lần và hết trái tim!");
          setTimeout(() => {
            setIsJumpFailed(true);
          }, 900);
        } else {
          toast.warning(`Mất 1 trái tim! Còn ${remainingHearts}/5 trái tim.`);
        }
      } else {
        setChallengesList((prev) => [
          ...prev,
          { ...challenge, completed: false },
        ]);
      }
    }

    // 3. Dong bo len Server trong nen (KHONG tru energy trong che do jump)
    if (!isJumpMode) {
      startTransition(() => {
        submitChallengeAnswer({
          challengeId: challenge.id,
          isCorrect,
          streak,
          isLegendary,
          mode: effectiveMode,
          practiceMode,
        })
          .then((res) => {
            if (res?.error === "energy") {
              openEnergyModal();
              return;
            }

            if (res?.energy !== undefined) {
              setEnergy(res.energy);
            }

            if (isCorrect && res?.comboBonus && res.comboBonus > 0) {
              toast.success(
                `Thưởng ${res.stageLabel || "Mức 1"}! Đúng liên tiếp ${streak + 1} câu (+${res.comboBonus} năng lượng)`
              );
            }
          })
          .catch(() => {
            // Bo qua loi tam thoi
          });
      });
    }
  };

  // Hoan thanh bai hoc / Hoc vuot / Luyen tap
  useEffect(() => {
    if (!challenge && !isJumpFailed && !completedSubmittedRef.current) {
      completedSubmittedRef.current = true;
      playSound("/finish.mp3");
      const totalAttempts = Math.max(1, totalQuestions + mistakesCount);
      const computedAccuracy = Math.min(
        100,
        Math.max(10, Math.round((totalQuestions / totalAttempts) * 100))
      );

      if (isJumpMode && jumpUnitId) {
        completeJumpUnit(jumpUnitId).then((res) => {
          if (res?.success) {
            toast.success(
              `Chúc mừng! Bạn đã học vượt thành công và mở khóa Chương ${res.unlockedUnitOrder} (+50 KN)`
            );
          }
        });
      } else if (isPracticeMode) {
        completePracticeSession(
          practiceMode || "intensive",
          computedAccuracy
        ).then((res) => {
          if (res?.success) {
            toast.success(
              `Hoàn thành phiên Luyện tập! Nhận thưởng +${res.bonusPoints} KN`
            );
          }
        });
      } else {
        completeLessonBonus(lessonId, {
          isLegendary,
          accuracy: computedAccuracy,
        }).then((res) => {
          if (res?.bonus) {
            setEnergy(res.energy);
            toast.success(
              isLegendary
                ? `Hoàn thành Cấp độ Huyền Thoại! Thưởng +45 KN và +${res.bonus} Năng lượng`
                : `Hoàn thành bài học! Thưởng Mức 2: +${res.bonus} Năng lượng`
            );
          }
        });
      }
    }
  }, [
    challenge,
    isJumpFailed,
    isJumpMode,
    jumpUnitId,
    isPracticeMode,
    practiceMode,
    lessonId,
    playSound,
    isLegendary,
    totalQuestions,
    mistakesCount,
  ]);

  // Man hinh that bai khi sai 5 lan trong Hoc vuot ("sai 5 lan la cut")
  if (isJumpMode && isJumpFailed) {
    return (
      <div className="flex h-full flex-col justify-between bg-white">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-8 text-center">
          <div className="relative mb-4 h-36 w-36">
            <Image
              src="/mascot_sad.svg"
              alt="Hết trái tim"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="mb-4 flex items-center gap-2 rounded-full border-2 border-rose-200 bg-rose-50 px-4 py-1.5">
            <Image src="/heart.svg" alt="Trái tim" width={20} height={20} />
            <span className="text-sm font-black text-rose-600">
              0 / 5 Trái tim
            </span>
          </div>

          <h1 className="text-2xl font-black tracking-tight text-neutral-800 sm:text-3xl">
            Bạn đã hết trái tim!
          </h1>
          <p className="mt-2 text-sm font-medium leading-relaxed text-neutral-500 sm:text-base">
            Bạn đã trả lời sai 5 lần trong bài kiểm tra Học vượt{" "}
            {jumpUnitOrder ? `Chương ${jumpUnitOrder}` : ""}. Hãy ôn luyện thêm
            các bài trước rồi quay lại thử sức nhé!
          </p>
        </div>

        <div className="border-t-2 border-slate-200 bg-white p-4">
          <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
            <Button
              variant="secondary"
              className="h-12 flex-1 rounded-2xl font-black uppercase"
              onClick={() => router.push("/learn")}
            >
              QUAY LẠI TRANG HỌC
            </Button>
            <Button
              variant="primaryOutline"
              className="h-12 flex-1 rounded-2xl border-2 border-slate-200 font-black uppercase"
              onClick={() => window.location.reload()}
            >
              THỬ LẠI HỌC VƯỢT
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Man hinh ket thuc bai hoc / Hoc vuot / Luyen tap
  if (!challenge) {
    const elapsedSeconds = Math.max(
      1,
      Math.floor((Date.now() - startTime) / 1000)
    );
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const speedText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    const totalAttempts = Math.max(1, totalQuestions + mistakesCount);
    const accuracyPercentage = Math.min(
      100,
      Math.max(10, Math.round((totalQuestions / totalAttempts) * 100))
    );
    const earnedPoints = isJumpMode
      ? 50
      : isPracticeMode
        ? 15
        : isLegendary
          ? 45
          : totalQuestions * 10;
    const pointsDisplay =
      earnedPoints < 10 ? `0${earnedPoints}` : `${earnedPoints}`;

    const onShare = async () => {
      if (typeof navigator !== "undefined" && navigator.share) {
        try {
          await navigator.share({
            title: "TrioLingo",
            text: `Thành tích chói lọi! Tôi vừa hoàn thành bài học tiếng Anh với ${pointsDisplay} điểm KN và độ chính xác ${accuracyPercentage}%!`,
            url: window.location.origin,
          });
          return;
        } catch {
          // User cancelled share
        }
      }
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.origin);
        toast.success("Đã sao chép liên kết chia sẻ!");
      }
    };

    const headingText = isJumpMode
      ? `Vượt Chương ${jumpUnitOrder ?? ""} thành công!`
      : isPracticeMode
        ? "Hoàn thành Luyện tập!"
        : "Thành tích chói lọi!";

    const subtitleText = isJumpMode
      ? "Chúc mừng bạn đã vượt qua thử thách nâng cao và mở khóa chương mới"
      : isPracticeMode
        ? "Kỹ năng tiếng Anh của bạn đang tiến bộ từng ngày"
        : "Trình độ tiếng Anh của bạn đang ngày càng tiến bộ";

    return (
      <div className="flex h-full flex-col justify-between bg-white">
        {animations && (
          <Confetti
            recycle={false}
            numberOfPieces={500}
            tweenDuration={8_000}
            width={width}
            height={height}
          />
        )}

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-4 py-6 text-center">
          <div className="relative mb-3 h-48 w-48 sm:h-56 sm:w-56">
            <Image
              src="/mascot_celebrate.png"
              alt="Thành tích chói lọi"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#ffc800] sm:text-4xl">
            {headingText}
          </h1>
          <p className="mt-2 text-base font-semibold text-neutral-500 sm:text-lg">
            {subtitleText}
          </p>

          <div className="mt-8 grid w-full grid-cols-3 gap-3">
            <ResultCard variant="points" value={pointsDisplay} />
            <ResultCard variant="accuracy" value={`${accuracyPercentage}%`} />
            <ResultCard variant="speed" value={speedText} />
          </div>
        </div>

        <div className="border-t-2 border-slate-200 bg-white p-4">
          <div className="mx-auto flex max-w-md items-center gap-x-3">
            <Button
              variant="default"
              size="lg"
              className="h-14 w-14 shrink-0 rounded-2xl border-2 border-slate-200 bg-white p-0 text-sky-500 hover:bg-slate-50 active:translate-y-0.5"
              onClick={onShare}
              title="Chia sẻ thành tích"
            >
              <Share2 className="h-6 w-6 stroke-[2.5]" />
            </Button>

            <Button
              className="h-14 flex-1 rounded-2xl bg-[#00a2f9] hover:bg-[#0092df] text-base font-black uppercase tracking-wider text-white shadow-[0_4px_0_#007bc1] active:translate-y-1 active:shadow-none"
              onClick={() =>
                router.push(isPracticeMode ? "/practice" : "/learn")
              }
            >
              {isPracticeMode ? "VỀ LUYỆN TẬP" : "NHẬN KN"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isExercise = challenge.type === "EXERCISE" && challenge.payload;

  return (
    <>
      {hasVocab && lessonVocab && (
        <VocabModal
          isOpen={isVocabOpen}
          onStart={() => setIsVocabOpen(false)}
          vocab={lessonVocab}
          lessonTitle={lessonTitle}
        />
      )}

      <Header
        hearts={jumpHearts}
        gems={gems}
        percentage={percentage}
        energy={energy}
        hasActiveSubscription={!!userSubscription?.isActive}
        isLegendary={isLegendary}
        mode={effectiveMode}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-3 sm:px-6 pb-6 pt-3 sm:pt-6 lg:pt-8">
          {isJumpMode && (
            <div className="mb-3 flex items-center justify-between rounded-xl border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-bold text-[#ce287f]">
              <span>Thử thách Học vượt Chương {jumpUnitOrder}</span>
              <span>Độ khó nâng cao • Không trừ năng lượng</span>
            </div>
          )}

          {isExercise ? (
            <RichChallenge
              exercise={challenge.payload!}
              onSelect={onSelect}
              onSkip={() => onContinue("__skip__")}
              selectedAnswer={selectedOption}
              status={status}
              disabled={pending}
            />
          ) : (
            <>
              <h1 className="text-center text-lg font-bold text-neutral-700 lg:text-start lg:text-3xl">
                {challenge.type === "ASSIST"
                  ? "Chọn nghĩa chính xác"
                  : challenge.question}
              </h1>

              <div>
                {challenge.type === "ASSIST" && (
                  <QuestionBubble question={challenge.question} />
                )}

                <Challenge
                  options={options}
                  onSelect={(id) => onSelect(id)}
                  status={status}
                  selectedOption={
                    typeof selectedOption === "number"
                      ? selectedOption
                      : undefined
                  }
                  disabled={pending}
                  type={challenge.type}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <Footer
        disabled={
          pending ||
          (status === "none" &&
            (selectedOption === undefined || selectedOption === ""))
        }
        status={status}
        onCheck={onContinue}
        correctAnswer={correctAnswerText}
      />
    </>
  );
};
