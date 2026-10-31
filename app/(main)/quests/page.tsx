import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { VerticalBanner } from "@/components/vertical-banner";
import { getDailyQuestsForToday } from "@/constants";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { auth } from "@/lib/auth";
import { getVietnamDateString } from "@/lib/energy";
import { getVietnamToday } from "@/lib/streak";

import { QuestsClient } from "./quests-client";

const QuestsPage = async () => {
  await auth.protect();

  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;
  const todayStr = getVietnamDateString();
  const dailyQuests = getDailyQuestsForToday(todayStr);
  const isDailyGiftClaimed =
    userProgress.dailyFreeChestDate === getVietnamToday();

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
        {!isPro && <Promo />}
        <VerticalBanner />
      </StickyWrapper>

      <FeedWrapper>
        <QuestsClient
          quests={dailyQuests}
          lessonsCompleted={userProgress.questLessonsCompleted ?? 0}
          listeningCompleted={userProgress.questListeningCompleted ?? 0}
          highAccuracyCompleted={userProgress.questHighAccuracyCompleted ?? 0}
          chest1Claimed={!!userProgress.questChest1Claimed}
          chest2Claimed={!!userProgress.questChest2Claimed}
          chest3Claimed={!!userProgress.questChest3Claimed}
          isDailyGiftClaimed={isDailyGiftClaimed}
        />
      </FeedWrapper>
    </div>
  );
};

export default QuestsPage;
