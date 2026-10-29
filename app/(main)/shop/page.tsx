import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { VerticalBanner } from "@/components/vertical-banner";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { auth } from "@/lib/auth";

import { Items } from "./items";

const ShopPage = async () => {
  await auth.protect();

  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-3 sm:px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          gems={userProgress.gems ?? 100}
          energy={userProgress.energy}
          hasActiveSubscription={isPro}
          streakCount={userProgress.streakCount ?? 0}
          lastStreakDate={userProgress.lastStreakDate ?? ""}
          claimedStreakMilestones={userProgress.claimedStreakMilestones ?? ""}
        />

        <Quests
          lessonsCompleted={userProgress.questLessonsCompleted ?? 0}
          chestClaimed={!!userProgress.questChest1Claimed}
        />
        <VerticalBanner />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src="/shop.svg"
            alt="Shop"
            height={80}
            width={80}
            className="h-16 w-16 sm:h-20 sm:w-20"
          />

          <h1 className="my-4 sm:my-6 text-center text-xl sm:text-2xl font-black text-neutral-800">
            Cửa hàng
          </h1>
          <p className="mb-4 sm:mb-6 text-center text-xs sm:text-base text-muted-foreground px-2">
            Dùng Đá quý để hồi phục năng lượng hoặc nâng cấp gói Ultra học không giới hạn.
          </p>

          <Items
            gems={userProgress.gems ?? 100}
            energy={userProgress.energy}
            hasActiveSubscription={isPro}
          />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
