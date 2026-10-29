"use client";

import Image from "next/image";
import { toast } from "sonner";

import { QuestBarChestIcon } from "@/components/chest-graphics";
import { DailyGiftButton } from "@/components/daily-gift-button";
import { DAILY_QUESTS } from "@/constants";
import { useChestModal } from "@/store/use-chest-modal";

type QuestsClientProps = {
  lessonsCompleted: number;
  chestClaimed: boolean;
  isDailyGiftClaimed?: boolean;
};

export const QuestsClient = ({
  lessonsCompleted,
  chestClaimed,
  isDailyGiftClaimed = false,
}: QuestsClientProps) => {
  const { open: openChestModal } = useChestModal();
  const quest = DAILY_QUESTS[0];

  const current = Math.min(quest.target, lessonsCompleted);
  const isCompleted = current >= quest.target;
  const percentage = Math.round((current / quest.target) * 100);

  const onClickQuest = () => {
    if (chestClaimed) {
      toast.info("Bạn đã nhận rương hôm nay. Quay lại vào ngày mai nhé!");
      return;
    }
    if (!isCompleted) {
      toast.info("Hoàn thành 1 bài học để nhận rương.");
      return;
    }
    openChestModal({
      tier: quest.chestTier,
      rewardGems: quest.rewardGems,
      questId: quest.id,
    });
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Tieu de & Nut Qua moi ngay (Hinh 4) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-black text-neutral-800">
            Nhiệm vụ hằng ngày
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Hoàn thành bài học để mở rương nhận Đá quý
          </p>
        </div>

        {/* Nut Qua Moi Ngay theo mau Hinh 4 */}
        <DailyGiftButton isClaimedToday={isDailyGiftClaimed} />
      </div>

      {/* The Nhiem vu (Hinh 5) */}
      <div
        onClick={onClickQuest}
        className={`group relative flex w-full items-center gap-x-4 rounded-2xl border-2 p-5 text-left transition-all ${
          isCompleted && !chestClaimed
            ? "cursor-pointer border-sky-400 bg-sky-50/40 hover:bg-sky-50 shadow-sm"
            : chestClaimed
            ? "border-slate-200 bg-white opacity-85"
            : "cursor-pointer border-slate-200 bg-white hover:border-slate-300"
        }`}
      >
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-800">
            {quest.title}
          </p>

          <div className="mt-2.5">
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-sky-500 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-neutral-600">
                {current} / {quest.target}
              </span>
            </div>
          </div>

          <p className="mt-2 flex items-center gap-x-1.5 text-xs font-black text-sky-500">
            <Image src="/gem.png" alt="Gem" width={14} height={14} />
            {chestClaimed ? "Đã nhận" : `+${quest.rewardGems}`}
          </p>
        </div>

        <div className="shrink-0 pl-2">
          <QuestBarChestIcon
            tier={quest.chestTier}
            className={`h-12 w-12 transition-transform ${
              isCompleted && !chestClaimed
                ? "animate-bounce"
                : "group-hover:scale-105"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
