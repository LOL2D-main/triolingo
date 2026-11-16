import { redirect } from "next/navigation";

import { getPracticeSessionData } from "@/db/queries";
import { auth } from "@/lib/auth";

import { Quiz } from "../quiz";

type PracticeLessonPageProps = {
  searchParams: Promise<{
    mode?: string;
  }>;
};

const PracticeLessonPage = async ({
  searchParams,
}: PracticeLessonPageProps) => {
  await auth.protect();

  const { mode = "intensive" } = (await searchParams) || {};
  const session = await getPracticeSessionData(mode);

  if (!session || !session.challenges.length) {
    redirect("/practice");
  }

  return (
    <Quiz
      initialLessonId={session.challenges[0].lessonId}
      lessonTitle={session.title}
      initialLessonChallenges={session.challenges}
      initialHearts={session.userProgress.hearts}
      initialGems={session.userProgress.gems ?? 100}
      initialEnergy={session.userProgress.energy}
      initialPercentage={0}
      userSubscription={session.userSubscription}
      mode="practice"
      practiceMode={session.mode}
    />
  );
};

export default PracticeLessonPage;
