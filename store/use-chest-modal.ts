import { create } from "zustand";
import type { ChestTier } from "@/constants";

type OpenChestParams = {
  tier: ChestTier;
  rewardGems: number;
  questId?: 1;
  title?: string;
  description?: string;
};

type ChestModalState = {
  isOpen: boolean;
  tier: ChestTier;
  rewardGems: number;
  questId?: 1;
  title?: string;
  description?: string;
  open: (params: OpenChestParams) => void;
  close: () => void;
};

export const useChestModal = create<ChestModalState>((set) => ({
  isOpen: false,
  tier: "wood",
  rewardGems: 25,
  questId: undefined,
  title: undefined,
  description: undefined,
  open: ({ tier, rewardGems, questId, title, description }) =>
    set({ isOpen: true, tier, rewardGems, questId, title, description }),
  close: () =>
    set({
      isOpen: false,
      questId: undefined,
      title: undefined,
      description: undefined,
    }),
}));
