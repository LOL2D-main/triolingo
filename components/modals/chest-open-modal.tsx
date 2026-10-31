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

type AnimationPhase = "idle" | "piercing" | "opening" | "reward";

const THEMES = {
  wood: {
    bg: "bg-[#111B21]",
    title: "RƯƠNG ĐỒNG",
    titleColor: "text-[#FFC800]",
    beamPrimary: "#FFF7D6",
    beamSecondary: "#FFC800",
    seamGlow: "rgba(255, 215, 100, 0.9)",
    burstFlash:
      "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,230,128,0.65) 45%, rgba(17,27,33,0) 80%)",
  },
  rare: {
    bg: "bg-[#0B2545]",
    title: "RƯƠNG HIẾM",
    titleColor: "text-[#7DD3FC]",
    beamPrimary: "#FFFFFF",
    beamSecondary: "#38BDF8",
    seamGlow: "rgba(56, 189, 248, 0.95)",
    burstFlash:
      "radial-gradient(circle, rgba(255,255,255,0.98) 0%, rgba(56,189,248,0.75) 48%, rgba(11,37,69,0) 82%)",
  },
  legendary: {
    bg: "bg-[#231123]",
    title: "RƯƠNG MEGA",
    titleColor: "text-[#FFE033]",
    beamPrimary: "#FFFFFF",
    beamSecondary: "#FFD700",
    seamGlow: "rgba(255, 215, 0, 1)",
    burstFlash:
      "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,224,51,0.85) 50%, rgba(35,17,35,0) 85%)",
  },
} as const;

/**
 * Danh sach cac tia sang ban dan dan tu khe hop ra ngoai (KHONG xoay nhu canh quat)
 * Moi tia co goc ban, do dai, do rong va thoi gian tre (delay) khac nhau.
 */
const PIERCING_BEAMS = [
  { angle: -18, length: 300, width: 34, delay: 0.08 },
  { angle: 22, length: 310, width: 36, delay: 0.24 },
  { angle: -58, length: 280, width: 28, delay: 0.42 },
  { angle: 62, length: 285, width: 30, delay: 0.58 },
  { angle: 2, length: 340, width: 42, delay: 0.74 },
  { angle: -82, length: 260, width: 26, delay: 0.88 },
  { angle: 84, length: 265, width: 26, delay: 1.02 },
  { angle: -38, length: 325, width: 34, delay: 1.15 },
  { angle: 42, length: 320, width: 34, delay: 1.26 },
  { angle: -102, length: 230, width: 22, delay: 1.36 },
  { angle: 104, length: 230, width: 22, delay: 1.44 },
];

/**
 * Danh sach cac vien da quy va tia lap lanh ban tung tu trong long ruong khi bung nap
 */
const ERUPTING_GEMS = [
  { tx: "-135px", ty: "-195px", rot: "-38deg", scale: 1.05, delay: "0s" },
  { tx: "140px", ty: "-190px", rot: "42deg", scale: 1.05, delay: "0.03s" },
  { tx: "-75px", ty: "-245px", rot: "-20deg", scale: 1.18, delay: "0.05s" },
  { tx: "82px", ty: "-240px", rot: "25deg", scale: 1.15, delay: "0.07s" },
  { tx: "0px", ty: "-270px", rot: "8deg", scale: 1.28, delay: "0.02s" },
  { tx: "-185px", ty: "-125px", rot: "-55deg", scale: 0.92, delay: "0.08s" },
  { tx: "190px", ty: "-120px", rot: "58deg", scale: 0.92, delay: "0.09s" },
  { tx: "-42px", ty: "-175px", rot: "-12deg", scale: 1.0, delay: "0.11s" },
  { tx: "48px", ty: "-170px", rot: "16deg", scale: 1.0, delay: "0.12s" },
  { tx: "-115px", ty: "-95px", rot: "-28deg", scale: 0.88, delay: "0.14s" },
  { tx: "120px", ty: "-90px", rot: "32deg", scale: 0.88, delay: "0.15s" },
];

export const ChestOpenModal = () => {
  const { isOpen, tier, rewardGems, questId, description, close } =
    useChestModal();
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
    const step = Math.max(1, Math.ceil(rewardGems / 26));
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

    // Giai doan 1 (0ms -> 1650ms): Ruong nen xuong, rung tich tu nang luong + Tia sang ban dan dan qua khe hop
    setPhase("piercing");
    triggerVibrate([50, 40, 70, 35, 90, 30, 130]);
    playSound("/correct.wav");

    // Giai doan 2 (1650ms -> 2650ms): Bung nap ruong + Da quy ban tung tu trong long hop
    setTimeout(() => {
      setPhase("opening");
      playSound("/finish.mp3");
      triggerVibrate([180, 50, 220]);
    }, 1650);

    // Giai doan 3 (2650ms): Chuyen sang man hinh khoe thuong Da quy
    setTimeout(() => {
      setPhase("reward");
    }, 2650);
  };

  const onContinue = () => {
    close();
    router.refresh();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none">
      <style jsx global>{`
        @keyframes chestIdleFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-6px) scale(1.02);
          }
        }
        @keyframes chestChargeBuildUp {
          0% {
            transform: scale(1.14, 0.86) translateY(10px);
          }
          15% {
            transform: scale(0.96, 1.04) translate(-4px, 0) rotate(-2deg);
          }
          30% {
            transform: scale(1.04, 0.96) translate(5px, 2px) rotate(2.5deg);
          }
          45% {
            transform: scale(0.98, 1.03) translate(-6px, -1px) rotate(-3deg);
          }
          60% {
            transform: scale(1.05, 0.95) translate(7px, 2px) rotate(3.5deg);
          }
          75% {
            transform: scale(1.06, 0.94) translate(-8px, 1px) rotate(-4deg);
          }
          88% {
            transform: scale(1.09, 0.91) translate(8px, 3px) rotate(4deg);
          }
          95% {
            transform: scale(1.14, 0.86) translate(-4px, 6px) rotate(-2deg);
          }
          100% {
            transform: scale(1.16, 0.84) translate(0, 8px) rotate(0deg);
          }
        }
        @keyframes chestOpenSpring {
          0% {
            transform: scale(1.16, 0.84) translateY(8px);
          }
          28% {
            transform: scale(0.92, 1.12) translateY(-22px);
          }
          58% {
            transform: scale(1.04, 0.97) translateY(4px);
          }
          80% {
            transform: scale(0.99, 1.01) translateY(-2px);
          }
          100% {
            transform: scale(1, 1) translateY(0);
          }
        }
        @keyframes beamPierceOut {
          0% {
            opacity: 0;
            transform: rotate(var(--beam-angle)) scaleY(0) scaleX(0.3);
          }
          30% {
            opacity: 1;
            transform: rotate(var(--beam-angle)) scaleY(1.08) scaleX(1.15);
          }
          70% {
            opacity: 0.95;
            transform: rotate(var(--beam-angle)) scaleY(1) scaleX(0.95);
          }
          100% {
            opacity: 1;
            transform: rotate(var(--beam-angle)) scaleY(1.15) scaleX(1.2);
          }
        }
        @keyframes seamSparkleFly {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0.3);
          }
          25% {
            opacity: 1;
            transform: translate(var(--sx), var(--sy)) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translate(calc(var(--sx) * 1.9), calc(var(--sy) * 1.9)) scale(0);
          }
        }
        @keyframes gemFountainArc {
          0% {
            opacity: 0;
            transform: translate(0, 10px) scale(0.25) rotate(0deg);
          }
          20% {
            opacity: 1;
          }
          65% {
            opacity: 1;
            transform: translate(var(--tx), var(--ty)) scale(var(--gscale)) rotate(var(--grot));
          }
          100% {
            opacity: 0;
            transform: translate(calc(var(--tx) * 1.18), calc(var(--ty) + 65px))
              scale(calc(var(--gscale) * 0.85)) rotate(calc(var(--grot) * 1.4));
          }
        }
        @keyframes burstFlashAnim {
          0% {
            opacity: 0.95;
            transform: scale(0.6);
          }
          100% {
            opacity: 0;
            transform: scale(2.1);
          }
        }
        @keyframes rewardSpringIn {
          0% {
            transform: scale(0.55) translateY(24px);
            opacity: 0;
          }
          65% {
            transform: scale(1.05) translateY(-4px);
            opacity: 1;
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {phase === "reward" ? (
        <div className="relative flex h-full w-full flex-col items-center justify-between bg-white px-6 py-12">
          {animations && (
            <Confetti
              recycle={false}
              numberOfPieces={
                tier === "legendary" ? 420 : tier === "rare" ? 260 : 160
              }
              tweenDuration={5500}
              width={width}
              height={height}
            />
          )}

          <div
            className="mt-4 flex flex-col items-center"
            style={{
              animation:
                "rewardSpringIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            <span className="rounded-full bg-sky-100 px-4 py-1 text-xs font-black uppercase tracking-widest text-sky-600">
              Phần thưởng rương
            </span>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-[#1CB0F6] sm:text-5xl">
              +{displayedGems} đá quý
            </h1>
          </div>

          <div
            className="flex max-w-md flex-col items-center text-center"
            style={{
              animation:
                "rewardSpringIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
            }}
          >
            <GemRewardPileGraphic className="h-64 w-72 sm:h-72 sm:w-80" />
            <p className="mt-6 text-xl font-extrabold leading-snug text-[#3C3C3C] sm:text-2xl">
              {description ||
                "Bạn nhận được phần thưởng từ nhiệm vụ hằng ngày!"}
            </p>
          </div>

          <div className="w-full max-w-md">
            <button
              type="button"
              onClick={onContinue}
              className="w-full rounded-2xl bg-[#1CB0F6] py-4 text-lg font-black uppercase tracking-wider text-white shadow-[0_5px_0_#1899D6] transition hover:bg-[#14A4E8] active:translate-y-1 active:shadow-none"
            >
              TIẾP TỤC
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleTapChest}
          className={`relative flex h-full w-full cursor-pointer flex-col items-center justify-between px-6 py-12 ${theme.bg}`}
        >
          {/* Tia chop sang bung ra dung khoanh khac nap ruong bat mo */}
          {phase === "opening" && (
            <div
              className="pointer-events-none fixed inset-0 z-40"
              style={{
                background: theme.burstFlash,
                animation: "burstFlashAnim 0.55s ease-out forwards",
              }}
            />
          )}

          <h2
            className={`z-20 mt-4 text-3xl font-black uppercase tracking-wider sm:text-5xl ${theme.titleColor} drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]`}
          >
            {theme.title}
          </h2>

          {/* San khau trung tam cua Ruong */}
          <div className="relative flex flex-1 items-center justify-center">
            {/* QUANG SANG AM TU KHE HOP KHI DANG NEN NANG LUONG */}
            {(phase === "piercing" || phase === "opening") && (
              <div
                className="pointer-events-none absolute h-52 w-72 rounded-full blur-2xl transition-all duration-500"
                style={{
                  background: `radial-gradient(circle, ${theme.seamGlow} 0%, transparent 72%)`,
                  transform:
                    phase === "opening" ? "scale(1.65)" : "scale(1.05)",
                }}
              />
            )}

            {/* NHUNG TIA SANG BAN DAN DAN TU TRONG KHE HOP RA NGOAI (Khong xoay tron) */}
            {(phase === "piercing" || phase === "opening") && (
              <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
                {PIERCING_BEAMS.map((beam, idx) => (
                  <div
                    key={idx}
                    style={
                      {
                        position: "absolute",
                        bottom: "48%",
                        width: `${beam.width}px`,
                        height: `${beam.length}px`,
                        transformOrigin: "bottom center",
                        "--beam-angle": `${beam.angle}deg`,
                        background: `linear-gradient(to top, ${theme.beamPrimary} 0%, ${theme.beamSecondary} 45%, transparent 100%)`,
                        clipPath: "polygon(42% 100%, 58% 100%, 100% 0%, 0% 0%)",
                        filter: "blur(1px) drop-shadow(0 0 10px rgba(255,255,255,0.8))",
                        opacity: 0,
                        animation: `beamPierceOut 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${beam.delay}s forwards`,
                      } as React.CSSProperties
                    }
                  />
                ))}

                {/* Hat nang luong ban ra doc khe nut cua hop */}
                {[
                  { sx: "-110px", sy: "-30px", d: "0.2s" },
                  { sx: "115px", sy: "-25px", d: "0.35s" },
                  { sx: "-85px", sy: "-75px", d: "0.55s" },
                  { sx: "95px", sy: "-70px", d: "0.7s" },
                  { sx: "-130px", sy: "15px", d: "0.9s" },
                  { sx: "135px", sy: "12px", d: "1.05s" },
                  { sx: "-55px", sy: "-105px", d: "1.2s" },
                  { sx: "60px", sy: "-100px", d: "1.35s" },
                ].map((sp, i) => (
                  <div
                    key={`spark-${i}`}
                    className="absolute h-3 w-3 rounded-full bg-white shadow-[0_0_12px_#fff]"
                    style={
                      {
                        "--sx": sp.sx,
                        "--sy": sp.sy,
                        opacity: 0,
                        animation: `seamSparkleFly 0.65s ease-out ${sp.d} infinite`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            )}

            {/* COT SANG PHUN LEN + DA QUY BAN Vang TU TRONG LONG HOP KHI NAP RUONG MO */}
            {phase === "opening" && (
              <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
                {/* Cot sang thang dung tu mieng hop */}
                <div
                  className="absolute bottom-[46%] h-72 w-44"
                  style={{
                    background: `linear-gradient(to top, #FFFFFF 0%, ${theme.beamSecondary} 50%, transparent 100%)`,
                    clipPath: "polygon(22% 100%, 78% 100%, 100% 0%, 0% 0%)",
                    filter: "blur(6px)",
                  }}
                />

                {/* Da quy 3D ban tung len theo quy dao parabol tu trong ruong */}
                {ERUPTING_GEMS.map((gem, idx) => (
                  <div
                    key={`gem-${idx}`}
                    className="absolute"
                    style={
                      {
                        "--tx": gem.tx,
                        "--ty": gem.ty,
                        "--grot": gem.rot,
                        "--gscale": gem.scale,
                        animation: `gemFountainArc 0.92s cubic-bezier(0.2, 0.85, 0.35, 1) ${gem.delay} forwards`,
                      } as React.CSSProperties
                    }
                  >
                    <svg
                      width="44"
                      height="44"
                      viewBox="-28 -28 56 56"
                      className="drop-shadow-[0_6px_12px_rgba(28,176,246,0.65)]"
                    >
                      <polygon
                        points="0,-24 22,-12 24,12 4,24 -20,16 -24,-8"
                        fill="#1CB0F6"
                      />
                      <polygon
                        points="0,-24 22,-12 6,2 -14,-4 -24,-8"
                        fill="#7DD3FC"
                      />
                      <polygon
                        points="22,-12 24,12 4,24 6,2"
                        fill="#0284C7"
                      />
                      <polygon
                        points="-14,-8 -4,-14 0,-6 -10,-1"
                        fill="#FFFFFF"
                      />
                    </svg>
                  </div>
                ))}
              </div>
            )}

            {/* HINH RUONG CHINH */}
            <div
              className="relative z-10"
              style={{
                animation:
                  phase === "idle"
                    ? "chestIdleFloat 2.4s ease-in-out infinite"
                    : phase === "piercing"
                    ? "chestChargeBuildUp 1.65s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards"
                    : phase === "opening"
                    ? "chestOpenSpring 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
                    : undefined,
              }}
            >
              <ChestArtwork
                tier={tier}
                openStage={
                  phase === "piercing"
                    ? "cracked"
                    : phase === "opening"
                    ? "opened"
                    : "closed"
                }
                className="h-64 w-64 sm:h-72 sm:w-72"
              />
            </div>
          </div>

          <p className="z-20 mb-6 text-xl font-black tracking-wide text-white/95 sm:text-2xl">
            {phase === "idle"
              ? "Chạm vào rương để mở!"
              : phase === "piercing"
              ? "Đang tích tụ ánh sáng..."
              : "Bung nắp!"}
          </p>
        </div>
      )}
    </div>
  );
};
