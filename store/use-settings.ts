import { create } from "zustand";
import { persist } from "zustand/middleware";

export type SettingsState = {
  soundEffects: boolean;
  volume: number;
  vibration: boolean;
  autoplayAudio: boolean;
  dailyReminder: boolean;
  animations: boolean;
  setSoundEffects: (enabled: boolean) => void;
  setVolume: (volume: number) => void;
  setVibration: (enabled: boolean) => void;
  setAutoplayAudio: (enabled: boolean) => void;
  setDailyReminder: (enabled: boolean) => void;
  setAnimations: (enabled: boolean) => void;
  resetSettings: () => void;
  playSound: (src: string) => void;
  triggerVibrate: (pattern?: number | number[]) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set, get) => ({
      soundEffects: true,
      volume: 80,
      vibration: true,
      autoplayAudio: true,
      dailyReminder: true,
      animations: true,

      setSoundEffects: (soundEffects) => set({ soundEffects }),
      setVolume: (volume) => set({ volume }),
      setVibration: (vibration) => set({ vibration }),
      setAutoplayAudio: (autoplayAudio) => set({ autoplayAudio }),
      setDailyReminder: (dailyReminder) => set({ dailyReminder }),
      setAnimations: (animations) => set({ animations }),

      resetSettings: () =>
        set({
          soundEffects: true,
          volume: 80,
          vibration: true,
          autoplayAudio: true,
          dailyReminder: true,
          animations: true,
        }),

      playSound: (src: string) => {
        const { soundEffects, volume } = get();
        if (!soundEffects || typeof window === "undefined") return;

        try {
          const audio = new Audio(src);
          audio.volume = Math.max(0, Math.min(1, volume / 100));
          void audio.play().catch(() => {
            // Browser autoplay policy might block unprompted audio
          });
        } catch (e) {
          console.warn("Could not play audio:", e);
        }
      },

      triggerVibrate: (pattern = 50) => {
        const { vibration } = get();
        if (!vibration || typeof window === "undefined") return;

        try {
          if ("vibrate" in navigator && typeof navigator.vibrate === "function") {
            navigator.vibrate(pattern);
          }
        } catch {
          // Vibration not supported or allowed
        }
      },
    }),
    {
      name: "triolingo-user-settings",
    }
  )
);
