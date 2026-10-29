import { create } from "zustand";

type UpgradeModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useUpgradeModal = create<UpgradeModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
