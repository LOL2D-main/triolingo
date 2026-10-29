import Image from "next/image";
import Link from "next/link";

import { UserProgress } from "@/components/user-progress";
import { courses } from "@/db/schema";

type MobileHeaderProps = {
  userProgress?: {
    activeCourse: typeof courses.$inferSelect | null;
    hearts?: number;
    points?: number;
    gems?: number;
    energy?: number;
    streakCount?: number;
    lastStreakDate?: string;
    claimedStreakMilestones?: string;
  } | null;
  isPro?: boolean;
};

export const MobileHeader = ({
  userProgress,
  isPro = false,
}: MobileHeaderProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 flex h-[54px] w-full items-center justify-between border-b border-slate-200 bg-white/95 px-2 backdrop-blur-md lg:hidden">
      {userProgress?.activeCourse ? (
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
      ) : (
        <Link href="/courses" className="flex items-center gap-x-2 pl-2">
          <Image src="/mascot.svg" height={32} width={32} alt="TrioLingo" />
          <span className="text-xl font-extrabold tracking-wide text-green-600">
            TrioLingo
          </span>
        </Link>
      )}
    </nav>
  );
};
