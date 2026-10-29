"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

import { useAuth } from "@/components/auth-provider";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const HIDE_STORAGE_KEY = "triolingo_banner_hide_until";
const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;

// Biến bộ nhớ cấp module để theo dõi trong 1 phiên load trang (F5/tải lại trang thì biến này reset)
// Giúp khi chuyển trang nội bộ (Trang chủ -> Xếp hạng -> Làm bài) không bị hiện lại
let hasShownInThisPageLoad = false;

export const BannerModal = () => {
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain15m, setDontShowAgain15m] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Chỉ hiện khi người dùng đã đăng nhập tài khoản
    if (!user) {
      setIsOpen(false);
      return;
    }

    // Nếu trong phiên load trang này đã mở rồi thì không mở lại khi điều hướng qua trang khác
    if (hasShownInThisPageLoad) return;

    // Kiểm tra xem có đang trong thời gian chặn 15 phút không
    try {
      const hideUntilStr = localStorage.getItem(HIDE_STORAGE_KEY);
      if (hideUntilStr) {
        const hideUntil = Number(hideUntilStr);
        if (!Number.isNaN(hideUntil) && Date.now() < hideUntil) {
          return;
        }
      }
    } catch {
      // Bỏ qua nếu localStorage bị chặn
    }

    // Đánh dấu đã hiện trong lần load trang này và mở banner
    hasShownInThisPageLoad = true;
    setIsOpen(true);
  }, [isClient, user]);

  const handleClose = () => {
    if (dontShowAgain15m) {
      try {
        localStorage.setItem(
          HIDE_STORAGE_KEY,
          String(Date.now() + FIFTEEN_MINUTES_MS)
        );
      } catch {
        // Bỏ qua
      }
    }
    setIsOpen(false);
  };

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="max-w-[92vw] sm:max-w-xl md:max-w-2xl overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-0 shadow-2xl [&>button]:hidden"
      >
        <DialogTitle className="sr-only">Thông báo TrioLingo</DialogTitle>

        {/* Nút X đóng ở góc trên bên phải */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng banner"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:bg-black/85 active:scale-95"
        >
          <X className="h-5 w-5 stroke-[2.5]" />
        </button>

        {/* Ảnh Banner */}
        <div className="relative w-full overflow-hidden bg-slate-900">
          <Image
            src="/banner.png"
            alt="Banner TrioLingo"
            width={1672}
            height={940}
            priority
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Thanh điều khiển bên dưới */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/90 px-5 py-3">
          <label className="flex cursor-pointer select-none items-center gap-x-2.5 text-xs sm:text-sm font-semibold text-neutral-700 hover:text-neutral-900">
            <input
              type="checkbox"
              checked={dontShowAgain15m}
              onChange={(e) => setDontShowAgain15m(e.target.checked)}
              className="h-4 w-4 rounded border-2 border-slate-300 text-sky-600 focus:ring-sky-500"
            />
            <span>Không hiện lại sau 15p</span>
          </label>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-slate-200 bg-white px-4 py-1.5 text-xs sm:text-sm font-bold text-neutral-700 shadow-sm transition hover:bg-slate-100 active:scale-95"
          >
            Đóng
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

