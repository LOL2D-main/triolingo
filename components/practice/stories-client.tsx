"use client";

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Eye, Volume2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { SpeakerId } from "@/lib/exercise-types";
import { speakEnglish } from "@/lib/speech";
import { cn } from "@/lib/utils";

type StoryLine = {
  speaker: SpeakerId;
  speakerName: string;
  en: string;
  vi: string;
};

type StoryItem = {
  id: string;
  title: string;
  subtitle: string;
  level: string;
  lines: StoryLine[];
  question: {
    prompt: string;
    options: { text: string; correct: boolean }[];
  };
};

const SPEAKER_IMG: Record<SpeakerId, string> = {
  mascot: "/mascot.svg",
  boy: "/boy.svg",
  girl: "/girl.svg",
  man: "/man.svg",
  woman: "/woman.svg",
  robot: "/robot.svg",
  zombie: "/zombie.svg",
};

const STORIES: StoryItem[] = [
  {
    id: "morning-coffee",
    title: "Good Morning at the Cafe",
    subtitle: "Chào buổi sáng tại quán cà phê",
    level: "A1",
    lines: [
      {
        speaker: "girl",
        speakerName: "Anna",
        en: "Good morning! Excuse me, is this seat free?",
        vi: "Chào buổi sáng! Xin lỗi, chỗ này có ai ngồi chưa?",
      },
      {
        speaker: "boy",
        speakerName: "Minh",
        en: "Yes, it is free. Please sit down!",
        vi: "Vâng, chỗ này còn trống. Mời bạn ngồi!",
      },
      {
        speaker: "girl",
        speakerName: "Anna",
        en: "Thank you very much. My name is Anna. I am from Canada.",
        vi: "Cảm ơn bạn nhiều. Tên tôi là Anna. Tôi đến từ Canada.",
      },
      {
        speaker: "boy",
        speakerName: "Minh",
        en: "Nice to meet you, Anna! I am Minh. Would you like some coffee?",
        vi: "Rất vui được gặp bạn, Anna! Tôi là Minh. Bạn có muốn dùng chút cà phê không?",
      },
    ],
    question: {
      prompt: "Anna đến từ quốc gia nào?",
      options: [
        { text: "Canada", correct: true },
        { text: "Việt Nam", correct: false },
        { text: "Nhật Bản", correct: false },
      ],
    },
  },
  {
    id: "lost-passport",
    title: "Where Is My Passport?",
    subtitle: "Hộ chiếu của tôi đâu rồi?",
    level: "A2",
    lines: [
      {
        speaker: "man",
        speakerName: "David",
        en: "Oh no! The taxi is waiting outside, and I cannot find my passport!",
        vi: "Ôi không! Xe taxi đang đợi ngoài kia mà tôi không tìm thấy hộ chiếu!",
      },
      {
        speaker: "woman",
        speakerName: "Lan",
        en: "Calm down, David. Did you check your blue backpack?",
        vi: "Bình tĩnh nào, David. Anh đã kiểm tra ba lô xanh của anh chưa?",
      },
      {
        speaker: "man",
        speakerName: "David",
        en: "Yes, I did! There are only my keys and sunglasses inside.",
        vi: "Rồi, anh xem rồi! Bên trong chỉ có chìa khóa và kính râm thôi.",
      },
      {
        speaker: "woman",
        speakerName: "Lan",
        en: "Look on the kitchen table! Is that your passport next to the cup?",
        vi: "Nhìn trên bàn bếp kìa! Có phải hộ chiếu của anh nằm cạnh chiếc cốc không?",
      },
    ],
    question: {
      prompt: "Cuối cùng hộ chiếu của David được tìm thấy ở đâu?",
      options: [
        { text: "Trong xe taxi", correct: false },
        { text: "Trên bàn bếp, cạnh chiếc cốc", correct: true },
        { text: "Trong ba lô màu xanh", correct: false },
      ],
    },
  },
  {
    id: "smart-assistant",
    title: "A Day With a Robot",
    subtitle: "Một ngày cùng trợ lý người máy",
    level: "B1",
    lines: [
      {
        speaker: "robot",
        speakerName: "TrioBot",
        en: "Good afternoon! Your schedule today includes three English meetings.",
        vi: "Chào buổi chiều! Lịch trình hôm nay của bạn gồm ba cuộc họp bằng tiếng Anh.",
      },
      {
        speaker: "woman",
        speakerName: "Linh",
        en: "Thanks, TrioBot. Could you help me review the presentation notes?",
        vi: "Cảm ơn TrioBot. Bạn có thể giúp tôi xem lại ghi chú thuyết trình được không?",
      },
      {
        speaker: "robot",
        speakerName: "TrioBot",
        en: "Certainly! Practicing aloud for ten minutes will boost your confidence.",
        vi: "Chắc chắn rồi! Luyện đọc to trong mười phút sẽ giúp bạn tự tin hơn hẳn.",
      },
    ],
    question: {
      prompt: "TrioBot khuyên Linh làm gì để tự tin hơn?",
      options: [
        { text: "Hủy ba cuộc họp hôm nay", correct: false },
        { text: "Luyện đọc to trong 10 phút", correct: true },
        { text: "Đi uống cà phê ngay lập tức", correct: false },
      ],
    },
  },
];

export const StoriesClient = () => {
  const [activeStoryId, setActiveStoryId] = useState<string>(STORIES[0].id);
  const [showTranslations, setShowTranslations] = useState<boolean>(true);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const activeStory =
    STORIES.find((s) => s.id === activeStoryId) || STORIES[0];

  const onAnswerOption = (opt: { text: string; correct: boolean }) => {
    setSelectedChoice(opt.text);
    if (opt.correct) {
      toast.success("Chính xác! Bạn hiểu nội dung câu chuyện rất tốt.");
      setCompletedIds((prev) =>
        prev.includes(activeStory.id) ? prev : [...prev, activeStory.id]
      );
    } else {
      toast.error("Chưa đúng rồi, hãy đọc lại đoạn hội thoại nhé!");
    }
  };

  return (
    <div className="w-full space-y-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/practice"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            aria-label="Quay lại Luyện tập"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-neutral-800 sm:text-2xl">
              Kho truyện TrioLingo
            </h1>
            <p className="text-xs font-medium text-neutral-500 sm:text-sm">
              Đọc và nghe các mẩu truyện song ngữ theo ngữ cảnh thực tế
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="default"
          size="sm"
          onClick={() => setShowTranslations((v) => !v)}
          className="gap-1.5 rounded-xl border-2 border-slate-200 text-xs font-extrabold"
        >
          <Eye className="h-4 w-4" />
          {showTranslations ? "Ẩn bản dịch" : "Hiện bản dịch"}
        </Button>
      </div>

      {/* Chon truyen */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {STORIES.map((story) => {
          const isSelected = story.id === activeStory.id;
          const isDone = completedIds.includes(story.id);
          return (
            <button
              key={story.id}
              type="button"
              onClick={() => {
                setActiveStoryId(story.id);
                setSelectedChoice(null);
              }}
              className={cn(
                "flex flex-col justify-between rounded-2xl border-2 border-b-4 p-4 text-left transition active:translate-y-px active:border-b-2",
                isSelected
                  ? "border-purple-400 bg-purple-50/70"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="rounded-md bg-purple-100 px-2 py-0.5 text-[11px] font-black text-purple-700">
                  Cấp độ {story.level}
                </span>
                {isDone && (
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                )}
              </div>
              <p className="mt-2 text-sm font-black text-neutral-800">
                {story.title}
              </p>
              <p className="mt-0.5 text-xs font-medium text-neutral-500">
                {story.subtitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Noi dung truyen */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-5 sm:p-6">
        <div className="mb-5 flex items-center gap-3 border-b-2 border-slate-100 pb-4">
          <Image
            src="/assets/practice-story.png"
            alt="Kho truyện"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
          />
          <div>
            <h2 className="text-lg font-black text-neutral-800 sm:text-xl">
              {activeStory.title}
            </h2>
            <p className="text-xs font-semibold text-neutral-500 sm:text-sm">
              {activeStory.subtitle}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {activeStory.lines.map((line, i) => (
            <div key={i} className="flex items-start gap-3">
              <Image
                src={SPEAKER_IMG[line.speaker]}
                alt={line.speakerName}
                width={42}
                height={42}
                className="h-10 w-10 shrink-0 object-contain"
              />
              <button
                type="button"
                onClick={() =>
                  speakEnglish(line.en, { speaker: line.speaker })
                }
                className="flex-1 rounded-2xl border-2 border-slate-200 bg-slate-50/70 p-3.5 text-left transition hover:border-sky-300 hover:bg-sky-50/40"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-wide text-purple-600">
                    {line.speakerName}
                  </span>
                  <Volume2 className="h-4 w-4 text-sky-500" />
                </div>
                <p className="mt-1 text-sm font-bold text-neutral-800 sm:text-base">
                  {line.en}
                </p>
                {showTranslations && (
                  <p className="mt-1 text-xs font-medium text-neutral-500 sm:text-sm">
                    {line.vi}
                  </p>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Cau hoi doc hieu */}
        <div className="mt-7 border-t-2 border-slate-100 pt-5">
          <h3 className="text-base font-black text-neutral-800">
            Câu hỏi đọc hiểu: {activeStory.question.prompt}
          </h3>

          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {activeStory.question.options.map((opt) => {
              const isChosen = selectedChoice === opt.text;
              return (
                <button
                  key={opt.text}
                  type="button"
                  onClick={() => onAnswerOption(opt)}
                  className={cn(
                    "rounded-2xl border-2 border-b-4 px-4 py-3 text-sm font-bold transition active:translate-y-px active:border-b-2",
                    isChosen
                      ? opt.correct
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-rose-500 bg-rose-50 text-rose-700"
                      : "border-slate-200 bg-white text-neutral-700 hover:bg-slate-50"
                  )}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
