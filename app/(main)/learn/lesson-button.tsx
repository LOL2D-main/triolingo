"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Crown, Lock, Star, X } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "react-circular-progressbar/dist/styles.css";

type LessonButtonProps = {
  id: number;
  title?: string;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
  completed?: boolean;
  isLegendary?: boolean;
  percentage: number;
};

export const LessonButton = ({
  id,
  title = "Bài học",
  index,
  totalCount,
  locked,
  current,
  completed,
  isLegendary,
  percentage,
}: LessonButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Dong popup khi click ra ngoai
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;
  if (cycleIndex <= 2) indentationLevel = cycleIndex;
  else if (cycleIndex <= 4) indentationLevel = 4 - cycleIndex;
  else if (cycleIndex <= 6) indentationLevel = 4 - cycleIndex;
  else indentationLevel = cycleIndex - 8;

  const rightPosition = indentationLevel * 40;
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = Boolean(completed);

  const normalHref = current ? "/lesson" : `/lesson/${id}`;
  const legendaryHref = `/lesson/${id}?mode=legendary`;

  const handleNodeClick = () => {
    if (locked) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center"
      style={{
        right: `${rightPosition}px`,
        marginTop: isFirst && !isCompleted ? 40 : 24,
      }}
    >
      {/* Node Button hinh tron */}
      {current ? (
        <div className="relative h-[102px] w-[102px]">
          <CircularProgressbarWithChildren
            value={Number.isNaN(percentage) ? 0 : percentage}
            styles={{
              path: { stroke: isLegendary ? "#f59e0b" : "#4ade80" },
              trail: { stroke: "#e5e7eb" },
            }}
          >
            <button
              type="button"
              onClick={handleNodeClick}
              disabled={locked}
              aria-label={title}
              className={cn(
                "relative flex h-[70px] w-[70px] items-center justify-center rounded-full border-b-8 transition active:border-b-2 active:translate-y-1",
                locked
                  ? "border-neutral-300 bg-neutral-200 text-neutral-400"
                  : isLegendary
                    ? "border-amber-600 bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 shadow-[0_4px_16px_rgba(245,158,11,0.45)] before:absolute before:inset-x-2 before:top-1 before:h-5 before:rounded-full before:bg-gradient-to-b before:from-white/70 before:to-transparent"
                    : "border-green-600 bg-green-500 shadow-md text-white"
              )}
            >
              {isLegendary ? (
                isLast ? (
                  <Crown className="h-10 w-10 fill-amber-950 text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" />
                ) : (
                  <Check className="h-10 w-10 stroke-[4] stroke-amber-950 text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" />
                )
              ) : isLast ? (
                <Crown className="h-10 w-10 fill-white text-white" />
              ) : (
                <Star className="h-10 w-10 fill-white text-white" />
              )}
            </button>
          </CircularProgressbarWithChildren>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleNodeClick}
          disabled={locked}
          aria-label={title}
          className={cn(
            "relative flex h-[70px] w-[70px] items-center justify-center rounded-full border-b-8 transition active:border-b-2 active:translate-y-1",
            locked
              ? "border-neutral-300 bg-neutral-200 text-neutral-400 cursor-not-allowed"
              : isLegendary
                ? "border-amber-600 bg-gradient-to-b from-amber-300 via-amber-400 to-yellow-500 shadow-[0_4px_16px_rgba(245,158,11,0.45)] before:absolute before:inset-x-2 before:top-1.5 before:h-5 before:rounded-full before:bg-gradient-to-b before:from-white/70 before:to-transparent"
                : isCompleted
                  ? isLast
                    ? "border-amber-600 bg-amber-500 shadow-md text-white"
                    : "border-green-600 bg-green-500 shadow-md text-white"
                  : isLast
                    ? "border-amber-500 bg-amber-400 shadow-md text-white"
                    : "border-sky-600 bg-sky-500 shadow-md text-white"
          )}
        >
          {locked ? (
            isLast ? (
              <Crown className="h-8 w-8 fill-neutral-400 text-neutral-400 opacity-60" />
            ) : (
              <Lock className="h-8 w-8 text-neutral-400" />
            )
          ) : isLegendary ? (
            isLast ? (
              <Crown className="h-10 w-10 fill-amber-950 text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" />
            ) : (
              <Check className="h-10 w-10 stroke-[4] stroke-amber-950 text-amber-950 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]" />
            )
          ) : isCompleted ? (
            isLast ? (
              <Crown className="h-9 w-9 fill-white text-white" />
            ) : (
              <Check className="h-10 w-10 stroke-[4] stroke-white fill-none" />
            )
          ) : isLast ? (
            <Crown className="h-9 w-9 fill-white text-white" />
          ) : (
            <Star className="h-9 w-9 fill-white text-white" />
          )}
        </button>
      )}

      {/* Popover Card Duolingo Style (Anh 2) */}
      {isOpen && (
        <div className="absolute top-[82px] z-30 w-[290px] sm:w-[320px] animate-in fade-in zoom-in-95 duration-150">
          {/* Mũi tên chỉ lên viên tròn */}
          <div className="mx-auto h-0 w-0 border-x-8 border-x-transparent border-b-8 border-b-[#1cb0f6]" />

          <div className="rounded-3xl bg-[#1cb0f6] p-4 text-white shadow-2xl border-2 border-sky-400">
            {/* Header popup */}
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-black leading-snug tracking-tight text-white line-clamp-2">
                  {title}
                </h3>
                {isLast && (
                  <p className="mt-0.5 text-xs font-bold text-amber-300">
                    Bài Vương Miện tổng kết chương
                  </p>
                )}
                <p className="mt-1 text-xs font-medium text-sky-100">
                  {isLegendary
                    ? "Đã chinh phục cấp độ Huyền Thoại hoàng kim!"
                    : "Chinh phục cấp độ Huyền thoại để chứng minh trình độ"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-sky-200 hover:bg-sky-600/40 hover:text-white"
                aria-label="Đóng"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Các nút lựa chọn */}
            <div className="mt-3 flex flex-col gap-2.5">
              {/* Nút 1: Làm bài / Ôn tập */}
              <Link href={normalHref} prefetch={true} className="w-full">
                <Button
                  variant="default"
                  className="w-full h-11 rounded-2xl border-2 border-b-4 border-slate-200 bg-white font-extrabold uppercase text-[#1cb0f6] hover:bg-slate-50 transition active:border-b-2"
                >
                  {isCompleted ? "ÔN TẬP +5 KN" : "LÀM BÀI +15 KN"}
                </Button>
              </Link>

              {/* Nút 2: Huyền Thoại +45 KN (Màu vàng gold) */}
              <Link href={legendaryHref} prefetch={true} className="w-full">
                <Button
                  variant="default"
                  className="w-full h-11 rounded-2xl border-2 border-b-4 border-amber-600 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 font-black uppercase text-amber-950 shadow-md hover:brightness-105 transition active:border-b-2 flex items-center justify-center"
                >
                  {isLegendary ? "HUYỀN THOẠI LẠI +45 KN" : "HUYỀN THOẠI +45 KN"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
