"use server";

import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { appReviews } from "@/db/schema";

export type AppReviewItem = {
  id: number;
  authorName: string;
  rating: number;
  comment: string;
  platform: string;
  helpfulCount: number;
  createdAt: string;
};

export async function getAppReviews(): Promise<AppReviewItem[]> {
  try {
    const rows = await db
      .select()
      .from(appReviews)
      .orderBy(desc(appReviews.createdAt))
      .limit(50);

    return rows.map((r) => ({
      id: r.id,
      authorName: r.authorName,
      rating: r.rating,
      comment: r.comment,
      platform: r.platform,
      helpfulCount: r.helpfulCount,
      createdAt: r.createdAt
        ? new Date(r.createdAt).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "Hôm nay",
    }));
  } catch {
    return [];
  }
}

export async function submitAppReview(input: {
  authorName: string;
  rating: number;
  comment: string;
  platform?: string;
}) {
  const name = (input.authorName || "").trim().slice(0, 60);
  const comment = (input.comment || "").trim().slice(0, 600);
  const rating = Math.min(5, Math.max(1, Math.round(Number(input.rating) || 5)));
  const platform = ["Windows", "Android", "Apple"].includes(input.platform || "")
    ? (input.platform as string)
    : "Windows";

  if (!name) {
    return { error: "Vui lòng nhập tên của bạn." };
  }
  if (!comment || comment.length < 3) {
    return { error: "Vui lòng nhập nội dung đánh giá (tối thiểu 3 ký tự)." };
  }

  try {
    const [inserted] = await db
      .insert(appReviews)
      .values({
        authorName: name,
        rating,
        comment,
        platform,
        helpfulCount: 0,
      })
      .returning();

    revalidatePath("/download");
    revalidatePath("/download/windows");
    revalidatePath("/download/android");
    revalidatePath("/download/apple");

    return {
      success: true,
      review: {
        id: inserted.id,
        authorName: inserted.authorName,
        rating: inserted.rating,
        comment: inserted.comment,
        platform: inserted.platform,
        helpfulCount: inserted.helpfulCount,
        createdAt: new Date(inserted.createdAt).toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      },
    };
  } catch {
    return { error: "Không thể gửi đánh giá lúc này. Vui lòng thử lại." };
  }
}

export async function markReviewHelpful(reviewId: number) {
  try {
    await db
      .update(appReviews)
      .set({
        helpfulCount: sql`${appReviews.helpfulCount} + 1`,
      })
      .where(eq(appReviews.id, reviewId));

    revalidatePath("/download");
    return { success: true };
  } catch {
    return { error: "Failed" };
  }
}
