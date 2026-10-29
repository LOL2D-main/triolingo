"use client";

import { FlameIcon } from "@/components/flame-icon";
import { Button } from "@/components/ui/button";
import { getFlameTier, getFlameTierDetails, isStreakLitToday } from "@/lib/streak";
import { useStreakModal } from "@/store/use-streak-modal";

type StreakButtonProps = {
  streakCount: number;
  lastStreakDate?: string;
  claimedMilestones?: number[];
};

export const StreakButton = ({
  streakCount = 0,
  lastStreakDate = "",
  claimedMilestones = [],
}: StreakButtonProps) => {
  const { open: openStreakModal } = useStreakModal();

  const isLit = isStreakLitToday(lastStreakDate);
  const tier = getFlameTier(streakCount, isLit);
  const details = getFlameTierDetails(tier);

  return (
    <Button
      variant="ghost"
      onClick={() =>
        openStreakModal({
          streakCount,
          lastStreakDate,
          claimedMilestones,
        })
      }
      className={`font-extrabold transition-transform active:scale-95 ${details.textColor}`}
      title={
        isLit
          ? `Chuỗi ${streakCount} ngày - Đã thắp sáng hôm nay`
          : `Chuỗi ${streakCount} ngày - Chưa thắp hôm nay (Học 1 bài để thắp lửa)`
      }
    >
      <div className="mr-1.5 flex items-center justify-center">
        <FlameIcon tier={tier} size={24} />
      </div>
      <span>{streakCount}</span>
    </Button>
  );
};
