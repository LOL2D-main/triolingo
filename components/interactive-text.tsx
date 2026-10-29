"use client";

import { useState } from "react";
import { Volume2 } from "lucide-react";

import { lookupWord } from "@/lib/glossary";
import { speakEnglish } from "@/lib/speech";
import { cn } from "@/lib/utils";

type InteractiveTextProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  /** Neu true, cho phep bam vao tung tu de tra nghia va nghe doc */
  interactive?: boolean;
};

export const InteractiveText = ({
  text,
  className,
  wordClassName,
  interactive = true,
}: InteractiveTextProps) => {
  const [activeWord, setActiveWord] = useState<{
    word: string;
    cleanWord: string;
    meaning: string | null;
  } | null>(null);

  if (!interactive) {
    return <span className={className}>{text}</span>;
  }

  // Tach cau thanh cac tu va khoang trang/dau cau
  const tokens = text.split(/(\s+|[.,!?;:"]+)/);

  const handleWordClick = (token: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const clean = token.replace(/[^a-zA-Z0-9'-]/g, "").trim();
    if (!clean) return;

    const meaning = lookupWord(clean);
    speakEnglish(clean, 0.95);

    setActiveWord((prev) =>
      prev?.cleanWord === clean ? null : { word: token, cleanWord: clean, meaning }
    );
  };

  return (
    <span className={cn("relative inline leading-relaxed", className)}>
      {tokens.map((token, index) => {
        const isWord = /[a-zA-Z0-9]/.test(token);

        if (!isWord) {
          return <span key={index}>{token}</span>;
        }

        const clean = token.replace(/[^a-zA-Z0-9'-]/g, "").trim();
        const isSelected = activeWord?.cleanWord === clean;

        return (
          <span key={index} className="relative inline-block">
            <button
              type="button"
              onClick={(e) => handleWordClick(token, e)}
              className={cn(
                "rounded px-1 py-0.5 font-medium transition-colors hover:bg-sky-100 hover:text-sky-700 active:bg-sky-200",
                "cursor-pointer border-b border-dashed border-neutral-400 hover:border-sky-500",
                isSelected && "bg-sky-200 text-sky-800 border-sky-600",
                wordClassName
              )}
              title="Nhấn để nghe & xem nghĩa"
            >
              {token}
            </button>

            {isSelected && (
              <span
                role="tooltip"
                onClick={(e) => e.stopPropagation()}
                className="absolute -top-12 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-lg bg-neutral-900 px-3 py-1.5 text-xs text-white shadow-xl animate-in fade-in zoom-in-95"
              >
                <span className="flex items-center gap-1.5 font-bold">
                  <span>{clean}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakEnglish(clean, 0.85);
                    }}
                    className="rounded p-0.5 hover:bg-white/20"
                    title="Nghe phát âm"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-sky-300" />
                  </button>
                </span>
                <span className="block text-[11px] font-normal text-amber-300">
                  {activeWord?.meaning ? activeWord.meaning : "Từ vựng tiếng Anh"}
                </span>
                {/* Arrow */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-neutral-900" />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};
