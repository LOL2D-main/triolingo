"use client";

import type { SpeakerId } from "./exercise-types";

type SpeakOptions = {
  speaker?: SpeakerId;
  slow?: boolean;
  rate?: number;
};

/**
 * Chi phat giong doc Neural tu server (/api/tts).
 * Khong con fallback sang Web Speech (giong Google cua trinh duyet)
 * de tranh bi chen giong va lech giong nhan vat.
 */
class SpeechService {
  private currentAudio: HTMLAudioElement | null = null;
  private token = 0;

  public stop() {
    this.token += 1;
    if (this.currentAudio) {
      const audio = this.currentAudio;
      this.currentAudio = null;
      try {
        audio.onended = null;
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      } catch {
        // ignore
      }
    }
  }

  public speak(text: string, options?: SpeakOptions) {
    if (typeof window === "undefined" || !text.trim()) return;

    this.stop();
    const myToken = this.token;

    const speaker = options?.speaker || "mascot";
    const slow = Boolean(options?.slow || (options?.rate && options.rate < 0.85));
    const url = `/api/tts?text=${encodeURIComponent(text.trim())}&speaker=${speaker}&slow=${slow ? "true" : "false"}`;

    const audio = new Audio(url);
    audio.preload = "auto";
    this.currentAudio = audio;

    audio.play().catch(() => {
      // Bi huy do cau tiep theo, hoac trinh duyet chan tu phat: bo qua im lang.
      if (this.token === myToken) this.currentAudio = null;
    });
  }
}

export const speechService = new SpeechService();

export const speakEnglish = (
  text: string,
  optionsOrRate?: SpeakOptions | number,
  legacySpeaker?: SpeakerId
) => {
  if (typeof optionsOrRate === "number") {
    speechService.speak(text, {
      rate: optionsOrRate,
      speaker: legacySpeaker || "mascot",
    });
  } else {
    speechService.speak(text, optionsOrRate);
  }
};

export const stopSpeaking = () => speechService.stop();
