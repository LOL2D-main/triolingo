import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  unique,
} from "drizzle-orm/pg-core";

import { DAILY_ENERGY, MAX_HEARTS } from "@/constants";
import type { Exercise, VocabItem } from "@/lib/exercise-types";

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // Unit 1
  description: text("description").notNull(), // Learn the basics of spanish
  courseId: integer("course_id")
    .references(() => courses.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  unitId: integer("unit_id")
    .references(() => units.id, {
      onDelete: "cascade",
    })
    .notNull(),
  order: integer("order").notNull(),
  /** Danh sach tu moi hoc truoc khi luyen tap */
  vocab: jsonb("vocab").$type<VocabItem[]>(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
  legendaryLessons: many(legendaryLessons),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST", "EXERCISE"]);

export const challenges = pgTable("challenges", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id")
    .references(() => lessons.id, {
      onDelete: "cascade",
    })
    .notNull(),
  type: challengesEnum("type").notNull(),
  question: text("question").notNull(),
  order: integer("order").notNull(),
  /** Du lieu bai tap day du cho type = EXERCISE */
  payload: jsonb("payload").$type<Exercise>(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
  id: serial("id").primaryKey(),
  challengeId: integer("challenge_id")
    .references(() => challenges.id, {
      onDelete: "cascade",
    })
    .notNull(),
  text: text("text").notNull(),
  correct: boolean("correct").notNull(),
  imageSrc: text("image_src"),
  audioSrc: text("audio_src"),
});

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  })
);

export const challengeProgress = pgTable(
  "challenge_progress",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id")
      .references(() => challenges.id, {
        onDelete: "cascade",
      })
      .notNull(),
    completed: boolean("completed").notNull().default(false),
  },
  (t) => [unique().on(t.userId, t.challengeId)]
);

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  })
);

export const userProgress = pgTable("user_progress", {
  userId: text("user_id").primaryKey(),
  userName: text("user_name").notNull().default("User"),
  userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
  activeCourseId: integer("active_course_id").references(() => courses.id, {
    onDelete: "cascade",
  }),
  hearts: integer("hearts").notNull().default(MAX_HEARTS),
  points: integer("points").notNull().default(0),
  gems: integer("gems").notNull().default(100),
  energy: integer("energy").notNull().default(DAILY_ENERGY),
  /** Ngay (YYYY-MM-DD, gio Viet Nam) lan hoi nang luong gan nhat */
  energyDate: text("energy_date").notNull().default(""),
  /** Tien do nhiem vu hang ngay */
  questLessonsCompleted: integer("quest_lessons_completed").notNull().default(0),
  questListeningCompleted: integer("quest_listening_completed").notNull().default(0),
  questHighAccuracyCompleted: integer("quest_high_accuracy_completed").notNull().default(0),
  questChest1Claimed: boolean("quest_chest_1_claimed").notNull().default(false),
  questChest2Claimed: boolean("quest_chest_2_claimed").notNull().default(false),
  questChest3Claimed: boolean("quest_chest_3_claimed").notNull().default(false),
  /** Chuoi ngay hoc (Streak) & Qua moi ngay */
  streakCount: integer("streak_count").notNull().default(0),
  lastStreakDate: text("last_streak_date").notNull().default(""),
  dailyFreeChestDate: text("daily_free_chest_date").notNull().default(""),
  claimedStreakMilestones: text("claimed_streak_milestones").notNull().default(""),
  /** Chu ky tuan (7D) cua bang xep hang KN */
  pointsWeek: text("points_week").notNull().default(""),
  /** Quan ly tai khoan (admin) */
  userEmail: text("user_email").default(""),
  isBanned: boolean("is_banned").notNull().default(false),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));

export const userSubscription = pgTable("user_subscription", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  stripeCustomerId: text("stripe_customer_id").notNull().unique(),
  stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
  stripePriceId: text("stripe_price_id").notNull(),
  stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});

export const legendaryLessons = pgTable(
  "legendary_lessons",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    lessonId: integer("lesson_id")
      .references(() => lessons.id, {
        onDelete: "cascade",
      })
      .notNull(),
    completed: boolean("completed").notNull().default(true),
  },
  (t) => [unique().on(t.userId, t.lessonId)]
);

export const legendaryLessonsRelations = relations(
  legendaryLessons,
  ({ one }) => ({
    lesson: one(lessons, {
      fields: [legendaryLessons.lessonId],
      references: [lessons.id],
    }),
  })
);

/** Key kich hoat goi Ultra - moi key chi dung duoc 1 lan */
export const ultraKeys = pgTable("ultra_keys", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  usedBy: text("used_by"),
  usedByEmail: text("used_by_email"),
  usedAt: timestamp("used_at"),
});

/** Key dung chung / lop hoc (khong gioi han so nguoi, moi acc dung 1 lan, den khi Admin xoa moi het han) */
export const campaignKeys = pgTable("campaign_keys", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  description: text("description").default(""),
  durationDays: integer("duration_days").notNull().default(7),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

/** Lich su nhan key chien dich/lop hoc - moi user chi dung duoc 1 lan */
export const campaignKeyRedemptions = pgTable(
  "campaign_key_redemptions",
  {
    id: serial("id").primaryKey(),
    code: text("code").notNull(),
    userId: text("user_id").notNull(),
    userEmail: text("user_email").default(""),
    redeemedAt: timestamp("redeemed_at").notNull().defaultNow(),
  },
  (t) => [unique().on(t.code, t.userId)]
);

