import { auth } from "@/lib/auth";
import { getIsAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { VerticalBanner } from "@/components/vertical-banner";
import {
  getCourseUnitsData,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";

import { Header } from "./header";
import { Unit } from "./unit";

const LearnPage = async () => {
  await auth.protect();

  const userProgressData = getUserProgress();
  const courseUnitsData = getCourseUnitsData();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, courseData, userSubscription] = await Promise.all([
    userProgressData,
    courseUnitsData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;
  const isAdmin = await getIsAdmin();

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
        <Quests
          lessonsCompleted={userProgress.questLessonsCompleted ?? 0}
          chestClaimed={!!userProgress.questChest1Claimed}
        />
        <VerticalBanner />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {courseData.units.map((unit) => (
          <div key={unit.id} className="mb-10">
            <Unit
              id={unit.id}
              order={unit.order}
              description={unit.description}
              title={unit.title}
              lessons={unit.lessons}
              activeLesson={courseData.activeLesson}
              activeLessonPercentage={courseData.activeLessonPercentage}
              unlockAll={isAdmin}
            />
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
};

export default LearnPage;
