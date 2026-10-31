export const POINTS_TO_REFILL = 50;

export const MAX_HEARTS = 5;

/**
 * He thong nang luong
 * - Moi ngay (00:00 gio Viet Nam) hoi lai toi thieu DAILY_ENERGY.
 * - Moi cau tra loi (dung hoac sai) tru ENERGY_PER_ANSWER.
 * - Mot bai hoc co khoang LESSON_LENGTH (10) cau => DAILY_ENERGY / LESSON_LENGTH ~ 2 bai moi ngay.
 */
export const DAILY_ENERGY = 20;
export const MAX_ENERGY = 100;
export const ENERGY_PER_ANSWER = 1;
export const ENERGY_REFILL_AMOUNT = 20;

/**
 * He thong thuong nang luong:
 * - 1 lan tang trong bai: Muc 1 khi dat combo 5 cau dung lien tiep (+2 nang luong).
 * - Muc 2: xong bai hoc (+4 nang luong).
 */
export const COMBO_STAGES = [
  { id: 1, streak: 5, reward: 2, label: "Mức 1" },
] as const;

/** Muc 2: thuong khi hoan thanh bai hoc. */
export const LESSON_COMPLETE_BONUS = 4;

export const POINTS_PER_CORRECT = 10;

export type ChestTier = "wood" | "rare" | "legendary";

export type DailyQuestId = 1 | 2 | 3;

export type DailyQuestConfig = {
  id: DailyQuestId;
  title: string;
  target: number;
  chestTier: ChestTier;
  chestName: string;
  rewardGems: number;
  iconType: "lightning" | "target" | "accuracy";
};

const QUEST_POOL_SLOT_1: Array<{ title: string; target: number }> = [
  { title: "Hoàn thành 1 bài học tiếp theo", target: 1 },
  { title: "Hoàn thành 2 bài học trong hôm nay", target: 2 },
  { title: "Hoàn thành 3 bài học tiếp theo", target: 3 },
  { title: "Hoàn thành 4 bài học tiếp theo", target: 4 },
];

const QUEST_POOL_SLOT_2: Array<{ title: string; target: number }> = [
  { title: "Hoàn thành 9 câu hỏi nghe và bài tập", target: 9 },
  { title: "Trả lời đúng 10 câu hỏi bài tập", target: 10 },
  { title: "Chinh phục 12 câu hỏi nghe và từ vựng", target: 12 },
  { title: "Hoàn thành 15 câu hỏi bài tập bất kỳ", target: 15 },
];

const QUEST_POOL_SLOT_3: Array<{ title: string; target: number }> = [
  { title: "Đạt độ chính xác 90% trở lên trong 2 bài học", target: 2 },
  { title: "Đạt độ chính xác 90% trở lên trong 3 bài học", target: 3 },
  { title: "Đạt độ chính xác 90% trở lên trong 4 bài học", target: 4 },
  { title: "Đạt độ chính xác 90% trở lên trong 6 bài học", target: 6 },
];

/**
 * Lay danh sach 3 nhiem vu hang ngay xoay vong tu dong sau moi 24h (theo ngay Viet Nam YYYY-MM-DD)
 */
export function getDailyQuestsForToday(vnDateStr?: string): DailyQuestConfig[] {
  const dateStr =
    vnDateStr ||
    new Date(Date.now() + 7 * 3600 * 1000).toISOString().slice(0, 10);

  const [y, m, d] = dateStr.split("-").map(Number);
  const utcDays = Math.floor(
    Date.UTC(y || 2026, (m || 1) - 1, d || 1) / 86_400_000
  );
  const idx = Math.abs(utcDays) % 4;

  const q1 = QUEST_POOL_SLOT_1[idx];
  const q2 = QUEST_POOL_SLOT_2[idx];
  const q3 = QUEST_POOL_SLOT_3[idx];

  return [
    {
      id: 1,
      title: q1.title,
      target: q1.target,
      chestTier: "wood",
      chestName: "Rương Đồng",
      rewardGems: 25,
      iconType: "lightning",
    },
    {
      id: 2,
      title: q2.title,
      target: q2.target,
      chestTier: "rare",
      chestName: "Rương Hiếm",
      rewardGems: 60,
      iconType: "target",
    },
    {
      id: 3,
      title: q3.title,
      target: q3.target,
      chestTier: "legendary",
      chestName: "Rương Mega",
      rewardGems: 125,
      iconType: "accuracy",
    },
  ];
}

export const DAILY_QUESTS: DailyQuestConfig[] = getDailyQuestsForToday();
