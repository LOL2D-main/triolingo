"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, Search, Volume2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { VocabItem } from "@/lib/exercise-types";
import { speakEnglish } from "@/lib/speech";

export const VocabPracticeClient = ({
  vocabItems,
}: {
  vocabItems: VocabItem[];
}) => {
  const [query, setQuery] = useState("");
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return vocabItems;
    return vocabItems.filter(
      (item) =>
        item.en.toLowerCase().includes(q) ||
        item.vi.toLowerCase().includes(q)
    );
  }, [query, vocabItems]);

  const handlePlay = (text: string) => {
    setActiveWord(text);
    speakEnglish(text, { speaker: "mascot" });
    setTimeout(() => setActiveWord(null), 900);
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
              Từ vựng của bạn ({vocabItems.length})
            </h1>
            <p className="text-xs font-medium text-neutral-500 sm:text-sm">
              Nhấn vào từng thẻ để nghe phát âm chuẩn và ôn lại ví dụ thực tế
            </p>
          </div>
        </div>

        <Link href="/lesson/practice?mode=vocab" prefetch>
          <Button
            variant="primary"
            className="h-11 rounded-2xl px-5 text-xs font-black uppercase sm:text-sm"
            disabled={vocabItems.length < 4}
          >
            LÀM BÀI KIỂM TRA TỪ VỰNG
          </Button>
        </Link>
      </div>

      {/* Thanh tim kiem */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm từ tiếng Anh hoặc nghĩa tiếng Việt..."
          className="w-full rounded-2xl border-2 border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold text-neutral-800 focus:border-[#1cb0f6] focus:outline-none"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-10 text-center">
          <Image
            src="/assets/practice-vocab.png"
            alt="Từ vựng"
            width={64}
            height={64}
            className="mx-auto mb-3 object-contain"
          />
          <p className="text-base font-bold text-neutral-600">
            Chưa tìm thấy từ vựng phù hợp.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((item, idx) => (
            <button
              key={`${item.en}-${idx}`}
              type="button"
              onClick={() => handlePlay(item.en)}
              className={`flex flex-col justify-between rounded-2xl border-2 border-b-4 bg-white p-4 text-left transition active:translate-y-px active:border-b-2 ${
                activeWord === item.en
                  ? "border-sky-400 bg-sky-50/50"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-neutral-800">
                      {item.en}
                    </span>
                    <span className="rounded-full bg-sky-100 p-1 text-sky-600">
                      <Volume2 className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-neutral-600">
                    {item.vi}
                  </p>
                </div>

                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.en}
                    width={42}
                    height={42}
                    className="h-10 w-10 shrink-0 object-contain"
                  />
                )}
              </div>

              {item.example && (
                <div className="mt-3 rounded-xl bg-slate-50 p-2.5 text-xs">
                  <p className="font-semibold text-neutral-800">
                    {item.example.en}
                  </p>
                  <p className="mt-0.5 text-neutral-500">{item.example.vi}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
