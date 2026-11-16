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

  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
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
          listeningCompleted={userProgress.questListeningCompleted ?? 0}
          highAccuracyCompleted={userProgress.questHighAccuracyCompleted ?? 0}
          chest1Claimed={!!userProgress.questChest1Claimed}
          chest2Claimed={!!userProgress.questChest2Claimed}
          chest3Claimed={!!userProgress.questChest3Claimed}
        />
        <VerticalBanner />
      </StickyWrapper>

      <FeedWrapper>
        <Items
          gems={userProgress.gems ?? 100}
          energy={userProgress.energy}
          hearts={userProgress.hearts}
          streakFreezes={userProgress.streakFreezes ?? 0}
          hasActiveSubscription={isPro}
        />
      </FeedWrapper>
    </div>
  );
};

export default ShopPage;
