"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { useUpgradeModal } from "@/store/use-upgrade-modal";

export const PracticePromoCard = () => {
  const { open } = useUpgradeModal();

  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-2">
          <Image
            src="/assets/super-badge.png"
            alt="Super"
            width={76}
            height={22}
            className="h-5 w-auto object-contain"
          />
          <h3 className="text-base font-black text-neutral-800">
            Nâng cấp cùng Ultra
          </h3>
        </div>

        <Image
          src="/assets/mascot-cube.png"
          alt="TrioLingo"
          width={64}
          height={64}
          className="h-16 w-16 shrink-0 object-contain"
        />
      </div>

      <p className="mt-1.5 text-xs font-medium leading-relaxed text-neutral-500 sm:text-sm">
        Không giới hạn năng lượng, học phù hợp với trình độ và không giới hạn số
        lần chinh phục Huyền thoại!
      </p>

      <Button
        type="button"
        variant="super"
        size="lg"
        onClick={open}
        className="mt-4 h-11 w-full rounded-2xl text-sm font-black uppercase tracking-wider"
      >
        DÙNG ULTRA
      </Button>
    </div>
  );
};
