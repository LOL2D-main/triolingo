"use server";

import { and, eq, isNull } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import db from "@/db/drizzle";
import { getUserSubscription } from "@/db/queries";
import {
  campaignKeys,
  campaignKeyRedemptions,
  ultraKeys,
  userSubscription,
} from "@/db/schema";
import { auth, currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const returnUrl = absoluteUrl("/shop");

export const createStripeUrl = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized.");

  const subscription = await getUserSubscription();

  // redirect user to customer portal who already have a subscription
  if (subscription && subscription.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: returnUrl,
    });

    return { data: stripeSession.url };
  }

  // checkout
  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "USD",
          product_data: {
            name: "TrioLingo Ultra",
            description: "Năng lượng vô hạn không giới hạn bài học.",
          },
          unit_amount: 2000,
          recurring: {
            interval: "month",
          },
        },
      },
    ],
    metadata: {
      userId,
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

  return { data: stripeSession.url };
};

export const activateUltraKey = async (rawKey: string) => {
  const { userId } = await auth();
  const user = await currentUser();
  if (!userId) throw new Error("Unauthorized.");

  const code = (rawKey ?? "").trim().toUpperCase();
  if (!code) {
    return { success: false, error: "Vui lòng nhập mã key." };
  }

  // 1. KIỂM TRA KEY DÙNG CHUNG / LỚP HỌC (Không giới hạn số acc, mỗi acc dùng 1 lần, chỉ hết hạn khi Admin Xóa key)
  const campaignKey = await db
    .select()
    .from(campaignKeys)
    .where(eq(campaignKeys.code, code))
    .limit(1);

  if (campaignKey.length > 0) {
    const keyData = campaignKey[0];

    // Kiểm tra xem tài khoản này đã từng nhập mã key này chưa
    const alreadyRedeemed = await db
      .select({ id: campaignKeyRedemptions.id })
      .from(campaignKeyRedemptions)
      .where(
        and(
          eq(campaignKeyRedemptions.code, keyData.code),
          eq(campaignKeyRedemptions.userId, userId)
        )
      )
      .limit(1);

    if (alreadyRedeemed.length > 0) {
      return {
        success: false,
        error: "Key đã được sử dụng (mỗi tài khoản chỉ được nhập 1 lần).",
      };
    }

    try {
      await db.insert(campaignKeyRedemptions).values({
        code: keyData.code,
        userId,
        userEmail: user?.email ?? "",
      });
    } catch {
      return {
        success: false,
        error: "Key đã được sử dụng (mỗi tài khoản chỉ được nhập 1 lần).",
      };
    }

    const durationDays = keyData.durationDays || 7;
    const durationMs = durationDays * 86_400_000;
    const currentSubscription = await getUserSubscription();

    const base =
      currentSubscription?.stripeCurrentPeriodEnd &&
      currentSubscription.stripeCurrentPeriodEnd.getTime() > Date.now()
        ? currentSubscription.stripeCurrentPeriodEnd.getTime()
        : Date.now();

    const periodEnd = new Date(base + durationMs);

    if (currentSubscription) {
      await db
        .update(userSubscription)
        .set({
          stripePriceId: `ultra_key_${keyData.code.toLowerCase()}`,
          stripeCurrentPeriodEnd: periodEnd,
        })
        .where(eq(userSubscription.userId, userId));
    } else {
      await db.insert(userSubscription).values({
        userId,
        stripeCustomerId: `campaign_${keyData.code.toLowerCase()}_${userId}`,
        stripeSubscriptionId: `sub_${keyData.code.toLowerCase()}_${Date.now()}`,
        stripePriceId: `ultra_key_${keyData.code.toLowerCase()}`,
        stripeCurrentPeriodEnd: periodEnd,
      });
    }

    revalidatePath("/shop");
    revalidatePath("/learn");
    revalidatePath("/courses");
    revalidatePath("/leaderboard");
    revalidatePath("/admin");

    return {
      success: true,
      message: `Kích hoạt thành công ${durationDays} ngày Trio Ultra từ mã ${keyData.code}!`,
    };
  }

  // CÁC MÃ KEY ĐƠN (1 LẦN DUY NHẤT TRÊN TOÀN HỆ THỐNG)
  const currentSubscription = await getUserSubscription();
  if (currentSubscription?.isActive) {
    return { success: false, error: "Tài khoản của bạn đã có gói Ultra." };
  }

  const found = await db
    .select()
    .from(ultraKeys)
    .where(eq(ultraKeys.code, code))
    .limit(1);

  if (found.length === 0) {
    return {
      success: false,
      error: "Key không hợp lệ. Vui lòng liên hệ Zalo 0904299087 để nhận key.",
    };
  }

  if (found[0].usedBy) {
    return { success: false, error: "Key đã được sử dụng" };
  }

  // Đánh dấu đã dùng bằng lệnh điều kiện nguyên tử
  const claimed = await db
    .update(ultraKeys)
    .set({
      usedBy: userId,
      usedByEmail: user?.email ?? "",
      usedAt: new Date(),
    })
    .where(and(eq(ultraKeys.id, found[0].id), isNull(ultraKeys.usedBy)))
    .returning({ id: ultraKeys.id });

  if (claimed.length === 0) {
    return { success: false, error: "Key đã được sử dụng" };
  }

  const oneHundredYears = new Date(Date.now() + 100 * 365 * 86_400_000);

  const existingSubscription = await db.query.userSubscription.findFirst({
    where: eq(userSubscription.userId, userId),
  });

  if (existingSubscription) {
    await db
      .update(userSubscription)
      .set({
        stripePriceId: "ultra_key_activated",
        stripeCurrentPeriodEnd: oneHundredYears,
      })
      .where(eq(userSubscription.userId, userId));
  } else {
    await db.insert(userSubscription).values({
      userId,
      stripeCustomerId: `key_cust_${userId}`,
      stripeSubscriptionId: `key_sub_${Date.now()}`,
      stripePriceId: "ultra_key_activated",
      stripeCurrentPeriodEnd: oneHundredYears,
    });
  }

  revalidatePath("/shop");
  revalidatePath("/learn");
  revalidatePath("/courses");
  revalidatePath("/leaderboard");
  revalidatePath("/admin");

  return {
    success: true,
    message: "Kích hoạt gói Ultra thành công! Bạn hiện có năng lượng vô hạn.",
  };
};
