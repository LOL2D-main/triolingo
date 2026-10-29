import { cache } from "react";
import { and, eq, sql } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { DAILY_ENERGY } from "@/constants";
import db from "./drizzle";
import {
  challengeProgress,
  challenges,
  courses,
  legendaryLessons,
  lessons,
  units,
  userProgress,
  userSubscription,
} from "./schema";
import { ensureDailyEnergy } from "@/lib/energy";

const DAY_IN_MS = 86_400_000;

export const getCourses = cache(async () => {
  return await db.query.courses.findMany();
});

export const getUserProgress = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;

  try {
    const progress = await db.query.userProgress.findFirst({
      where: eq(userProgress.userId, userId),
      with: {
        activeCourse: true,
      },
    });

    if (!progress) return null;

    const refreshedEnergy = await ensureDailyEnergy(progress);

    return {
      ...progress,
      energy: refreshedEnergy,
      activeCourse: progress.activeCourse ?? null,
    };
  } catch (error) {
    console.error("getUserProgress error:", error);
    return null;
  }
});

export type UnitWithLessons = typeof units.$inferSelect & {
  lessons: (typeof lessons.$inferSelect & {
    completed: boolean;
    isLegendary?: boolean;
  })[];
};

export type CourseUnitsData = {
  units: UnitWithLessons[];
  activeLesson?: typeof lessons.$inferSelect & {
    unit: typeof units.$inferSelect;
  };
  activeLessonId?: number;
  activeLessonPercentage: number;
};

/**
 * Truy van toan bo tien trinh khoa hoc va cac chuong trong 1 luot truy van song song nhe nhat,
 * khong tai du lieu payload jsonb cua cau hoi de tiet kiem bang thong va tang toc do toi da.
 */
export const getCourseUnitsData = cache(async (): Promise<CourseUnitsData> => {
  const { userId } = await auth();
  const progress = await getUserProgress();

  if (!userId || !progress?.activeCourseId) {
    return {
      units: [],
      activeLessonPercentage: 0,
    };
  }

  const courseId = progress.activeCourseId;

  // Chay song song cac truy van nhe
  const [unitsList, progressStatsRows, legendaryRows] = await Promise.all([
    // 1. Cac chuong va bai hoc trong khoa hoc (chi lay thong tin co ban, KHONG lay payload JSON cau hoi)
    db.query.units.findMany({
      where: eq(units.courseId, courseId),
      orderBy: (units, { asc }) => [asc(units.order)],
      with: {
        lessons: {
          orderBy: (lessons, { asc }) => [asc(lessons.order)],
        },
      },
    }),
    // 2. Thong ke so cau hoi va so cau da hoan thanh cua user theo tung bai hoc
    db
      .select({
        lessonId: challenges.lessonId,
        total: sql<number>`COUNT(${challenges.id})::int`,
        completed: sql<number>`COUNT(${challengeProgress.id})::int`,
      })
      .from(challenges)
      .leftJoin(
        challengeProgress,
        and(
          eq(challengeProgress.challengeId, challenges.id),
          eq(challengeProgress.userId, userId),
          eq(challengeProgress.completed, true)
        )
      )
      .groupBy(challenges.lessonId),
    // 3. Cac bai hoc da hoan thanh cap do Huyen thoai
    db.query.legendaryLessons.findMany({
      where: eq(legendaryLessons.userId, userId),
      columns: { lessonId: true },
    }),
  ]);

  const statsMap = new Map<number, { total: number; completed: number }>();
  for (const row of progressStatsRows) {
    statsMap.set(row.lessonId, {
      total: row.total,
      completed: row.completed,
    });
  }

  const legendarySet = new Set(legendaryRows.map((r) => r.lessonId));

  let activeLesson:
    | (typeof lessons.$inferSelect & { unit: typeof units.$inferSelect })
    | undefined;
  let activeLessonPercentage = 0;

  const normalizedUnits: UnitWithLessons[] = unitsList.map((unit) => {
    const lessonsWithStatus = unit.lessons.map((lesson) => {
      const stats = statsMap.get(lesson.id) || { total: 0, completed: 0 };
      const isCompleted = stats.total > 0 && stats.completed >= stats.total;
      const isLegendary = legendarySet.has(lesson.id);

      // Tim bai hoc dau tien chua hoan thanh lam activeLesson
      if (!isCompleted && !activeLesson) {
        activeLesson = {
          ...lesson,
          unit,
        };
        activeLessonPercentage =
          stats.total > 0
            ? Math.round((stats.completed / stats.total) * 100)
            : 0;
      }

      return {
        ...lesson,
        completed: isCompleted,
        isLegendary,
      };
    });

    return {
      ...unit,
      lessons: lessonsWithStatus,
    };
  });

  return {
    units: normalizedUnits,
    activeLesson,
    activeLessonId: activeLesson?.id,
    activeLessonPercentage,
  };
});

export const getUnits = cache(async () => {
  const data = await getCourseUnitsData();
  return data.units;
});

export const getCourseById = cache(async (courseId: number) => {
  return await db.query.courses.findFirst({
    where: eq(courses.id, courseId),
    with: {
      units: {
        orderBy: (units, { asc }) => [asc(units.order)],
        with: {
          lessons: {
            orderBy: (lessons, { asc }) => [asc(lessons.order)],
          },
        },
      },
    },
  });
});

export const getCourseProgress = cache(async () => {
  const data = await getCourseUnitsData();
  return {
    activeLesson: data.activeLesson,
    activeLessonId: data.activeLessonId,
  };
});

/**
 * Lay du lieu chi tiet cua 1 bai hoc de lam bai.
 * Neu da truyen `id`, lay truc tiep khong can goi qua toan bo tien trinh khoa hoc.
 */
export const getLesson = cache(async (id?: number) => {
  const { userId } = await auth();
  if (!userId) return null;

  let targetId = id;
  if (!targetId) {
    const courseProgress = await getCourseProgress();
    targetId = courseProgress?.activeLessonId;
  }

  if (!targetId) return null;

  const data = await db.query.lessons.findFirst({
    where: eq(lessons.id, targetId),
    with: {
      challenges: {
        orderBy: (challenges, { asc }) => [asc(challenges.order)],
        with: {
          challengeOptions: true,
          challengeProgress: {
            where: eq(challengeProgress.userId, userId),
          },
        },
      },
    },
  });

  if (!data || !data.challenges) return null;

  const normalizedChallenges = data.challenges.map((challenge) => {
    const completed =
      challenge.challengeProgress &&
      challenge.challengeProgress.length > 0 &&
      challenge.challengeProgress.every((progress) => progress.completed);

    return { ...challenge, completed };
  });

  return { ...data, challenges: normalizedChallenges };
});

export const getLessonPercentage = cache(async () => {
  const data = await getCourseUnitsData();
  return data.activeLessonPercentage;
});

export const getUserSubscription = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const data = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });

  if (!data) return null;

  const isActive =
    data.stripePriceId &&
    data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

  return {
    ...data,
    isActive: !!isActive,
  };
});

export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();
  if (!userId) return [];

  return await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    limit: 10,
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
    },
  });
});
