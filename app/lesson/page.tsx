import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

import { getLesson, getUserProgress, getUserSubscription } from "@/db/queries";

import { Quiz } from "./quiz";

const LessonPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  await auth.protect();

  const sp = await searchParams;
  const isLegendary = sp.legendary === "true";

  const lessonData = getLesson();
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

export default LessonPage;
