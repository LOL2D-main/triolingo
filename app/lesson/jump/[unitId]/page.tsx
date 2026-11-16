import { redirect } from "next/navigation";

import {
  getJumpUnitData,
  getUserProgress,
  getUserSubscription,
} from "@/db/queries";
import { auth } from "@/lib/auth";

import { Quiz } from "../../quiz";

type JumpUnitPageProps = {
  params: Promise<{
    unitId: string;
  }>;
};

const JumpUnitPage = async ({ params }: JumpUnitPageProps) => {
  await auth.protect();

  const { unitId } = await params;
  const parsedUnitId = Number(unitId);
  if (!parsedUnitId || Number.isNaN(parsedUnitId)) {
    redirect("/learn");
  }

  const [jumpData, userProgress, userSubscription] = await Promise.all([
    getJumpUnitData(parsedUnitId),
    getUserProgress(),
    getUserSubscription(),
  ]);

  if (!jumpData || !userProgress || !jumpData.challenges.length) {
    redirect("/learn");
  }

  return (
    <Quiz
      initialLessonId={jumpData.challenges[0].lessonId}
      lessonTitle={`Học vượt Chương ${jumpData.targetUnit.order}`}
      initialLessonChallenges={jumpData.challenges}
      initialHearts={5}
      initialGems={userProgress.gems ?? 100}
      initialEnergy={userProgress.energy}
      initialPercentage={0}
      userSubscription={userSubscription}
      mode="jump"
      jumpUnitId={jumpData.targetUnit.id}
      jumpUnitOrder={jumpData.targetUnit.order}
    />
  );
};

export default JumpUnitPage;
