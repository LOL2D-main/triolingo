"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { QuestBarChestIcon } from "@/components/chest-graphics";
import { Button } from "@/components/ui/button";
import { DAILY_QUESTS } from "@/constants";
import { useChestModal } from "@/store/use-chest-modal";

type QuestsProps = {
  lessonsCompleted?: number;
  chestClaimed?: boolean;
};

export const Quests = ({
  lessonsCompleted = 0,
  chestClaimed = false,
}: QuestsProps) => {
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
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-bold">Nhiệm vụ</h3>

        <Link href="/quests" prefetch>
          <Button size="sm" variant="primaryOutline">
            Xem tất cả
          </Button>
        </Link>
      </div>

      <button
        type="button"
        onClick={onClickQuest}
        className={`flex w-full items-center gap-x-3 text-left transition-all ${
          isCompleted && !chestClaimed ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex w-full flex-col gap-y-1.5">
          <p className="text-xs font-bold text-neutral-800">{quest.title}</p>

          <div className="relative h-3.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-sky-500 transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-extrabold text-neutral-600">
              {current} / {quest.target}
            </span>
          </div>

          <p className="flex items-center gap-x-1 text-xs font-extrabold text-sky-500">
            <Image src="/gem.png" alt="Gem" width={14} height={14} />
            {chestClaimed ? "Đã nhận" : `+${quest.rewardGems}`}
          </p>
        </div>

        <QuestBarChestIcon
          tier={quest.chestTier}
          className={`h-10 w-10 shrink-0 ${
            isCompleted && !chestClaimed ? "animate-bounce" : ""
          }`}
        />
      </button>
    </div>
  );
};
