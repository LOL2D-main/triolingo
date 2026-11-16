"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type JumpButtonProps = {
  unitId: number;
  unitOrder: number;
};

export const JumpButton = ({ unitId, unitOrder }: JumpButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={containerRef}
      className="relative mt-8 mb-2 flex flex-col items-center"
    >
      {/* Bong thoai HOC VUOT? (tinh, khong hieu ung lo lung) */}
      <div className="relative mb-3 rounded-xl border-2 border-slate-200 bg-white px-4 py-2 shadow-xs">
        <span className="text-sm font-black uppercase tracking-wide text-[#ce287f]">
          HỌC VƯỢT?
        </span>
        <svg
          viewBox="0 0 16 9"
          className="absolute -bottom-[9px] left-1/2 h-[9px] w-[16px] -translate-x-1/2"
          fill="none"
        >
          <path d="M1 0L8 7.5L15 0" fill="white" stroke="#e2e8f0" strokeWidth="2" />
          <rect x="0" y="0" width="16" height="2" fill="white" />
        </svg>
      </div>

      {/* Nut tron tim hong voi bieu tuong tua nhanh >> */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`Học vượt Chương ${unitOrder}`}
        className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-b-8 border-[#9e1b60] bg-[#ce287f] text-white shadow-md transition active:translate-y-1 active:border-b-2 hover:brightness-105"
      >
        <svg
          viewBox="0 0 36 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-9"
        >
          <path
            d="M4 5.5C4 4.1 5.6 3.3 6.7 4.1L16.5 11.6C17.4 12.3 17.4 13.7 16.5 14.4L6.7 21.9C5.6 22.7 4 21.9 4 20.5V5.5Z"
            fill="white"
          />
          <path
            d="M19 5.5C19 4.1 20.6 3.3 21.7 4.1L31.5 11.6C32.4 12.3 32.4 13.7 31.5 14.4L21.7 21.9C20.6 22.7 19 21.9 19 20.5V5.5Z"
            fill="white"
          />
        </svg>
      </button>

      {/* Popover thong tin Hoc vuot */}
      {isOpen && (
        <div className="absolute top-[128px] left-1/2 z-30 w-[min(320px,calc(100vw-36px))] -translate-x-1/2">
          <div className="mx-auto h-0 w-0 border-x-8 border-x-transparent border-b-8 border-b-[#ce287f]" />

          <div className="rounded-3xl border-2 border-[#e04899] bg-[#ce287f] p-4 text-white shadow-2xl">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div>
                <h3 className="text-base font-black leading-snug text-white">
                  Học vượt Chương {unitOrder}
                </h3>
                <p className="mt-1 text-xs font-medium leading-relaxed text-pink-100">
                  Tổng hợp tất cả dạng bài của các chương trước với độ khó nâng
                  cao. Không tính năng lượng, sai tối đa 5 trái tim.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-pink-100 hover:bg-pink-700/40 hover:text-white"
                aria-label="Đóng"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3">
              <Link href={`/lesson/jump/${unitId}`} prefetch className="w-full">
                <Button
                  variant="default"
                  className="h-11 w-full rounded-2xl border-2 border-b-4 border-slate-200 bg-white font-black uppercase text-[#ce287f] hover:bg-slate-50 active:border-b-2"
                >
                  BẮT ĐẦU HỌC VƯỢT +50 KN
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
