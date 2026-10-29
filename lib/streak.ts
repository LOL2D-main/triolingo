/**
 * He thong Chuoi ngay hoc (Streak) va Cac moc thuong
 */

export type FlameTier = "unlit" | "red" | "blue" | "purple" | "ultra_purple";

export type StreakMilestone = {
  days: number;
  rewardGems: number;
  label: string;
};

export const STREAK_MILESTONES: StreakMilestone[] = [
  { days: 7, rewardGems: 50, label: "Mốc 7 ngày" },
  { days: 14, rewardGems: 100, label: "Mốc 14 ngày" },
  { days: 28, rewardGems: 200, label: "Mốc 28 ngày" },
  { days: 50, rewardGems: 350, label: "Mốc 50 ngày" },
  { days: 100, rewardGems: 700, label: "Mốc 100 ngày" },
  { days: 200, rewardGems: 1500, label: "Mốc 200 ngày" },
  { days: 300, rewardGems: 2500, label: "Mốc 300 ngày" },
  { days: 500, rewardGems: 5000, label: "Mốc 500 ngày" },
];

/** Lay ngay hien tai theo gio Viet Nam (GMT+7) dinh dang YYYY-MM-DD */
export function getVietnamToday(): string {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const vnDate = new Date(utc + 7 * 3600000);
  return vnDate.toISOString().slice(0, 10);
}

/** Lay ngay hom qua theo gio Viet Nam (GMT+7) dinh dang YYYY-MM-DD */
export function getVietnamYesterday(): string {
  const d = new Date();
  const utc = d.getTime() + d.getTimezoneOffset() * 60000;
  const vnYesterday = new Date(utc + 7 * 3600000 - 86400000);
  return vnYesterday.toISOString().slice(0, 10);
}

/** Kiem tra xem chuoi da duoc thap sang trong ngay hom nay chua */
export function isStreakLitToday(lastStreakDate: string | null | undefined): boolean {
  if (!lastStreakDate) return false;
  return lastStreakDate === getVietnamToday();
}

/**
 * Xac dinh cap do lua (Visual Tier)
 * - Chua thap: Lua xam
 * - < 30 ngay: Lua do / cam do
 * - 30 - 99 ngay: Lua xanh duong
 * - 100 - 199 ngay: Lua tim
 * - >= 200 ngay: Lua tim huyen ao ruc ro
 */
export function getFlameTier(streakCount: number, isLit: boolean): FlameTier {
  if (!isLit || streakCount <= 0) return "unlit";
  if (streakCount < 30) return "red";
  if (streakCount < 100) return "blue";
  if (streakCount < 200) return "purple";
  return "ultra_purple";
}

export function getFlameTierDetails(tier: FlameTier) {
  switch (tier) {
    case "unlit":
      return {
        tier,
        name: "Lửa xám (Chưa thắp)",
        textColor: "text-slate-400",
        borderColor: "border-slate-300",
        bgLight: "bg-slate-100",
        description: "Chưa học bài hôm nay. Hoàn thành 1 bài để thắp lửa và giữ chuỗi!",
      };
    case "red":
      return {
        tier,
        name: "Lửa đỏ",
        textColor: "text-orange-500",
        borderColor: "border-orange-300",
        bgLight: "bg-orange-50",
        description: "Chuỗi khởi đầu rực cháy! Học đều đặn mỗi ngày để mở khóa ngọn lửa xanh.",
      };
    case "blue":
      return {
        tier,
        name: "Lửa xanh dương",
        textColor: "text-sky-500",
        borderColor: "border-sky-300",
        bgLight: "bg-sky-50",
        description: "Chuỗi 30+ ngày kiên trì! Ngọn lửa xanh rực sáng của thói quen bền bỉ.",
      };
    case "purple":
      return {
        tier,
        name: "Lửa tím",
        textColor: "text-purple-600",
        borderColor: "border-purple-300",
        bgLight: "bg-purple-50",
        description: "Chuỗi 100+ ngày phi thường! Ngọn lửa tím huyền bí của bậc thầy.",
      };
    case "ultra_purple":
      return {
        tier,
        name: "Lửa tím huyền ảo",
        textColor: "text-fuchsia-500",
        borderColor: "border-fuchsia-300",
        bgLight: "bg-fuchsia-50",
        description: "Chuỗi 200+ ngày huyền thoại! Ngọn lửa tím tỏa sáng rực rỡ đỉnh cao.",
      };
  }
}
