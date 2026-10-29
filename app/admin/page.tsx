import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";

import db from "@/db/drizzle";
import {
  campaignKeyRedemptions,
  campaignKeys,
  challenges,
  courses,
  lessons,
  ultraKeys,
  units,
  userProgress,
  userSubscription,
} from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

import {
  AdminDashboard,
  type AdminCampaignKeyRow,
  type AdminCampaignRedemptionRow,
  type AdminKeyRow,
  type AdminUserRow,
} from "./admin-dashboard";

const DAY_IN_MS = 86_400_000;

const AdminPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) redirect("/");

  const [
    allUsers,
    allSubscriptions,
    allKeys,
    allCampaignKeys,
    allCampaignRedemptions,
    allCourses,
    allUnits,
    allLessons,
    allChallenges,
  ] = await Promise.all([
    db.select().from(userProgress).orderBy(desc(userProgress.points)),
    db.select().from(userSubscription),
    db.select().from(ultraKeys).orderBy(desc(ultraKeys.id)),
    db.select().from(campaignKeys).orderBy(desc(campaignKeys.id)),
    db
      .select()
      .from(campaignKeyRedemptions)
      .orderBy(desc(campaignKeyRedemptions.redeemedAt)),
    db.select({ id: courses.id }).from(courses),
    db.select({ id: units.id }).from(units),
    db.select({ id: lessons.id }).from(lessons),
    db.select({ id: challenges.id }).from(challenges),
  ]);

  const subByUser = new Map(allSubscriptions.map((s) => [s.userId, s]));
  const keyByUser = new Map<string, string>();
  for (const k of allKeys) {
    if (k.usedBy && !keyByUser.has(k.usedBy)) {
      keyByUser.set(k.usedBy, k.code);
    }
  }

  for (const r of allCampaignRedemptions) {
    if (!keyByUser.has(r.userId)) {
      keyByUser.set(r.userId, r.code);
    }
  }

  const users: AdminUserRow[] = allUsers.map((u) => {
    const sub = subByUser.get(u.userId);
    const isActiveSub =
      !!sub?.stripePriceId &&
      !!sub?.stripeCurrentPeriodEnd &&
      sub.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

    return {
      userId: u.userId,
      userName: u.userName,
      userEmail: u.userEmail ?? null,
      userImageSrc: u.userImageSrc,
      points: u.points,
      gems: u.gems ?? 100,
      isBanned: !!u.isBanned,
      isUltra: isActiveSub,
      subscriptionType: sub?.stripePriceId ?? null,
      periodEnd: sub?.stripeCurrentPeriodEnd
        ? sub.stripeCurrentPeriodEnd.toISOString()
        : null,
      usedKeyCode: keyByUser.get(u.userId) ?? null,
    };
  });

  const keys: AdminKeyRow[] = allKeys.map((k) => ({
    id: k.id,
    code: k.code,
    createdAt: k.createdAt.toISOString(),
    usedBy: k.usedBy ?? null,
    usedByEmail: k.usedByEmail ?? null,
    usedAt: k.usedAt ? k.usedAt.toISOString() : null,
  }));

  const campaignKeysList: AdminCampaignKeyRow[] = allCampaignKeys.map((ck) => ({
    id: ck.id,
    code: ck.code,
    description: ck.description ?? null,
    durationDays: ck.durationDays,
    createdAt: ck.createdAt.toISOString(),
  }));

  const campaignRedemptions: AdminCampaignRedemptionRow[] =
    allCampaignRedemptions.map((r) => ({
      id: r.id,
      code: r.code,
      userId: r.userId,
      userEmail: r.userEmail ?? null,
      redeemedAt: r.redeemedAt.toISOString(),
    }));

  return (
    <AdminDashboard
      users={users}
      keys={keys}
      campaignKeys={campaignKeysList}
      campaignRedemptions={campaignRedemptions}
      stats={{
        coursesCount: allCourses.length,
        unitsCount: allUnits.length,
        lessonsCount: allLessons.length,
        challengesCount: allChallenges.length,
      }}
    />
  );
};

export default AdminPage;
