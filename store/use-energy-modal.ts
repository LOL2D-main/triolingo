import { create } from "zustand";

type EnergyModalState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useEnergyModal = create<EnergyModalState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
