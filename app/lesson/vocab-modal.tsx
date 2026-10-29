"use client";

import { useState } from "react";
import Image from "next/image";
import { BookOpen, Volume2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { VocabItem } from "@/lib/exercise-types";
import { speakEnglish } from "@/lib/speech";

type VocabModalProps = {
  isOpen: boolean;
  onStart: () => void;
  vocab: VocabItem[];
  lessonTitle: string;
};

export const VocabModal = ({
  isOpen,
  onStart,
  vocab,
  lessonTitle,
}: VocabModalProps) => {
  const [playingWord, setPlayingWord] = useState<string | null>(null);

  if (!vocab || vocab.length === 0) return null;

  const handlePlay = (word: string) => {
    setPlayingWord(word);
    speakEnglish(word, 0.9);
    setTimeout(() => setPlayingWord(null), 1200);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onStart();
      }}
    >
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-green-600">
              <BookOpen className="h-6 w-6" />
            </span>
            <DialogTitle className="text-xl font-bold text-neutral-800 lg:text-2xl">
              Vocabulary
            </DialogTitle>
          </div>
          <DialogDescription className="text-center text-sm text-neutral-600">
            {lessonTitle} - Danh sách từ vựng cần nhớ trước khi làm bài.
          </DialogDescription>
        </DialogHeader>

        {/* Danh sach tu moi */}
        <div className="my-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {vocab.map((item, index) => (
            <div
              key={index}
              onClick={() => handlePlay(item.en)}
              className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border-2 border-b-4 border-slate-200 bg-white p-3.5 transition-all hover:border-green-400 hover:bg-green-50/40 active:border-b-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-neutral-800 group-hover:text-green-600">
                      {item.en}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlay(item.en);
                      }}
                      className="rounded-full bg-slate-100 p-1 text-slate-600 transition hover:bg-green-500 hover:text-white"
                      title="Nghe phát âm"
                    >
                      <Volume2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-0.5 text-sm font-semibold text-neutral-600">
                    {item.vi}
                  </p>
                </div>

                {item.image && (
                  <div className="relative h-12 w-12 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.en}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {item.example && (
                <div className="mt-2.5 rounded-xl bg-slate-50 p-2 text-xs text-neutral-600 group-hover:bg-white">
                  <p className="font-medium text-neutral-800 italic">
                    &ldquo;{item.example.en}&rdquo;
                  </p>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    {item.example.vi}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="mt-4">
          <Button
            variant="secondary"
            size="lg"
            className="w-full text-base font-bold"
            onClick={onStart}
          >
            Bắt đầu luyện tập
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
