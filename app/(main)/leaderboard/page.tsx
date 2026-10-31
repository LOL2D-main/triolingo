import Image from "next/image";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { UserProgress } from "@/components/user-progress";
import { VerticalBanner } from "@/components/vertical-banner";
import { WeeklyLeaderboardTimer } from "@/components/weekly-leaderboard-timer";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { auth } from "@/lib/auth";
import { getWeeklyResetRemainingMs } from "@/lib/energy";

const LeaderboardPage = async () => {
  await auth.protect();

  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();

  const [userProgress, userSubscription, leaderboard] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderboardData,
  ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;
  const weeklyRemainingMs = getWeeklyResetRemainingMs();

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
          listeningCompleted={userProgress.questListeningCompleted ?? 0}
          highAccuracyCompleted={userProgress.questHighAccuracyCompleted ?? 0}
          chest1Claimed={!!userProgress.questChest1Claimed}
          chest2Claimed={!!userProgress.questChest2Claimed}
          chest3Claimed={!!userProgress.questChest3Claimed}
        />
        <VerticalBanner />
      </StickyWrapper>

      <FeedWrapper>
        <div className="flex w-full flex-col items-center">
          <Image
            src="/leaderboard.svg"
            alt="Leaderboard"
            height={80}
            width={80}
            className="h-16 w-16 sm:h-20 sm:w-20"
          />

          <h1 className="my-4 sm:my-6 text-center text-xl sm:text-2xl font-black text-neutral-800">
            Bảng xếp hạng Tuần
          </h1>
          <p className="mb-3 text-center text-xs sm:text-base text-muted-foreground px-2">
            Đua top KN hằng tuần cùng cộng đồng. Sau mỗi 7 ngày, điểm KN sẽ tự động đặt lại về 0 để bắt đầu tuần mới!
          </p>

          <WeeklyLeaderboardTimer initialRemainingMs={weeklyRemainingMs} />

          <Separator className="mb-4 h-0.5 rounded-full" />

          <div className="w-full space-y-1">
            {leaderboard.map((user, index) => (
              <div
                key={user.userId}
                className="flex w-full items-center rounded-2xl p-2 px-3 sm:px-4 hover:bg-slate-100/70 transition-colors"
              >
                <p className="mr-2 sm:mr-3 w-6 text-center font-black text-xs sm:text-sm text-lime-700">
                  {index + 1}
                </p>

                <Avatar className="mr-3 sm:mr-4 h-10 w-10 sm:h-12 sm:w-12 border-2 border-slate-200 bg-green-500 shrink-0">
                  <AvatarImage
                    className="object-cover"
                    src={user.userImageSrc}
                  />
                  <AvatarFallback className="bg-green-600 font-bold text-white text-xs">
                    {user.userName?.slice(0, 2).toUpperCase() || "TL"}
                  </AvatarFallback>
                </Avatar>

                <p className="flex-1 font-bold text-xs sm:text-base text-neutral-800 truncate mr-2">
                  {user.userName}
                </p>

                <p className="shrink-0 font-extrabold text-xs sm:text-sm text-neutral-500 whitespace-nowrap">
                  {user.points} KN
                </p>
              </div>
            ))}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
