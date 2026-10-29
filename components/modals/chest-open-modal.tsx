"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { toast } from "sonner";

import { claimQuestChest } from "@/actions/user-progress";
import {
  ChestArtwork,
  GemRewardPileGraphic,
} from "@/components/chest-graphics";
import { useChestModal } from "@/store/use-chest-modal";
import { useSettings } from "@/store/use-settings";

type AnimationPhase = "idle" | "shaking" | "cracking" | "exploding" | "reward";

const THEMES = {
  wood: {
    bg: "bg-[#131F24]",
    title: "RƯƠNG ĐỒNG",
    titleColor: "text-[#E5A93C]",
    rays:
      "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.28) 18deg, transparent 36deg, rgba(255,255,255,0.22) 60deg, transparent 80deg, rgba(255,255,255,0.28) 108deg, transparent 130deg, rgba(255,255,255,0.22) 160deg, transparent 180deg, rgba(255,255,255,0.28) 210deg, transparent 235deg, rgba(255,255,255,0.24) 265deg, transparent 290deg, rgba(255,255,255,0.26) 325deg, transparent 360deg)",
    core: "radial-gradient(circle, rgba(255,255,255,0.82) 0%, rgba(241,245,249,0.45) 42%, rgba(255,255,255,0) 72%)",
    flash: "rgba(255, 255, 255, 0.88)",
  },
  rare: {
    bg: "bg-[#0088FF]",
    title: "HÀNG HIẾM",
    titleColor: "text-white",
    rays:
      "conic-gradient(from 0deg, transparent 0deg, rgba(125,211,252,0.85) 16deg, transparent 34deg, rgba(56,189,248,0.75) 54deg, transparent 74deg, rgba(224,242,254,0.9) 96deg, transparent 118deg, rgba(56,189,248,0.8) 144deg, transparent 168deg, rgba(125,211,252,0.85) 195deg, transparent 218deg, rgba(224,242,254,0.85) 244deg, transparent 268deg, rgba(56,189,248,0.8) 296deg, transparent 322deg, rgba(125,211,252,0.9) 344deg, transparent 360deg)",
    core: "radial-gradient(circle, #FFFFFF 0%, #7DD3FC 35%, rgba(0,229,255,0.75) 62%, rgba(0,136,255,0) 82%)",
    flash: "radial-gradient(circle, #FFFFFF 20%, #38BDF8 80%, #0284C7 100%)",
  },
  legendary: {
    bg: "bg-[#FF9600]",
    title: "MEGA",
    titleColor: "text-white",
    rays:
      "conic-gradient(from 0deg, transparent 0deg, rgba(255,253,231,0.98) 14deg, rgba(255,215,0,0.6) 24deg, transparent 36deg, rgba(255,238,88,0.95) 52deg, transparent 68deg, rgba(255,255,255,1) 86deg, rgba(255,215,0,0.7) 98deg, transparent 112deg, rgba(255,241,118,0.95) 132deg, transparent 150deg, rgba(255,253,231,0.98) 170deg, transparent 190deg, rgba(255,215,0,0.95) 210deg, transparent 228deg, rgba(255,255,255,1) 248deg, transparent 268deg, rgba(255,238,88,0.95) 290deg, transparent 310deg, rgba(255,253,231,1) 334deg, transparent 360deg)",
    core: "radial-gradient(circle, #FFFFFF 0%, #FFF59D 32%, #FFD700 60%, rgba(255,150,0,0) 85%)",
    flash: "radial-gradient(circle, #FFFFFF 35%, #FFF176 75%, #FFB300 100%)",
  },
} as const;

export const ChestOpenModal = () => {
  const { isOpen, tier, rewardGems, questId, title, description, close } = useChestModal();
  const { playSound, triggerVibrate, animations } = useSettings();
  const { width, height } = useWindowSize();
  const router = useRouter();

  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [displayedGems, setDisplayedGems] = useState(0);
  const [isClaiming, setIsClaiming] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPhase("idle");
      setDisplayedGems(0);
      setIsClaiming(false);
    }
  }, [isOpen, tier]);

  // Dem so da quy tang dan o man hinh nhan thuong
  useEffect(() => {
    if (phase !== "reward") return;
    let current = 0;
    const step = Math.max(1, Math.ceil(rewardGems / 28));
    const timer = setInterval(() => {
      current += step;
      if (current >= rewardGems) {
        setDisplayedGems(rewardGems);
        clearInterval(timer);
      } else {
        setDisplayedGems(current);
      }
    }, 24);

    return () => clearInterval(timer);
  }, [phase, rewardGems]);

  if (!isOpen) return null;

  const theme = THEMES[tier];

  const handleTapChest = async () => {
    if (phase !== "idle" || isClaiming) return;

    if (questId) {
      setIsClaiming(true);
      try {
        const res = await claimQuestChest(questId);
        if (!res.success) {
          toast.error(res.error || "Không thể mở rương lúc này.");
          setIsClaiming(false);
          return;
        }
      } catch {
        toast.error("Có lỗi kết nối khi nhận thưởng rương.");
        setIsClaiming(false);
        return;
      }
      setIsClaiming(false);
    }

    // 1. Lac rương
    setPhase("shaking");
    triggerVibrate([60, 40, 80, 40, 100]);
    playSound("/correct.wav");

    // 2. He mieng rương, anh sang loe ra
    setTimeout(() => {
      setPhase("cracking");
      triggerVibrate([80, 30, 140]);
    }, 900);

    // 3. Bung nap, no anh sang
    setTimeout(() => {
      setPhase("exploding");
      playSound("/finish.mp3");
      triggerVibrate([180, 50, 220]);
    }, 2050);

    // 4. Man hinh nhan da quy
    setTimeout(() => setPhase("reward"), 2550);
  };

  const onContinue = () => {
    close();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none">
      <style jsx global>{`
        @keyframes chestShake {
          0% { transform: translate(0, 0) rotate(0deg); }
          12% { transform: translate(-12px, 4px) rotate(-7deg); }
          25% { transform: translate(12px, -4px) rotate(7deg); }
          37% { transform: translate(-15px, 2px) rotate(-9deg); }
          50% { transform: translate(15px, -3px) rotate(9deg); }
          62% { transform: translate(-16px, 3px) rotate(-10deg); }
          75% { transform: translate(16px, -2px) rotate(10deg); }
          88% { transform: translate(-8px, 2px) rotate(-5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        @keyframes chestTremble {
          0%, 100% { transform: translate(-3px, 0) rotate(-1.5deg) scale(1.06); }
          50% { transform: translate(3px, 0) rotate(1.5deg) scale(1.09); }
        }
        @keyframes chestExplode {
          0% { transform: scale(1.08); opacity: 1; }
          40% { transform: scale(1.42); opacity: 1; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes spinRays {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rewardIn {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>

      {phase === "reward" ? (
        <div className="relative flex h-full w-full flex-col items-center justify-between bg-white px-6 py-12">
          {animations && (
            <Confetti
              recycle={false}
              numberOfPieces={tier === "legendary" ? 450 : tier === "rare" ? 280 : 160}
              tweenDuration={6000}
              width={width}
              height={height}
            />
          )}

          <h1
            className="mt-4 text-4xl font-black tracking-tight text-[#1CB0F6] sm:text-5xl"
            style={{ animation: "rewardIn 0.4s ease-out forwards" }}
          >
            +{displayedGems} đá quý
          </h1>

          <div
            className="flex max-w-md flex-col items-center text-center"
            style={{ animation: "rewardIn 0.5s ease-out forwards" }}
          >
            <GemRewardPileGraphic className="h-64 w-72 sm:h-72 sm:w-80" />
            <p className="mt-6 text-xl font-extrabold leading-snug text-[#3C3C3C] sm:text-2xl">
              {description || "Bạn nhận được phần thưởng từ nhiệm vụ hằng ngày!"}
            </p>
          </div>

          <div className="w-full max-w-md">
            <button
              type="button"
              onClick={onContinue}
              className="w-full rounded-2xl bg-[#1CB0F6] py-4 text-lg font-black uppercase tracking-wider text-white shadow-[0_5px_0_#1899D6] hover:bg-[#14A4E8] active:translate-y-1 active:shadow-none"
            >
              TIẾP TỤC
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleTapChest}
          className={`relative flex h-full w-full cursor-pointer flex-col items-center justify-between px-6 py-14 ${theme.bg}`}
        >
          <div
            className={`pointer-events-none fixed inset-0 z-50 transition-opacity duration-500 ${
              phase === "exploding" ? "opacity-100" : "opacity-0"
            }`}
            style={{ background: theme.flash }}
          />

          <h2
            className={`z-20 mt-6 text-4xl font-black uppercase tracking-wider sm:text-5xl ${theme.titleColor}`}
          >
            {theme.title}
          </h2>

          <div className="relative flex flex-1 items-center justify-center">
            {(phase === "cracking" || phase === "exploding") && (
              <div className="pointer-events-none absolute flex items-center justify-center">
                <div
                  className="h-[520px] w-[520px] rounded-full sm:h-[640px] sm:w-[640px]"
                  style={{
                    background: theme.rays,
                    animation: "spinRays 8s linear infinite",
                  }}
                />
                <div
                  className="absolute h-80 w-80 rounded-full blur-md sm:h-96 sm:w-96"
                  style={{ background: theme.core }}
                />
              </div>
            )}

            <div
              className="relative z-10"
              style={{
                animation:
                  phase === "shaking"
                    ? "chestShake 0.45s ease-in-out infinite"
                    : phase === "cracking"
                    ? "chestTremble 0.14s ease-in-out infinite"
                    : phase === "exploding"
                    ? "chestExplode 0.5s ease-out forwards"
                    : undefined,
              }}
            >
              <ChestArtwork
                tier={tier}
                openStage={
                  phase === "cracking"
                    ? "cracked"
                    : phase === "exploding"
                    ? "opened"
                    : "closed"
                }
                className="h-64 w-64 sm:h-72 sm:w-72"
              />
            </div>
          </div>

          <p className="z-20 mb-8 text-2xl font-black tracking-wide text-white sm:text-3xl">
            {phase === "idle"
              ? "Tap to open!"
              : phase === "shaking"
              ? "Đang mở..."
              : ""}
          </p>
        </div>
      )}
    </div>
  );
};
