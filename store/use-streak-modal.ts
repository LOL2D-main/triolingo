import { create } from "zustand";

type StreakModalState = {
  isOpen: boolean;
  streakCount: number;
  lastStreakDate: string;
  claimedMilestones: number[];
  open: (data?: {
    streakCount?: number;
    lastStreakDate?: string;
    claimedMilestones?: number[];
  }) => void;
  close: () => void;
};

export const useStreakModal = create<StreakModalState>((set) => ({
  isOpen: false,
  streakCount: 0,
  lastStreakDate: "",
  claimedMilestones: [],
  open: (data) =>
    set({
      isOpen: true,
      streakCount: data?.streakCount ?? 0,
      lastStreakDate: data?.lastStreakDate ?? "",
      claimedMilestones: data?.claimedMilestones ?? [],
    }),
  close: () => set({ isOpen: false }),
}));
