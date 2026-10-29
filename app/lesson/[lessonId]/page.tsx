import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";

import { Quiz } from "../quiz";

type LessonIdPageProps = {
  params: Promise<{
    lessonId: string;
  }>;
  searchParams?: Promise<{
    mode?: string;
  }>;
};

const LessonIdPage = async ({ params, searchParams }: LessonIdPageProps) => {
  await auth.protect();

  const { lessonId } = await params;
  const { mode } = (await searchParams) || {};
  const isLegendary = mode === "legendary";

  const lessonData = getLesson(Number(lessonId));
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) return redirect("/learn");

  const totalChallenges = lesson.challenges.length;
  const completedChallenges = lesson.challenges.filter(
    (challenge) => challenge.completed
  ).length;

  const initialPercentage = isLegendary
    ? 0
    : totalChallenges === 0
      ? 0
      : (completedChallenges / totalChallenges) * 100;

  return (
    <Quiz
      initialLessonId={lesson.id}
      lessonTitle={lesson.title}
      lessonVocab={lesson.vocab}
      initialLessonChallenges={lesson.challenges}
      initialHearts={userProgress.hearts}
      initialGems={userProgress.gems ?? 100}
      initialEnergy={userProgress.energy}
      initialPercentage={initialPercentage}
      userSubscription={userSubscription}
      isLegendary={isLegendary}
    />
  );
};

export default LessonIdPage;
