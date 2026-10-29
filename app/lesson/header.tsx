import { InfinityIcon, X } from "lucide-react";
import Image from "next/image";

import { Progress } from "@/components/ui/progress";
import { DAILY_ENERGY } from "@/constants";
import { useExitModal } from "@/store/use-exit-modal";

type HeaderProps = {
  hearts?: number;
  gems?: number;
  percentage: number;
  energy?: number;
  hasActiveSubscription: boolean;
  isLegendary?: boolean;
};

export const Header = ({
  gems = 100,
  percentage,
  energy = DAILY_ENERGY,
  hasActiveSubscription,
  isLegendary,
}: HeaderProps) => {
  const { open } = useExitModal();

  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-2 sm:gap-x-4 px-3 sm:px-6 pt-3 sm:pt-5 lg:pt-[30px]">
      <button
        type="button"
        onClick={open}
        className="p-1 -ml-1 text-slate-500 transition hover:opacity-75 focus:outline-none"
        aria-label="Thoát bài học"
      >
        <X className="h-6 w-6" />
      </button>

      <div className="flex-1 min-w-[60px] max-w-[500px]">
        <Progress value={percentage} />
      </div>

      {isLegendary && (
        <span className="shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-950 shadow-sm">
          Huyền Thoại
        </span>
      )}

      <div className="flex shrink-0 items-center gap-x-2 sm:gap-x-4">
        {/* Nang luong */}
        <div
          className="flex items-center gap-x-1 font-extrabold text-pink-500"
          title={
            hasActiveSubscription
              ? "Gói Ultra: Năng lượng vô hạn"
              : "Năng lượng làm bài"
          }
        >
          <Image
            src={hasActiveSubscription ? "/enery_ultra.png" : "/energy.png"}
            alt="Năng lượng"
            width={28}
            height={18}
            className="block h-[18px] w-[28px] sm:h-[20px] sm:w-[32px] object-contain"
          />
          <span className="text-xs sm:text-base font-black">
            {hasActiveSubscription ? (
              <InfinityIcon className="h-4 w-4 sm:h-5 sm:w-5 stroke-[3] text-purple-600" />
            ) : (
              energy
            )}
          </span>
        </div>

        {/* Da quy Gem */}
        <div
          className="flex items-center gap-x-1 font-extrabold text-sky-500"
          title="Đá quý (Gem)"
        >
          <Image
            src="/gem.png"
            alt="Gems"
            width={20}
            height={20}
            className="block h-[20px] w-[20px] sm:h-[24px] sm:w-[24px] object-contain"
          />
          <span className="text-xs sm:text-base font-black">{gems}</span>
        </div>
      </div>
    </header>
  );
};
