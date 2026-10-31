"use client";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { QuestBarChestIcon } from "@/components/chest-graphics";
import { Button } from "@/components/ui/button";
import { getDailyQuestsForToday } from "@/constants";
import { useChestModal } from "@/store/use-chest-modal";

type QuestsProps = {
  lessonsCompleted?: number;
  listeningCompleted?: number;
  highAccuracyCompleted?: number;
  chest1Claimed?: boolean;
  chest2Claimed?: boolean;
  chest3Claimed?: boolean;
  chestClaimed?: boolean;
};

export const Quests = ({
  lessonsCompleted = 0,
  listeningCompleted = 0,
  highAccuracyCompleted = 0,
  chest1Claimed = false,
  chest2Claimed = false,
  chest3Claimed = false,
  chestClaimed = false,
}: QuestsProps) => {
  const { open: openChestModal } = useChestModal();
  const quests = getDailyQuestsForToday();

  const progressMap: Record<1 | 2 | 3, number> = {
    1: lessonsCompleted,
    2: listeningCompleted,
    3: highAccuracyCompleted,
  };

  const claimedMap: Record<1 | 2 | 3, boolean> = {
    1: chest1Claimed || chestClaimed,
    2: chest2Claimed,
    3: chest3Claimed,
  };

  return (
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-lg font-bold">Nhiệm vụ hằng ngày</h3>

        <Link href="/quests" prefetch>
          <Button size="sm" variant="primaryOutline">
            Xem tất cả
          </Button>
        </Link>
      </div>

      <div className="space-y-3.5">
        {quests.map((quest) => {
          const rawProgress = progressMap[quest.id] ?? 0;
          const current = Math.min(quest.target, rawProgress);
          const isCompleted = current >= quest.target;
          const isClaimed = claimedMap[quest.id];
          const percentage = Math.round((current / quest.target) * 100);

          const onClickQuest = () => {
            if (isClaimed) {
              toast.info("Bạn đã nhận rương nhiệm vụ này hôm nay!");
              return;
            }
            if (!isCompleted) {
              toast.info(
                `Hoàn thành "${quest.title}" (${current}/${quest.target}) để mở ${quest.chestName}.`
              );
              return;
            }
            openChestModal({
              tier: quest.chestTier,
              rewardGems: quest.rewardGems,
              questId: quest.id,
              title: quest.chestName,
              description: `Phần thưởng hoàn thành: "${quest.title}"`,
            });
          };

          return (
            <button
              key={quest.id}
              type="button"
              onClick={onClickQuest}
              className={`flex w-full items-center gap-x-3 text-left transition-all ${
                isCompleted && !isClaimed ? "cursor-pointer" : ""
              }`}
            >
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 shrink-0"
              >
                <path
                  d="M27.5 4L10 26.5H23L19.5 44L38 20.5H25L27.5 4Z"
                  fill="#FFC800"
                  stroke="#FFC800"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex min-w-0 flex-1 flex-col gap-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-extrabold text-neutral-800">
                    {quest.title}
                  </p>
                  <span className="inline-flex shrink-0 items-center gap-x-1 text-[11px] font-extrabold text-sky-500">
                    <Image src="/gem.png" alt="Gem" width={12} height={12} />
                    {isClaimed ? "Đã nhận" : `+${quest.rewardGems}`}
                  </span>
                </div>

                <div className="flex items-center">
                  <div className="relative h-4 flex-1 overflow-hidden rounded-l-full bg-[#E5E5E5]">
                    <div
                      className="h-full rounded-l-full bg-[#FFC800] transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-neutral-600">
                      {current} / {quest.target}
                    </span>
                  </div>

                  <div className="-ml-1 shrink-0">
                    <QuestBarChestIcon
                      tier={quest.chestTier}
                      className={`h-8 w-8 ${
                        isCompleted && !isClaimed ? "animate-bounce" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
