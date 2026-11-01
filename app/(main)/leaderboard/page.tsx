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
import { WeeklyHonorSection } from "@/components/leaderboard/weekly-honor-section";
import {
  getLeaderboardUsers,
  getPreviousWeekWinners,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { auth } from "@/lib/auth";
import {
  getWeeklyResetRemainingMs,
  isWeekEndedCelebrationPeriod,
} from "@/lib/energy";

const LeaderboardPage = async () => {
  await auth.protect();
  const { userId } = await auth();

  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getLeaderboardUsers();
  const previousWinnersData = getPreviousWeekWinners();

  const [userProgress, userSubscription, leaderboard, previousWinners] =
    await Promise.all([
      userProgressData,
      userSubscriptionData,
      leaderboardData,
      previousWinnersData,
    ]);

  if (!userProgress || !userProgress.activeCourse) redirect("/courses");

  const isPro = !!userSubscription?.isActive;
  const weeklyRemainingMs = getWeeklyResetRemainingMs();
  const isCelebrationTime = isWeekEndedCelebrationPeriod();

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

          <h1 className="my-3 sm:my-5 text-center text-xl sm:text-2xl font-black text-neutral-800">
            Bảng xếp hạng Tuần
          </h1>

          <p className="mb-3 text-center text-xs sm:text-base text-muted-foreground px-2 max-w-lg">
            Đua top KN hằng tuần cùng toàn bộ cộng đồng học viên. Điểm KN sẽ tự động đặt lại sau 7 ngày để vinh danh Quán quân mới!
          </p>

          <WeeklyLeaderboardTimer initialRemainingMs={weeklyRemainingMs} />

          {/* Bảng vinh danh chỉ hiện khi hết tuần (sang đầu tuần mới), ngày thường mặc định ẩn */}
          <WeeklyHonorSection
            winners={previousWinners}
            isCelebrationTime={isCelebrationTime}
          />

          <div className="w-full flex items-center justify-between mt-2 mb-3 px-2">
            <span className="text-xs sm:text-sm font-extrabold text-neutral-700 uppercase tracking-wide">
              Tất cả học viên ({leaderboard.length})
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-muted-foreground">
              Sắp xếp theo Điểm KN
            </span>
          </div>

          <Separator className="mb-4 h-0.5 rounded-full" />

          {/* Danh sách full tất cả người dùng */}
          <div className="w-full space-y-1.5 pb-12">
            {leaderboard.map((user, index) => {
              const rank = index + 1;
              const isCurrentUser = user.userId === userId;

              const rankBadgeClass =
                rank === 1
                  ? "bg-amber-400 text-amber-950 font-black ring-2 ring-amber-200"
                  : rank === 2
                  ? "bg-slate-300 text-slate-800 font-black ring-2 ring-slate-200"
                  : rank === 3
                  ? "bg-amber-600 text-white font-black ring-2 ring-amber-100"
                  : "text-neutral-500 font-extrabold";

              return (
                <div
                  key={user.userId}
                  className={`flex w-full items-center rounded-2xl p-2.5 px-3 sm:px-4 transition-colors ${
                    isCurrentUser
                      ? "bg-lime-50/90 border-2 border-lime-400 shadow-xs"
                      : "hover:bg-slate-100/70 border border-transparent"
                  }`}
                >
                  <div className="mr-2 sm:mr-3 w-7 sm:w-8 flex items-center justify-center">
                    {rank <= 3 ? (
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-xs ${rankBadgeClass}`}
                      >
                        {rank}
                      </span>
                    ) : (
                      <span className="text-xs sm:text-sm font-black text-neutral-500">
                        {rank}
                      </span>
                    )}
                  </div>

                  <Avatar className="mr-3 sm:mr-4 h-10 w-10 sm:h-11 sm:w-11 border-2 border-slate-200 bg-green-500 shrink-0">
                    <AvatarImage
                      className="object-cover"
                      src={user.userImageSrc}
                    />
                    <AvatarFallback className="bg-green-600 font-bold text-white text-xs">
                      {user.userName?.slice(0, 2).toUpperCase() || "TL"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 flex items-center min-w-0 mr-2">
                    <p className="font-bold text-xs sm:text-base text-neutral-800 truncate">
                      {user.userName}
                    </p>
                    {isCurrentUser && (
                      <span className="ml-2 text-[10px] sm:text-xs font-black bg-lime-500 text-white px-2 py-0.5 rounded-full shrink-0">
                        Bạn
                      </span>
                    )}
                  </div>

                  <p className="shrink-0 font-black text-xs sm:text-sm text-lime-700 whitespace-nowrap">
                    {user.points.toLocaleString("vi-VN")} KN
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default LeaderboardPage;
