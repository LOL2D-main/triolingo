import { cache } from "react";
import { and, desc, eq, inArray, lt, ne, sql } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { ADMIN_USER_ID } from "@/lib/admin-constants";
import type { Exercise, SpeakerId, VocabItem } from "@/lib/exercise-types";
import {
  ensureDailyEnergy,
  ensureWeeklyLeaderboardReset,
} from "@/lib/energy";
import db from "./drizzle";
import {
  challengeProgress,
  challenges,
  courses,
  legendaryLessons,
  lessons,
  units,
  userFollows,
  userMistakes,
  userProgress,
  userSubscription,
  weeklyPodiumWinners,
} from "./schema";

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

    const refreshed = await ensureDailyEnergy(progress);

    return {
      ...progress,
      energy: refreshed.energy,
      points: refreshed.points,
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

export const getLeaderboardUsers = cache(async () => {
  const { userId } = await auth();
  if (!userId) return [];

  await ensureWeeklyLeaderboardReset();

  // Mở full tất cả người dùng đã tạo tài khoản, sắp xếp theo KN từ cao xuống thấp
  return await db.query.userProgress.findMany({
    orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
    columns: {
      userId: true,
      userName: true,
      userImageSrc: true,
      points: true,
      streakCount: true,
    },
  });
});

export const getTopTenUsers = getLeaderboardUsers;

export const getPreviousWeekWinners = cache(async () => {
  try {
    const winners = await db.query.weeklyPodiumWinners.findMany({
      orderBy: (table, { desc, asc }) => [desc(table.weekKey), asc(table.rank)],
      limit: 3,
    });
    return winners;
  } catch (error) {
    console.error("Failed to get previous week winners:", error);
    return [];
  }
});

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Xay dung bo cau hoi cho che do HOC VUOT (/lesson/jump/[unitId]):
 * - Lay tat ca dang bai cua cac chuong truoc do (order < targetUnit.order)
 * - Tang do kho: an chu o cac cau nghe choice, bot goi y chu cai o fill-letters, them tu gay nhieu o build.
 */
export const getJumpUnitData = async (unitId: number) => {
  const { userId } = await auth();
  if (!userId) return null;

  const progress = await getUserProgress();
  if (!progress?.activeCourseId) return null;

  const targetUnit = await db.query.units.findFirst({
    where: eq(units.id, unitId),
  });

  if (!targetUnit || targetUnit.order <= 1) return null;

  const prevUnits = await db.query.units.findMany({
    where: and(
      eq(units.courseId, targetUnit.courseId),
      lt(units.order, targetUnit.order)
    ),
    orderBy: (u, { asc }) => [asc(u.order)],
    with: {
      lessons: {
        orderBy: (l, { asc }) => [asc(l.order)],
        with: {
          challenges: {
            orderBy: (c, { asc }) => [asc(c.order)],
            with: {
              challengeOptions: true,
            },
          },
        },
      },
    },
  });

  if (!prevUnits.length) return null;

  // Thu thap tat ca cau hoi tu cac chuong truoc, giu thong tin do kho tang dan theo thu tu chuong
  const allChallenges = prevUnits.flatMap((u) =>
    u.lessons.flatMap((l) =>
      l.challenges.map((c) => ({
        ...c,
        unitOrder: u.order,
      }))
    )
  );

  if (!allChallenges.length) return null;

  // Tao ngan hang tu gay nhieu tieng Anh tu cac bai truoc de tang do kho cho dang 'build'
  const distractorWords = Array.from(
    new Set(
      allChallenges
        .flatMap((c) => {
          if (c.type === "EXERCISE" && c.payload) {
            if (c.payload.kind === "build") return c.payload.answer.split(/\s+/);
            if (c.payload.kind === "type-missing") return [c.payload.answer];
            if (c.payload.kind === "listen-type") return c.payload.audio.split(/\s+/);
          }
          return [];
        })
        .map((w) => w.replace(/[.,!?"]/g, "").trim())
        .filter((w) => w.length >= 2 && /^[a-zA-Z']+$/.test(w))
    )
  );

  // Nhom theo tat ca cac dang bai de dam bao KHONG BO SOT dang bai nao tu cac bai truoc
  const byKind = new Map<string, typeof allChallenges>();
  for (const ch of allChallenges) {
    const kind =
      ch.type === "EXERCISE" && ch.payload ? ch.payload.kind : ch.type;
    const list = byKind.get(kind) || [];
    list.push(ch);
    byKind.set(kind, list);
  }

  // Uu tien chon dai dien moi dang bai, lay manh o cac chuong gan nhat (do kho cao nhat) + rai deu cac chuong truoc
  const selected: typeof allChallenges = [];
  const pickedIds = new Set<number>();

  // Vong 1: Moi dang bai lay it nhat 2 cau (1 cau o chuong cao nhat, 1 cau ngau nhien)
  for (const [, list] of byKind) {
    const sortedHardFirst = [...list].sort((a, b) => b.unitOrder - a.unitOrder);
    const highUnitPool = shuffleArray(sortedHardFirst.slice(0, Math.max(4, Math.ceil(sortedHardFirst.length / 2))));
    const restPool = shuffleArray(sortedHardFirst);

    for (const candidate of [...highUnitPool, ...restPool]) {
      if (selected.filter((s) => (s.type === "EXERCISE" && s.payload ? s.payload.kind : s.type) === (candidate.type === "EXERCISE" && candidate.payload ? candidate.payload.kind : candidate.type)).length >= 2) {
        break;
      }
      if (!pickedIds.has(candidate.id)) {
        pickedIds.add(candidate.id);
        selected.push(candidate);
      }
    }
  }

  // Vong 2: Bo sung them den du 12 cau, uu tien cac dang tu luan / nghe / dien khuyet / ghep cau
  const hardKinds = new Set(["listen-type", "fill-letters", "type-missing", "build"]);
  const remainingHard = shuffleArray(
    allChallenges.filter(
      (c) =>
        !pickedIds.has(c.id) &&
        c.type === "EXERCISE" &&
        c.payload &&
        hardKinds.has(c.payload.kind)
    )
  );
  const remainingAll = shuffleArray(
    allChallenges.filter((c) => !pickedIds.has(c.id))
  );

  const TARGET_COUNT = Math.min(12, allChallenges.length);
  for (const candidate of [...remainingHard, ...remainingAll]) {
    if (selected.length >= TARGET_COUNT) break;
    if (!pickedIds.has(candidate.id)) {
      pickedIds.add(candidate.id);
      selected.push(candidate);
    }
  }

  // Tang do kho cho tung cau hoi da chon
  const upgradedChallenges = shuffleArray(selected).map((ch, idx) => {
    let nextPayload = ch.payload;

    if (ch.type === "EXERCISE" && ch.payload) {
      if (ch.payload.kind === "fill-letters" && ch.payload.prefix.length >= 2) {
        // Giam bot chu cai goi y o prefix de nguoi hoc phai tu nho nhieu hon
        const trimChars = ch.payload.prefix.length >= 4 ? 2 : 1;
        const cutIndex = ch.payload.prefix.length - trimChars;
        const moved = ch.payload.prefix.slice(cutIndex);
        nextPayload = {
          ...ch.payload,
          prefix: ch.payload.prefix.slice(0, cutIndex),
          answer: moved + ch.payload.answer,
        };
      } else if (ch.payload.kind === "build") {
        // Them 2 tu gay nhieu tieng Anh vao ngan hang tu va xao tron
        const bankSet = new Set(ch.payload.bank.map((w) => w.toLowerCase()));
        const extras = shuffleArray(
          distractorWords.filter((w) => !bankSet.has(w.toLowerCase()))
        ).slice(0, 2);
        nextPayload = {
          ...ch.payload,
          bank: shuffleArray([...ch.payload.bank, ...extras]),
        };
      } else if (ch.payload.kind === "choice") {
        const hasAudio = Boolean(ch.payload.audio || ch.payload.prompt);
        const isHardListen = hasAudio && idx % 2 === 0;
        nextPayload = {
          ...ch.payload,
          hideText: isHardListen ? true : ch.payload.hideText,
          options: shuffleArray(ch.payload.options),
        };
      }
    }

    return {
      ...ch,
      payload: nextPayload,
      challengeOptions: shuffleArray(ch.challengeOptions),
      completed: false,
    };
  });

  return {
    targetUnit,
    challenges: upgradedChallenges,
  };
};

/**
 * Lay du lieu cho trang Ho so (/profile):
 * - Thong ke streak, KN, thanh tich, so lan top 3
 * - Danh sach dang theo doi / nguoi theo doi & goi y ban be
 */
export const getProfileData = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const [progress, subscription, top3Rows, completedLessonsRows, followingRows, followerRows, allUsers] =
    await Promise.all([
      getUserProgress(),
      getUserSubscription(),
      db.query.weeklyPodiumWinners.findMany({
        where: eq(weeklyPodiumWinners.userId, userId),
      }),
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
      db.query.userFollows.findMany({
        where: eq(userFollows.followerId, userId),
        orderBy: (t, { desc }) => [desc(t.createdAt)],
      }),
      db.query.userFollows.findMany({
        where: eq(userFollows.followingId, userId),
        orderBy: (t, { desc }) => [desc(t.createdAt)],
      }),
      db.query.userProgress.findMany({
        where: ne(userProgress.userId, userId),
        orderBy: (t, { desc }) => [desc(t.points)],
        columns: {
          userId: true,
          userName: true,
          userImageSrc: true,
          points: true,
        },
        limit: 50,
      }),
    ]);

  if (!progress || !progress.activeCourse) return null;

  const userMap = new Map(allUsers.map((u) => [u.userId, u]));
  const followingIds = new Set(followingRows.map((f) => f.followingId));

  // Dam bao lay thong tin user cho nhung nguoi dang theo doi neu nam ngoai top 50
  const missingIds = [
    ...followingRows.map((f) => f.followingId),
    ...followerRows.map((f) => f.followerId),
  ].filter((id) => !userMap.has(id));

  if (missingIds.length > 0) {
    const extraUsers = await db.query.userProgress.findMany({
      where: inArray(userProgress.userId, missingIds),
      columns: {
        userId: true,
        userName: true,
        userImageSrc: true,
        points: true,
      },
    });
    for (const u of extraUsers) {
      userMap.set(u.userId, u);
    }
  }

  const followingUsers = followingRows
    .map((r) => userMap.get(r.followingId))
    .filter((u): u is NonNullable<typeof u> => Boolean(u));

  const followerUsers = followerRows
    .map((r) => ({
      ...userMap.get(r.followerId),
      isFollowingBack: followingIds.has(r.followerId),
    }))
    .filter(
      (u): u is NonNullable<(typeof allUsers)[number]> & { isFollowingBack: boolean } =>
        Boolean(u.userId)
    );

  const completedLessonsCount = completedLessonsRows.filter(
    (r) => r.total > 0 && r.completed >= r.total
  ).length;

  return {
    userProgress: progress,
    isPro: !!subscription?.isActive,
    top3Count: top3Rows.length,
    completedLessonsCount,
    followingUsers,
    followerUsers,
    followingIds: Array.from(followingIds),
    discoverUsers: allUsers.filter((u) => u.userId !== ADMIN_USER_ID).slice(0, 20),
  };
});

/**
 * Lay tong quan trang Luyen tap (/practice)
 */
export const getPracticeOverviewData = cache(async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const [progress, subscription, mistakesRows, courseData] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
    db.query.userMistakes.findMany({
      where: eq(userMistakes.userId, userId),
    }),
    getCourseUnitsData(),
  ]);

  if (!progress || !progress.activeCourse) return null;

  // Thu thap tu vung tu cac bai da mo khoa / da hoan thanh (fallback Unit 1 neu moi tao tai khoan)
  const unlockedLessons = courseData.units.flatMap((u) =>
    u.lessons.filter(
      (l) => l.completed || l.id === courseData.activeLessonId || u.order === 1
    )
  );

  const vocabItems: VocabItem[] = [];
  const seenEn = new Set<string>();
  for (const lesson of unlockedLessons) {
    if (Array.isArray(lesson.vocab)) {
      for (const v of lesson.vocab) {
        const key = v.en.trim().toLowerCase();
        if (!seenEn.has(key)) {
          seenEn.add(key);
          vocabItems.push(v);
        }
      }
    }
  }

  return {
    userProgress: progress,
    isPro: !!subscription?.isActive,
    mistakesCount: mistakesRows.length,
    vocabCount: vocabItems.length,
    vocabItems,
    unitsCount: courseData.units.length,
  };
});

/**
 * Tao phien Luyen tap (/lesson/practice?mode=...)
 * Modes: intensive | speak | listen | mistakes | vocab
 */
export const getPracticeSessionData = async (mode: string) => {
  const { userId } = await auth();
  if (!userId) return null;

  const [progress, subscription, courseData] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
    getCourseUnitsData(),
  ]);

  if (!progress || !progress.activeCourseId) return null;

  // 1. Che do On tap loi sai
  if (mode === "mistakes") {
    const mistakeRows = await db.query.userMistakes.findMany({
      where: eq(userMistakes.userId, userId),
      orderBy: [desc(userMistakes.createdAt)],
      limit: 12,
    });

    if (mistakeRows.length === 0) {
      return {
        mode,
        title: "Ôn tập lỗi sai",
        challenges: [],
        userProgress: progress,
        userSubscription: subscription,
      };
    }

    const challengeIds = mistakeRows.map((m) => m.challengeId);
    const mistakeChallenges = await db.query.challenges.findMany({
      where: inArray(challenges.id, challengeIds),
      with: { challengeOptions: true },
    });

    return {
      mode,
      title: "Ôn tập lỗi sai",
      challenges: mistakeChallenges.map((c) => ({ ...c, completed: false })),
      userProgress: progress,
      userSubscription: subscription,
    };
  }

  // Lay cac bai hoc da mo khoa (hoac Chuong 1 neu chua hoc)
  const targetLessonIds = courseData.units
    .flatMap((u) =>
      u.lessons.filter(
        (l) => l.completed || l.id === courseData.activeLessonId || u.order === 1
      )
    )
    .map((l) => l.id);

  const poolChallenges = targetLessonIds.length
    ? await db.query.challenges.findMany({
        where: inArray(challenges.lessonId, targetLessonIds),
        with: { challengeOptions: true },
      })
    : [];

  // 2. Che do Luyen noi (Speech)
  if (mode === "speak") {
    const speakCandidates: Array<{ text: string; meaning: string; speaker: SpeakerId }> = [];
    const seen = new Set<string>();

    // Lay cau tu cac bai hoc & vocab
    for (const c of poolChallenges) {
      if (c.type === "EXERCISE" && c.payload) {
        if (c.payload.kind === "listen-type" && c.payload.audio.length >= 4) {
          const key = c.payload.audio.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            speakCandidates.push({
              text: c.payload.audio,
              meaning: c.payload.meaning,
              speaker: c.payload.speaker,
            });
          }
        } else if (c.payload.kind === "build") {
          const key = c.payload.answer.toLowerCase();
          if (!seen.has(key)) {
            seen.add(key);
            speakCandidates.push({
              text: c.payload.answer,
              meaning: c.payload.promptVi,
              speaker: c.payload.speaker,
            });
          }
        }
      }
    }

    const picked = shuffleArray(speakCandidates).slice(0, 8);
    const speakChallenges = picked.map((item, idx) => ({
      id: -(idx + 1),
      lessonId: targetLessonIds[0] || 1,
      type: "EXERCISE" as const,
      question: "Đọc to câu này",
      order: idx + 1,
      completed: false,
      challengeOptions: [],
      payload: {
        kind: "speak" as const,
        text: item.text,
        meaning: item.meaning,
        speaker: item.speaker,
      } satisfies Exercise,
    }));

    return {
      mode,
      title: "Luyện nói",
      challenges: speakChallenges,
      userProgress: progress,
      userSubscription: subscription,
    };
  }

  // 3. Che do Luyen nghe (100% am thanh)
  if (mode === "listen") {
    const listenPool = poolChallenges.filter(
      (c) =>
        c.type === "EXERCISE" &&
        c.payload &&
        (c.payload.kind === "listen-type" ||
          (c.payload.kind === "choice" && Boolean(c.payload.audio || c.payload.prompt)))
    );

    const picked = shuffleArray(listenPool)
      .slice(0, 10)
      .map((c) => {
        if (c.type === "EXERCISE" && c.payload?.kind === "choice") {
          return {
            ...c,
            completed: false,
            payload: {
              ...c.payload,
              hideText: true,
              options: shuffleArray(c.payload.options),
            },
          };
        }
        return { ...c, completed: false };
      });

    return {
      mode,
      title: "Luyện nghe",
      challenges: picked,
      userProgress: progress,
      userSubscription: subscription,
    };
  }

  // 4. Che do Luyen tap Tu vung (vocab)
  if (mode === "vocab") {
    const unlockedLessons = courseData.units.flatMap((u) =>
      u.lessons.filter(
        (l) => l.completed || l.id === courseData.activeLessonId || u.order === 1
      )
    );
    const vocabList: VocabItem[] = [];
    const seen = new Set<string>();
    for (const l of unlockedLessons) {
      if (Array.isArray(l.vocab)) {
        for (const v of l.vocab) {
          if (!seen.has(v.en.toLowerCase())) {
            seen.add(v.en.toLowerCase());
            vocabList.push(v);
          }
        }
      }
    }

    const picked = shuffleArray(vocabList).slice(0, 10);
    const vocabChallenges = picked.map((item, idx) => {
      const distractors = shuffleArray(
        vocabList.filter((other) => other.vi !== item.vi)
      ).slice(0, 3);
      const options = shuffleArray([
        { text: item.vi, correct: true },
        ...distractors.map((d) => ({ text: d.vi, correct: false })),
      ]);

      return {
        id: -(100 + idx + 1),
        lessonId: targetLessonIds[0] || 1,
        type: "EXERCISE" as const,
        question: `Nghĩa của từ "${item.en}" là gì?`,
        order: idx + 1,
        completed: false,
        challengeOptions: [],
        payload: {
          kind: "choice" as const,
          title: "Chọn nghĩa đúng cho từ vựng",
          prompt: item.en,
          audio: item.en,
          speaker: "mascot" as SpeakerId,
          options,
          meaning: item.vi,
        } satisfies Exercise,
      };
    });

    return {
      mode,
      title: "Ôn tập Từ vựng",
      challenges: vocabChallenges,
      userProgress: progress,
      userSubscription: subscription,
    };
  }

  // 5. Mac dinh: Luyen tap chuyen sau (intensive)
  const hardPriority = shuffleArray(
    poolChallenges.filter(
      (c) =>
        c.type === "EXERCISE" &&
        c.payload &&
        ["fill-letters", "listen-type", "build", "type-missing"].includes(
          c.payload.kind
        )
    )
  );
  const restPool = shuffleArray(poolChallenges);
  const combined = Array.from(
    new Map([...hardPriority, ...restPool].map((c) => [c.id, c])).values()
  ).slice(0, 10);

  return {
    mode: "intensive",
    title: "Luyện tập chuyên sâu",
    challenges: combined.map((c) => ({ ...c, completed: false })),
    userProgress: progress,
    userSubscription: subscription,
  };
};
