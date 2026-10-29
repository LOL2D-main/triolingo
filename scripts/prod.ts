import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";
import { DAILY_ENERGY } from "@/constants";
import { getVietnamDateString } from "@/lib/energy";

import { a1UnitsData } from "./a1-units-data";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("=================================================");
    console.log("SEEDING TRIOLINGO - FULL CURRICULUM (14 CHAPTERS)");
    console.log("A1 (Chương 1-2) | B1 (Chương 3-5) | B2 (Chương 6-8) | C1 (Chương 9-12) | C2 (Chương 13-14)");
    console.log("=================================================");

    // 1. Xoa du lieu noi dung cu de tao moi sach se (giu nguyen tai khoan va subscription nguoi dung)
    console.log("Cleaning old lesson content...");
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);

    // 2. Kiem tra hoac tao khoa hoc Tieng Anh
    let course = await db.query.courses.findFirst({
      where: eq(schema.courses.title, "Tiếng Anh"),
    });

    if (!course) {
      const [newCourse] = await db
        .insert(schema.courses)
        .values({
          title: "Tiếng Anh",
          imageSrc: "/en.svg",
        })
        .returning();
      course = newCourse;
    }

    console.log(`Using course: ${course.title} (ID: ${course.id})`);

    // 3. Nap 6 chuong A1
    let totalLessonsCount = 0;
    let totalChallengesCount = 0;

    for (const u of a1UnitsData) {
      const [unit] = await db
        .insert(schema.units)
        .values({
          courseId: course.id,
          title: u.title,
          description: u.description,
          order: u.order,
        })
        .returning();

      console.log(`\n[Unit ${unit.order}] ${unit.title} (${u.lessons.length} bài)`);

      for (const l of u.lessons) {
        totalLessonsCount++;
        const [lesson] = await db
          .insert(schema.lessons)
          .values({
            unitId: unit.id,
            title: l.title,
            order: l.order,
            vocab: l.vocab,
          })
          .returning();

        for (const c of l.challenges) {
          totalChallengesCount++;
          const [challenge] = await db
            .insert(schema.challenges)
            .values({
              lessonId: lesson.id,
              type: c.type,
              question: c.question,
              order: c.order,
              payload: c.payload,
            })
            .returning();

          if (c.options && c.options.length > 0) {
            const optionsToInsert = c.options.map((opt) => ({
              challengeId: challenge.id,
              text: opt.text,
              correct: opt.correct,
              imageSrc: opt.imageSrc || null,
              audioSrc: opt.audioSrc || null,
            }));

            await db.insert(schema.challengeOptions).values(optionsToInsert);
          }
        }
      }
    }

    // 4. Dong bo User Progress: Gan khoa hoc dang hoc la khoa Tieng Anh va cap day nang luong
    const today = getVietnamDateString();
    await db
      .update(schema.userProgress)
      .set({
        activeCourseId: course.id,
        energy: DAILY_ENERGY,
        energyDate: today,
      });

    console.log("\n=================================================");
    console.log(`SEEDING COMPLETED SUCCESSFULLY!`);
    console.log(`- Units created: ${a1UnitsData.length}`);
    console.log(`- Lessons created: ${totalLessonsCount} (mỗi chương 5 bài thường + 1 bài vương miện)`);
    console.log(`- Challenges created: ${totalChallengesCount} (đa dạng nghe, viết, điền từ, từ thật/giả DET)`);
    console.log(`- User progress updated with active course ID and ${DAILY_ENERGY} energy!`);
    console.log("=================================================");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

void main();
