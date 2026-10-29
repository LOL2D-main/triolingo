"use client";

import { useEffect, useState, useTransition } from "react";
import { Share2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useMount, useWindowSize } from "react-use";
import { toast } from "sonner";

import {
  completeLessonBonus,
  submitChallengeAnswer,
  upsertChallengeProgress,
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
}: QuizProps) => {
  const { animations, playSound, triggerVibrate } = useSettings();
  const { width, height } = useWindowSize();

  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const { open: openPracticeModal } = usePracticeModal();
  const { open: openEnergyModal } = useEnergyModal();

  // Vocab preview modal
  const hasVocab = Boolean(lessonVocab && lessonVocab.length > 0);
  const [isVocabOpen, setIsVocabOpen] = useState(
    () => hasVocab && initialPercentage !== 100
  );

  useMount(() => {
    if (initialPercentage === 100) openPracticeModal();
  });

  const [lessonId] = useState(initialLessonId);
  const [gems, setGems] = useState(initialGems);
  const [energy, setEnergy] = useState(initialEnergy);
  const [streak, setStreak] = useState(0);
  const [startTime] = useState<number>(() => Date.now());
  const [mistakesCount, setMistakesCount] = useState(0);

  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });

  const [challengesList, setChallengesList] = useState(initialLessonChallenges);
  const [totalQuestions] = useState(initialLessonChallenges.length);
  const [correctAnswerText, setCorrectAnswerText] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challengesList.findIndex(
      (challenge) => !challenge.completed
    );
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number | string>();
  const [status, setStatus] = useState<"none" | "wrong" | "correct">("none");

  const challenge = challengesList[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  const onNext = () => {
    setActiveIndex((current) => current + 1);
  };

  const onSelect = (val: number | string) => {
    if (status !== "none") return;
    setSelectedOption(val);
  };

  // override: dung cho nut "Hien khong nghe duoc" (bo qua = tinh sai)
  const onContinue = (override?: unknown) => {
    const answer =
      typeof override === "string" ? override : selectedOption;
    if (answer === undefined || answer === "") return;

    if (status === "wrong") {
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
        .replace(/[.!?,]/g, "")
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
      } else {
        isCorrect = true;
      }
    } else {
      // Standard SELECT / ASSIST challenge
      const correctOption = options.find((opt) => opt.correct);
      isCorrect = correctOption?.id === answer;
      computedCorrectAnswer = correctOption?.text || "";
    }

    // 2. Phan hoi ngay lap tuc tren giao dien (0ms delay - cuc nhanh khong phai cho mang)
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
      setChallengesList((prev) => [
        ...prev,
        { ...challenge, completed: false },
      ]);
    }

    // 3. Dong bo len Server trong nen
    startTransition(() => {
      submitChallengeAnswer({
        challengeId: challenge.id,
        isCorrect,
        streak,
        isLegendary,
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
  };

  // Hoan thanh bai hoc: Phat am thanh va cong thuong Muc 2 (+4 nang luong, Huyen thoai +45 KN)
  useEffect(() => {
    if (!challenge) {
      playSound("/finish.mp3");
      const totalAttempts = Math.max(1, totalQuestions + mistakesCount);
      const computedAccuracy = Math.min(
        100,
        Math.max(10, Math.round((totalQuestions / totalAttempts) * 100))
      );
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
  }, [challenge, lessonId, playSound, isLegendary, totalQuestions, mistakesCount]);

  // Man hinh ket thuc bai hoc (Chuan thiet ke Duolingo / Anh 1)
  if (!challenge) {
    const elapsedSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const speedText = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    const totalAttempts = totalQuestions + mistakesCount;
    const accuracyPercentage = Math.min(
      100,
      Math.max(10, Math.round((totalQuestions / totalAttempts) * 100))
    );
    const earnedPoints = isLegendary ? 45 : totalQuestions * 10;
    const pointsDisplay = earnedPoints < 10 ? `0${earnedPoints}` : `${earnedPoints}`;

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
          <div className="relative mb-3 h-48 w-48 sm:h-56 sm:w-56 transition-transform hover:scale-105">
            <Image
              src="/mascot_celebrate.png"
              alt="Thành tích chói lọi"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-3xl font-black tracking-tight text-[#ffc800] sm:text-4xl">
            Thành tích chói lọi!
          </h1>
          <p className="mt-2 text-base font-semibold text-neutral-500 sm:text-lg">
            Trình độ tiếng Anh của bạn đang ngày càng tiến bộ
          </p>

          <div className="mt-8 grid w-full grid-cols-3 gap-3">
            <ResultCard variant="points" value={pointsDisplay} />
            <ResultCard variant="accuracy" value={`${accuracyPercentage}%`} />
            <ResultCard variant="speed" value={speedText} />
          </div>
        </div>

        {/* Thanh dieu huong duoi cung giong het Anh 1 */}
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
              onClick={() => router.push("/learn")}
            >
              NHẬN KN
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const isExercise = challenge.type === "EXERCISE" && challenge.payload;

  return (
    <>
      {/* Modal hoc tu moi truoc bai */}
      {hasVocab && lessonVocab && (
        <VocabModal
          isOpen={isVocabOpen}
          onStart={() => setIsVocabOpen(false)}
          vocab={lessonVocab}
          lessonTitle={lessonTitle}
        />
      )}

      <Header
        gems={gems}
        percentage={percentage}
        energy={energy}
        hasActiveSubscription={!!userSubscription?.isActive}
        isLegendary={isLegendary}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-6 pb-8 pt-6 lg:pt-10">
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
        disabled={pending || selectedOption === undefined || selectedOption === ""}
        status={status}
        onCheck={onContinue}
        correctAnswer={correctAnswerText}
      />
    </>
  );
};
