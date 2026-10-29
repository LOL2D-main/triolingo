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
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-4 px-6 pt-5 lg:pt-[30px]">
      <X
        onClick={open}
        className="cursor-pointer text-slate-500 transition hover:opacity-75"
      />

      <Progress value={percentage} />

      {isLegendary && (
        <span className="shrink-0 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-3 py-1 text-xs font-black uppercase tracking-wider text-amber-950 shadow-sm">
          Huyền Thoại
        </span>
      )}

      <div className="flex shrink-0 items-center gap-x-4">
        {/* Nang luong */}
        <div
          className="flex items-center gap-x-1.5 font-extrabold text-pink-500"
          title={
            hasActiveSubscription
              ? "Gói Ultra: Năng lượng vô hạn không giới hạn làm bài"
              : "Năng lượng: mỗi câu trả lời tốn 1 năng lượng"
          }
        >
          <Image
            src={hasActiveSubscription ? "/enery_ultra.png" : "/energy.png"}
            alt="Năng lượng"
            width={32}
            height={20}
            className="block h-[20px] w-[32px] object-contain"
          />
          <span className="text-base lg:text-lg">
            {hasActiveSubscription ? (
              <InfinityIcon className="h-5 w-5 stroke-[3] text-purple-600" />
            ) : (
              energy
            )}
          </span>
        </div>

        {/* Da quy Gem */}
        <div
          className="flex items-center gap-x-1.5 font-extrabold text-sky-500"
          title="Đá quý (Gem)"
        >
          <Image
            src="/gem.png"
            alt="Gems"
            width={24}
            height={24}
            className="block h-[24px] w-[24px] object-contain"
          />
          <span className="text-base lg:text-lg">
            {gems}
          </span>
        </div>
      </div>
    </header>
  );
};
