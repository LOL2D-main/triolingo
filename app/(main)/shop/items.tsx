"use client";

import { useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { refillEnergyWithGems } from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { DAILY_ENERGY } from "@/constants";
import { useUpgradeModal } from "@/store/use-upgrade-modal";

type ItemsProps = {
  gems: number;
  energy: number;
  hasActiveSubscription: boolean;
};

const GEMS_FOR_REFILL = 50;

export const Items = ({
  gems,
  energy,
  hasActiveSubscription,
}: ItemsProps) => {
  const [pending, startTransition] = useTransition();
  const { open: openUpgradeModal } = useUpgradeModal();

  const onRefillEnergy = () => {
    if (pending || energy >= DAILY_ENERGY || gems < GEMS_FOR_REFILL) return;

    startTransition(async () => {
      try {
        await refillEnergyWithGems();
        toast.success("Đã hồi phục toàn bộ năng lượng!");
      } catch (err: any) {
        toast.error(err?.message || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    });
  };

  const onUpgrade = () => {
    openUpgradeModal();
  };

  const isEnergyFull = energy >= DAILY_ENERGY;

  return (
    <ul className="w-full">
      {/* Hoi phuc nang luong bang da quy Gem */}
      <li className="flex w-full items-center gap-x-3 sm:gap-x-4 border-t-2 border-slate-200 p-3 sm:p-4">
        <div className="relative h-10 w-12 sm:h-12 sm:w-16 shrink-0">
          <Image
            src="/energy.png"
            alt="Energy"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm sm:text-base font-bold text-neutral-800 break-words">
            Hồi phục toàn bộ Năng lượng
          </p>
          <p className="text-[11px] sm:text-xs text-neutral-500 break-words mt-0.5">
            Dùng 50 Đá quý để nạp đầy lại 20/20 năng lượng học tập ngay lập tức.
          </p>
        </div>

        <Button
          onClick={onRefillEnergy}
          disabled={pending || isEnergyFull || gems < GEMS_FOR_REFILL}
          aria-disabled={pending || isEnergyFull || gems < GEMS_FOR_REFILL}
          className="shrink-0 text-xs sm:text-sm px-3 sm:px-4 h-10 font-bold"
        >
          {isEnergyFull ? (
            "Đầy"
          ) : (
            <div className="flex items-center gap-x-1.5">
              <Image
                src="/gem.png"
                alt="Gem"
                height={18}
                width={18}
                className="object-contain"
              />
              <p className="font-bold">{GEMS_FOR_REFILL}</p>
            </div>
          )}
        </Button>
      </li>

      {/* Nang cap goi Ultra - Mo popup nhap key hoac lien he Zalo */}
      <li className="flex w-full items-center gap-x-3 sm:gap-x-4 border-t-2 border-slate-200 p-3 sm:p-4 pt-6 sm:pt-8">
        <div className="relative h-10 w-12 sm:h-12 sm:w-16 shrink-0">
          <Image
            src="/enery_ultra.png"
            alt="Ultra"
            fill
            className="object-contain drop-shadow"
          />
        </div>

        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm sm:text-base font-bold text-neutral-800 break-words">
            Gói Ultra (Năng lượng vô hạn)
          </p>
          <p className="text-[11px] sm:text-xs text-neutral-500 break-words mt-0.5">
            Không tính năng lượng khi làm bài, học tập thoải mái không giới hạn!
          </p>
        </div>

        <Button
          onClick={onUpgrade}
          variant={hasActiveSubscription ? "default" : "super"}
          disabled={pending || hasActiveSubscription}
          aria-disabled={pending || hasActiveSubscription}
          className="shrink-0 text-xs sm:text-sm px-3 sm:px-4 h-10 font-bold"
        >
          {hasActiveSubscription ? "Đang dùng" : "Nâng cấp"}
        </Button>
      </li>
    </ul>
  );
};
