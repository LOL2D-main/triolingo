"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Volume2 } from "lucide-react";

import { InteractiveText } from "@/components/interactive-text";
import type { Exercise, SpeakerId } from "@/lib/exercise-types";
import { speakEnglish } from "@/lib/speech";
import { cn } from "@/lib/utils";
import { buildListenBank, buildWordChoices } from "@/lib/word-bank";

const SPEAKER_IMAGE_MAP: Record<SpeakerId, string> = {
  mascot: "/mascot.svg",
  boy: "/boy.svg",
  girl: "/girl.svg",
  man: "/man.svg",
  woman: "/woman.svg",
  robot: "/robot.svg",
  zombie: "/zombie.svg",
};

type Status = "correct" | "wrong" | "none";

type RichChallengeProps = {
  exercise: Exercise;
  onSelect: (selectedAnswer: string | number) => void;
  onSkip?: () => void;
  selectedAnswer?: string | number;
  status: Status;
  disabled?: boolean;
};

/* ------------------------------------------------------------------ */
/* Cac khoi giao dien dung chung (theo phong cach Duolingo)            */
/* ------------------------------------------------------------------ */

const Title = ({ children }: { children: React.ReactNode }) => (
  <h1 className="mb-6 text-2xl font-extrabold text-neutral-700 lg:text-3xl">
    {children}
  </h1>
);

const Avatar = ({ src }: { src: string }) => (
  <div className="relative h-20 w-20 shrink-0 lg:h-24 lg:w-24">
    <Image src={src} alt="" fill className="object-contain" />
  </div>
);

const Bubble = ({
  children,
  side = "left",
  className,
}: {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}) => (
  <div
    className={cn(
      "relative rounded-2xl border-2 border-slate-200 bg-white px-4 py-3 text-lg text-neutral-700",
      className
    )}
  >
    {children}
    <span
      aria-hidden
      className={cn(
        "absolute top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-slate-200 bg-white",
        side === "left"
          ? "-left-[9px] border-b-2 border-l-2"
          : "-right-[9px] border-r-2 border-t-2"
      )}
    />
  </div>
);

const Chip = ({
  children,
  onClick,
  disabled,
  ghost,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  ghost?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled || ghost}
    className={cn(
      "h-12 rounded-2xl border-2 border-b-4 px-4 text-base font-semibold transition active:translate-y-px active:border-b-2",
      ghost
        ? "pointer-events-none border-slate-200 bg-slate-200 text-transparent"
        : "border-slate-200 bg-white text-neutral-700 hover:bg-slate-50",
      disabled && !ghost && "pointer-events-none"
    )}
  >
    {children}
  </button>
);

const WAVE_BARS = [6, 12, 18, 10, 22, 28, 14, 24, 30, 16, 26, 12, 20, 8, 18, 26, 10, 22, 14, 8];

const Waveform = () => (
  <div className="flex h-8 items-center gap-[3px]" aria-hidden>
    {WAVE_BARS.map((h, i) => (
      <span
        key={i}
        className="w-[3px] rounded-full bg-sky-400"
        style={{ height: h }}
      />
    ))}
  </div>
);

const LINES_BG =
  "repeating-linear-gradient(to bottom, transparent 0px, transparent 56px, #e5e5e5 56px, #e5e5e5 58px, transparent 58px, transparent 60px)";

/* ------------------------------------------------------------------ */
/* Ghep tu thanh cau (dung cho Nghe va dien + Dich cau)                */
/* ------------------------------------------------------------------ */

const SentenceBuilder = ({
  bank,
  selectedAnswer,
  onSelect,
  disabled,
  speakSpeaker,
  children,
}: {
  bank: string[];
  selectedAnswer?: string | number;
  onSelect: (v: string) => void;
  disabled?: boolean;
  /** Neu co, bam vao tu se doc to tu do */
  speakSpeaker?: SpeakerId;
  /** Hien o duoi ngan hang tu (vd: nut bo qua) */
  children?: React.ReactNode;
}) => {
  const [picked, setPicked] = useState<number[]>([]);

  // Khi chuyen cau moi (dap an duoc reset) thi bo chon
  useEffect(() => {
    if (selectedAnswer === undefined || selectedAnswer === "") setPicked([]);
  }, [selectedAnswer]);

  const commit = (next: number[]) => {
    setPicked(next);
    onSelect(next.map((i) => bank[i]).join(" "));
  };

  const add = (idx: number) => {
    if (disabled) return;
    speakEnglish(bank[idx], { speaker: speakSpeaker || "mascot" });
    commit([...picked, idx]);
  };

  const remove = (pos: number) => {
    if (disabled) return;
    const removedIdx = picked[pos];
    if (removedIdx !== undefined) {
      speakEnglish(bank[removedIdx], { speaker: speakSpeaker || "mascot" });
    }
    commit(picked.filter((_, i) => i !== pos));
  };

  return (
    <>
      <div className="min-h-[180px]" style={{ backgroundImage: LINES_BG }}>
        <div className="flex flex-wrap gap-x-2 gap-y-3">
          {picked.map((idx, pos) => (
            <Chip key={`${idx}-${pos}`} onClick={() => remove(pos)} disabled={disabled}>
              {bank[idx]}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap justify-center gap-x-2 gap-y-3 pt-10">
        {bank.map((word, idx) => (
          <Chip
            key={idx}
            ghost={picked.includes(idx)}
            onClick={() => add(idx)}
            disabled={disabled}
          >
            {word}
          </Chip>
        ))}
      </div>

      {children}
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Tung dang bai tap                                                   */
/* ------------------------------------------------------------------ */

const ListenType = ({
  exercise,
  speaker,
  selectedAnswer,
  onSelect,
  onSkip,
  locked,
}: {
  exercise: Extract<Exercise, { kind: "listen-type" }>;
  speaker: SpeakerId;
  selectedAnswer?: string | number;
  onSelect: (v: string) => void;
  onSkip?: () => void;
  locked: boolean;
}) => {
  const bank = useMemo(() => buildListenBank(exercise.audio), [exercise.audio]);

  return (
    <>
      <Title>Nghe và điền</Title>

      <div className="mb-8 flex items-start gap-3">
        <Avatar src={SPEAKER_IMAGE_MAP[speaker]} />
        <div className="mt-3 flex flex-col items-end gap-1.5">
          <Bubble>
            <button
              type="button"
              onClick={() => speakEnglish(exercise.audio, { speaker })}
              className="flex items-center gap-3 pr-4"
              aria-label="Nghe câu"
            >
              <Volume2 className="h-7 w-7 text-sky-500" />
              <Waveform />
            </button>
          </Bubble>
          <button
            type="button"
            onClick={() => speakEnglish(exercise.audio, { speaker, slow: true })}
            className="text-sm font-extrabold uppercase tracking-wide text-sky-500 hover:text-sky-600"
          >
            Chậm
          </button>
        </div>
      </div>

      <SentenceBuilder
        bank={bank}
        selectedAnswer={selectedAnswer}
        onSelect={onSelect}
        disabled={locked}
        speakSpeaker={speaker}
      >
        {onSkip && (
          <button
            type="button"
            onClick={onSkip}
            disabled={locked}
            className="mx-auto mt-8 text-sm font-extrabold uppercase tracking-wide text-slate-400 hover:text-slate-500 disabled:pointer-events-none disabled:opacity-0"
          >
            Hiện không nghe được
          </button>
        )}
      </SentenceBuilder>
    </>
  );
};

const BuildSentence = ({
  exercise,
  speaker,
  selectedAnswer,
  onSelect,
  locked,
}: {
  exercise: Extract<Exercise, { kind: "build" }>;
  speaker: SpeakerId;
  selectedAnswer?: string | number;
  onSelect: (v: string) => void;
  locked: boolean;
}) => (
  <>
    <Title>Dịch câu này</Title>

    <div className="mb-8 flex items-center gap-3">
      <Avatar src={SPEAKER_IMAGE_MAP[speaker]} />
      <Bubble className="font-semibold">{exercise.promptVi}</Bubble>
    </div>

    <SentenceBuilder
      bank={exercise.bank}
      selectedAnswer={selectedAnswer}
      onSelect={onSelect}
      disabled={locked}
      speakSpeaker={speaker}
    />
  </>
);

const TypeMissing = ({
  exercise,
  speaker,
  selectedAnswer,
  onSelect,
  locked,
}: {
  exercise: Extract<Exercise, { kind: "type-missing" }>;
  speaker: SpeakerId;
  selectedAnswer?: string | number;
  onSelect: (v: string) => void;
  locked: boolean;
}) => {
  const choices = useMemo(
    () => buildWordChoices(exercise.answer, exercise.sentence),
    [exercise.answer, exercise.sentence]
  );

  const [before, after = ""] = exercise.sentence.split(/_{2,}/);
  const chosen = typeof selectedAnswer === "string" ? selectedAnswer : "";

  return (
    <>
      <Title>Hoàn thành câu</Title>

      <div className="flex items-center gap-3">
        <Avatar src={SPEAKER_IMAGE_MAP[speaker]} />
        <Bubble className="leading-[2.6rem]">
          <InteractiveText text={before} />
          <button
            type="button"
            disabled={locked || !chosen}
            onClick={() => {
              if (chosen) speakEnglish(chosen, { speaker });
              onSelect("");
            }}
            className="mx-1 inline-flex h-9 min-w-[6.5rem] items-center justify-center border-b-2 border-slate-300 align-bottom font-bold text-sky-600"
          >
            {chosen}
          </button>
          <InteractiveText text={after} />
        </Bubble>
      </div>

      <div className="mt-auto flex flex-wrap justify-center gap-x-2 gap-y-3 pt-16">
        {choices.map((word) => (
          <Chip
            key={word}
            ghost={chosen === word}
            disabled={locked}
            onClick={() => {
              speakEnglish(word, { speaker });
              onSelect(word);
            }}
          >
            {word}
          </Chip>
        ))}
      </div>
    </>
  );
};

const FillLetters = ({
  exercise,
  selectedAnswer,
  onSelect,
  status,
  locked,
}: {
  exercise: Extract<Exercise, { kind: "fill-letters" }>;
  selectedAnswer?: string | number;
  onSelect: (v: string) => void;
  status: Status;
  locked: boolean;
}) => {
  const typed = typeof selectedAnswer === "string" ? selectedAnswer : "";

  return (
    <>
      <Title>Điền các chữ cái còn thiếu</Title>

      <div className="flex items-center gap-3">
        <Avatar src={SPEAKER_IMAGE_MAP.mascot} />
        <Bubble className="leading-[2.6rem]">
          <InteractiveText text={exercise.before} />
          <span className="whitespace-nowrap font-bold">
            {exercise.prefix}
            <input
              autoFocus
              type="text"
              value={typed}
              disabled={locked}
              maxLength={exercise.answer.length + 2}
              onChange={(e) => onSelect(e.target.value.toLowerCase().trim())}
              style={{ width: `${Math.max(exercise.answer.length, 2) + 1}ch` }}
              className={cn(
                "border-b-2 border-sky-400 bg-transparent text-center font-bold text-sky-600 focus:outline-none",
                status === "wrong" && "border-rose-400 text-rose-600",
                status === "correct" && "border-green-500 text-green-600"
              )}
              aria-label="Các chữ cái còn thiếu"
            />
          </span>
          <InteractiveText text={exercise.after} />
        </Bubble>
      </div>
    </>
  );
};

const RealWord = ({
  exercise,
  speaker,
  selectedAnswer,
  onSelect,
  locked,
}: {
  exercise: Extract<Exercise, { kind: "real-word" }>;
  speaker: SpeakerId;
  selectedAnswer?: string | number;
  onSelect: (v: string) => void;
  locked: boolean;
}) => (
  <>
    <Title>Đây có phải là từ tiếng Anh thật không?</Title>

    <div className="mb-10 flex items-center justify-center gap-3 rounded-2xl border-2 border-slate-200 px-6 py-10">
      <span className="text-4xl font-extrabold tracking-wide text-neutral-700">
        {exercise.word}
      </span>
      <button
        type="button"
        onClick={() => speakEnglish(exercise.word, { speaker })}
        className="rounded-full p-2 text-sky-500 hover:bg-sky-50"
        aria-label="Nghe phát âm"
      >
        <Volume2 className="h-7 w-7" />
      </button>
    </div>

    <div className="mt-auto grid grid-cols-2 gap-3">
      {[
        { value: "true", label: "Từ thật" },
        { value: "false", label: "Từ giả" },
      ].map((opt) => (
        <button
          key={opt.value}
          type="button"
          disabled={locked}
          onClick={() => onSelect(opt.value)}
          className={cn(
            "rounded-2xl border-2 border-b-4 px-4 py-4 text-base font-bold transition active:border-b-2",
            selectedAnswer === opt.value
              ? "border-sky-300 bg-sky-50 text-sky-600"
              : "border-slate-200 bg-white text-neutral-700 hover:bg-slate-50",
            locked && "pointer-events-none"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </>
);

const Choice = ({
  exercise,
  speaker,
  selectedAnswer,
  onSelect,
  status,
  locked,
}: {
  exercise: Extract<Exercise, { kind: "choice" }>;
  speaker: SpeakerId;
  selectedAnswer?: string | number;
  onSelect: (v: string) => void;
  status: Status;
  locked: boolean;
}) => {
  const chosen = typeof selectedAnswer === "string" ? selectedAnswer : "";
  const userAvatar = speaker === "boy" ? "/girl.svg" : "/boy.svg";

  // Neu cau hoi co prompt trung voi dap an dung, day la dang cau hoi Nghe va Chon dap an:
  // Khong duoc hien chu trong bong thoai vi se lo dap an, ma de trong chi co bieu tuong loa + song am!
  const isListeningChoice =
    !exercise.prompt ||
    exercise.options.some(
      (opt) =>
        opt.correct &&
        opt.text.toLowerCase().replace(/[^a-z0-9]/g, "") ===
          exercise.prompt?.toLowerCase().replace(/[^a-z0-9]/g, "")
    );

  const displayTitle = isListeningChoice
    ? "Nghe và chọn câu bạn nghe được"
    : exercise.title;

  return (
    <>
      <Title>{displayTitle}</Title>

      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Avatar src={SPEAKER_IMAGE_MAP[speaker]} />

          {isListeningChoice ? (
            <div className="mt-2 flex flex-col items-end gap-1.5">
              <Bubble>
                <button
                  type="button"
                  onClick={() =>
                    speakEnglish(exercise.audio || exercise.prompt || "", {
                      speaker,
                    })
                  }
                  className="flex items-center gap-3 pr-4 text-sky-500 hover:text-sky-600"
                  aria-label="Nghe câu"
                >
                  <Volume2 className="h-7 w-7" />
                  <Waveform />
                </button>
              </Bubble>
              <button
                type="button"
                onClick={() =>
                  speakEnglish(exercise.audio || exercise.prompt || "", {
                    speaker,
                    slow: true,
                  })
                }
                className="text-xs font-extrabold uppercase tracking-wide text-sky-500 hover:text-sky-600"
              >
                Chậm
              </button>
            </div>
          ) : (
            exercise.prompt && (
              <Bubble>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      speakEnglish(exercise.audio || exercise.prompt!, {
                        speaker,
                      })
                    }
                    className="shrink-0 text-sky-500 hover:text-sky-600"
                    aria-label="Nghe câu"
                  >
                    <Volume2 className="h-6 w-6" />
                  </button>
                  <span className="font-medium leading-relaxed">
                    <InteractiveText text={exercise.prompt} />
                  </span>
                </div>
              </Bubble>
            )
          )}
        </div>

        <div className="flex items-center justify-end gap-3">
          <Bubble side="right" className="min-w-[10rem] flex-1 sm:flex-none">
            <span
              className={cn(
                "block min-h-[1.75rem] border-b-2 border-slate-300 text-center font-semibold",
                chosen && "border-transparent",
                status === "wrong" && "text-rose-600",
                status === "correct" && "text-green-600"
              )}
            >
              {chosen}
            </span>
          </Bubble>
          <Avatar src={userAvatar} />
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-3 pt-10">
        {exercise.options.map((opt) => (
          <button
            key={opt.text}
            type="button"
            disabled={locked}
            onClick={() => {
              speakEnglish(opt.text, { speaker });
              onSelect(opt.text);
            }}
            className={cn(
              "rounded-2xl border-2 border-b-4 px-5 py-4 text-center text-base font-semibold transition active:border-b-2",
              chosen === opt.text
                ? "border-slate-200 bg-slate-100 text-transparent"
                : "border-slate-200 bg-white text-neutral-700 hover:bg-slate-50",
              locked && "pointer-events-none"
            )}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </>
  );
};

/* ------------------------------------------------------------------ */

export const RichChallenge = ({
  exercise,
  onSelect,
  onSkip,
  selectedAnswer,
  status,
  disabled,
}: RichChallengeProps) => {
  const speaker: SpeakerId =
    "speaker" in exercise && exercise.speaker ? exercise.speaker : "mascot";
  const locked = Boolean(disabled) || status !== "none";

  // Tu dong doc khi vao cau hoi (dung giong nhan vat)
  useEffect(() => {
    if ("audio" in exercise && exercise.audio) {
      speakEnglish(exercise.audio, { speaker });
    }
  }, [exercise, speaker]);

  const handleSelect = (v: string) => onSelect(v);

  let body: React.ReactNode = null;

  switch (exercise.kind) {
    case "listen-type":
      body = (
        <ListenType
          exercise={exercise}
          speaker={speaker}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelect}
          onSkip={onSkip}
          locked={locked}
        />
      );
      break;
    case "build":
      body = (
        <BuildSentence
          exercise={exercise}
          speaker={speaker}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelect}
          locked={locked}
        />
      );
      break;
    case "type-missing":
      body = (
        <TypeMissing
          exercise={exercise}
          speaker={speaker}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelect}
          locked={locked}
        />
      );
      break;
    case "fill-letters":
      body = (
        <FillLetters
          exercise={exercise}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelect}
          status={status}
          locked={locked}
        />
      );
      break;
    case "real-word":
      body = (
        <RealWord
          exercise={exercise}
          speaker={speaker}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelect}
          locked={locked}
        />
      );
      break;
    case "choice":
      body = (
        <Choice
          exercise={exercise}
          speaker={speaker}
          selectedAnswer={selectedAnswer}
          onSelect={handleSelect}
          status={status}
          locked={locked}
        />
      );
      break;
    default:
      body = null;
  }

  return <div className="flex flex-1 flex-col">{body}</div>;
};
