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

export type DailyQuestConfig = {
  id: 1;
  title: string;
  target: number;
  chestTier: ChestTier;
  chestName: string;
  rewardGems: number;
};

/** Nhiem vu hang ngay: chi con 1 nhiem vu nhan Ruong Dong. */
export const DAILY_QUESTS: DailyQuestConfig[] = [
  {
    id: 1,
    title: "Hoàn thành 1 bài học tiếp theo",
    target: 1,
    chestTier: "wood",
    chestName: "Rương Đồng",
    rewardGems: 25,
  },
];

