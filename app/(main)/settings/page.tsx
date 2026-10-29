import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { VerticalBanner } from "@/components/vertical-banner";
import { getUserProgress, getUserSubscription } from "@/db/queries";

import { SettingsForm } from "./settings-form";

export const metadata = {
  title: "Cài đặt | TrioLingo",
  description: "Cài đặt tài khoản, hồ sơ cá nhân, đổi avatar, mật khẩu, âm thanh và rung.",
};

const SettingsPage = async () => {
  await auth.protect();

  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
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
        <div className="flex w-full flex-col items-center">
          <Image
            src="/settings.svg"
            alt="Cài đặt"
            height={90}
            width={90}
          />

          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            Cài đặt
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Tùy chỉnh thông tin hồ sơ, tài khoản và trải nghiệm học tập của bạn.
          </p>

          <SettingsForm initialProgress={userProgress} />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default SettingsPage;
