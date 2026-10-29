"use client";

import { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import { Check, Copy, ExternalLink, KeyRound } from "lucide-react";
import { toast } from "sonner";

import { activateUltraKey } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ZaloIcon } from "@/components/zalo-icon";
import { useUpgradeModal } from "@/store/use-upgrade-modal";

const ZALO_PHONE = "0904299087";
const ZALO_LINK = "https://zalo.me/0904299087";

export const UpgradeModal = () => {
  const [isClient, setIsClient] = useState(false);
  const [keyInput, setKeyInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [pending, startTransition] = useTransition();
  const { isOpen, close } = useUpgradeModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  const handleActivate = () => {
    if (!keyInput.trim()) {
      toast.error("Vui lòng nhập mã key kích hoạt.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await activateUltraKey(keyInput);
        if (res.success) {
          toast.success(res.message);
          setKeyInput("");
          close();
        } else {
          toast.error(res.error || "Mã key không hợp lệ.");
        }
      } catch {
        toast.error("Đã xảy ra lỗi khi kích hoạt key.");
      }
    });
  };

  const handleCopyZalo = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(ZALO_PHONE);
      setCopied(true);
      toast.success(`Đã sao chép số Zalo: ${ZALO_PHONE}`);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <div className="mb-3 flex w-full flex-col items-center justify-center gap-y-2">
            <div className="relative flex h-20 w-28 items-center justify-center">
              <Image
                src="/enery_ultra.png"
                alt="Gói Ultra"
                width={90}
                height={55}
                className="object-contain"
                priority
              />
            </div>

            <DialogTitle className="text-center text-2xl font-black text-neutral-800">
              Nâng cấp gói Ultra
            </DialogTitle>

            <DialogDescription className="text-center text-sm font-medium text-neutral-600">
              Học tập không giới hạn, không tốn năng lượng khi làm bài. Nhập mã
              Key của bạn để kích hoạt ngay.
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-3 pt-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700">
            Mã Key kích hoạt
          </label>
          <div className="relative">
            <KeyRound className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value.toUpperCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleActivate();
              }}
              placeholder="Ví dụ: ABCD-KHU6I-EGN89"
              disabled={pending}
              className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 font-mono text-base font-bold uppercase tracking-wider text-neutral-800 outline-none transition focus:border-[#00a2f9] focus:bg-white"
            />
          </div>

          <Button
            variant="super"
            size="lg"
            className="w-full text-base font-black uppercase tracking-wider"
            onClick={handleActivate}
            disabled={pending || !keyInput.trim()}
          >
            {pending ? "Đang kích hoạt..." : "Kích hoạt Ultra"}
          </Button>
        </div>

        <div className="mt-4 rounded-2xl border-2 border-blue-100 bg-blue-50/70 p-4">
          <div className="flex items-center gap-x-2 text-sm font-bold text-neutral-800">
            <span>Để mua key hãy liên hệ Zalo</span>
            <ZaloIcon className="h-5 w-5 shrink-0" />
            <span>:</span>
            <span className="font-black text-[#0068FF]">{ZALO_PHONE}</span>
          </div>

          <p className="mt-1 text-xs text-neutral-500">
            Mỗi mã key chỉ sử dụng 1 lần duy nhất.
          </p>

          <div className="mt-3 flex items-center gap-2">
            <a
              href={ZALO_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-x-2 rounded-xl bg-[#0068FF] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#0055d4] active:scale-95"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Nhắn tin Zalo ngay
            </a>

            <button
              type="button"
              onClick={handleCopyZalo}
              className="flex items-center gap-x-1.5 rounded-xl border border-blue-200 bg-white px-3 py-2 text-xs font-bold text-neutral-700 transition hover:bg-neutral-50 active:scale-95"
              title="Sao chép số Zalo"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-green-600" />
                  <span className="text-green-600">Đã chép</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-neutral-500" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-neutral-400 hover:text-neutral-600"
            onClick={close}
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
