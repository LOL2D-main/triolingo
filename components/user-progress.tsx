import { InfinityIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { StreakButton } from "@/components/streak-button";
import { courses } from "@/db/schema";

type UserProgressProps = {
  activeCourse: typeof courses.$inferSelect;
  hearts?: number;
  points?: number;
  gems?: number;
  energy?: number;
  hasActiveSubscription: boolean;
  streakCount?: number;
  lastStreakDate?: string;
  claimedStreakMilestones?: string;
};

export const UserProgress = ({
  activeCourse,
  gems = 100,
  energy,
  hasActiveSubscription,
  streakCount = 0,
  lastStreakDate = "",
  claimedStreakMilestones = "",
}: UserProgressProps) => {
  const claimedList = claimedStreakMilestones
    ? claimedStreakMilestones
        .split(",")
        .filter(Boolean)
        .map(Number)
    : [];

  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Link href="/courses" prefetch>
        <Button variant="ghost">
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>

      {/* Chuoi ngay hoc (Streak ngon lua) - Thay the vi tri tia set tren thanh header */}
      <StreakButton
        streakCount={streakCount}
        lastStreakDate={lastStreakDate}
        claimedMilestones={claimedList}
      />

      {/* Nang luong lam bai */}
      {energy !== undefined && (
        <Link href="/shop" prefetch>
          <Button
            variant="ghost"
            className="font-bold text-pink-500"
            title={
              hasActiveSubscription
                ? "Gói Ultra: Năng lượng vô hạn"
                : "Năng lượng làm bài"
            }
          >
            <Image
              src={hasActiveSubscription ? "/enery_ultra.png" : "/energy.png"}
              height={20}
              width={32}
              alt="Energy"
              className="mr-1.5 block h-[20px] w-[32px] object-contain"
            />
            {hasActiveSubscription ? (
              <InfinityIcon className="stroke-3 h-4 w-4 text-purple-600" />
            ) : (
              `${energy}`
            )}
          </Button>
        </Link>
      )}

      {/* Gem: da quy */}
      <Link href="/shop" prefetch>
        <Button
          variant="ghost"
          className="font-extrabold text-sky-500"
          title="Đá quý (Gem) - Dùng để mua vật phẩm trong Cửa hàng"
        >
          <Image
            src="/gem.png"
            height={26}
            width={26}
            alt="Gems"
            className="mr-1.5 block h-[26px] w-[26px] object-contain"
          />
          {gems}
        </Button>
      </Link>
    </div>
  );
};
