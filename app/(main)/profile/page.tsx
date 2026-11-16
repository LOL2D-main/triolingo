import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { ProfileMain, ProfileSidebarSocial } from "@/components/profile/profile-client";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getProfileData } from "@/db/queries";
import { auth } from "@/lib/auth";

const ProfilePage = async () => {
  await auth.protect();

  const data = await getProfileData();
  if (!data) redirect("/courses");

  const { userProgress, isPro, top3Count, completedLessonsCount } = data;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-3 sm:px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse!}
          hearts={userProgress.hearts}
          points={userProgress.points}
          gems={userProgress.gems ?? 100}
          energy={userProgress.energy}
          hasActiveSubscription={isPro}
          streakCount={userProgress.streakCount ?? 0}
          lastStreakDate={userProgress.lastStreakDate ?? ""}
          claimedStreakMilestones={userProgress.claimedStreakMilestones ?? ""}
        />

        <ProfileSidebarSocial
          initialFollowing={data.followingUsers}
          initialFollowers={data.followerUsers}
          initialFollowingIds={data.followingIds}
          discoverUsers={data.discoverUsers}
        />
      </StickyWrapper>

      <FeedWrapper>
        <ProfileMain
          user={{
            userId: userProgress.userId,
            userName: userProgress.userName,
            userImageSrc: userProgress.userImageSrc,
            userEmail: userProgress.userEmail || "",
            points: userProgress.points,
            streakCount: userProgress.streakCount ?? 0,
            lastStreakDate: userProgress.lastStreakDate ?? "",
            createdAtIso: userProgress.createdAt
              ? new Date(userProgress.createdAt).toISOString()
              : new Date().toISOString(),
            activeCourseTitle: userProgress.activeCourse!.title,
            activeCourseImage: userProgress.activeCourse!.imageSrc,
          }}
          isPro={isPro}
          top3Count={top3Count}
          completedLessonsCount={completedLessonsCount}
          followingCount={data.followingUsers.length}
          followersCount={data.followerUsers.length}
        />
      </FeedWrapper>
    </div>
  );
};

export default ProfilePage;
