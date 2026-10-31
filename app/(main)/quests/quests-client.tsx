"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { toast } from "sonner";

import {
  QuestBarChestIcon,
  QuestsWelcomeMascotGraphic,
} from "@/components/chest-graphics";
import { DailyGiftButton } from "@/components/daily-gift-button";
import type { DailyQuestConfig } from "@/constants";
import { useChestModal } from "@/store/use-chest-modal";

type QuestsClientProps = {
  quests: DailyQuestConfig[];
  lessonsCompleted: number;
  listeningCompleted: number;
  highAccuracyCompleted: number;
  chest1Claimed: boolean;
  chest2Claimed: boolean;
  chest3Claimed: boolean;
  isDailyGiftClaimed?: boolean;
};

/**
 * Tinh thoi gian con lai den 00:00 gio Viet Nam (chu ky 24h doi nhiem vu moi)
 */
function computeDailyCountdownLabel(): string {
  const vnNowMs = Date.now() + 7 * 3600 * 1000;
  const dayMs = 24 * 3600 * 1000;
  const remainingMs = dayMs - (((vnNowMs % dayMs) + dayMs) % dayMs);

  const totalMinutes = Math.max(1, Math.floor(remainingMs / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0 && minutes > 0) {
    return `${hours} TIẾNG ${minutes} PHÚT`;
  }
  if (hours > 0) {
    return `${hours} TIẾNG`;
  }
  return `${minutes} PHÚT`;
}

const QuestLeftIcon = ({
  type,
}: {
  type: "lightning" | "target" | "accuracy";
}) => {
  if (type === "lightning") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-11 w-11 shrink-0"
      >
        <path
          d="M27.5 4L10 26.5H23L19.5 44L38 20.5H25L27.5 4Z"
          fill="#FFC800"
          stroke="#FFC800"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M26.5 7L13 24.5H22.5L21 34L33 19.5H24L26.5 7Z"
          fill="#FFE042"
        />
      </svg>
    );
  }

  if (type === "target") {
    return (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-11 w-11 shrink-0"
      >
        <circle cx="24" cy="24" r="19" fill="#1CB0F6" />
        <circle cx="24" cy="24" r="13.5" fill="#FFFFFF" />
        <circle cx="24" cy="24" r="8.5" fill="#1CB0F6" />
        <circle cx="24" cy="24" r="4" fill="#FFC800" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-11 w-11 shrink-0"
    >
      <circle cx="24" cy="24" r="19" fill="#FF4B4B" />
      <circle cx="24" cy="24" r="13.5" fill="#FFFFFF" />
      <circle cx="24" cy="24" r="8.5" fill="#FF4B4B" />
      <path
        d="M24 17.5L25.9 21.6L30.4 22.1L27 25.2L27.9 29.6L24 27.4L20.1 29.6L21 25.2L17.6 22.1L22.1 21.6L24 17.5Z"
        fill="#FFC800"
      />
    </svg>
  );
};

export const QuestsClient = ({
  quests,
  lessonsCompleted,
  listeningCompleted,
  highAccuracyCompleted,
  chest1Claimed,
  chest2Claimed,
  chest3Claimed,
  isDailyGiftClaimed = false,
}: QuestsClientProps) => {
  const { open: openChestModal } = useChestModal();
  const [countdownLabel, setCountdownLabel] = useState<string>("24 TIẾNG");

  useEffect(() => {
    setCountdownLabel(computeDailyCountdownLabel());
    const timer = setInterval(() => {
      setCountdownLabel(computeDailyCountdownLabel());
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  const getQuestProgress = (questId: 1 | 2 | 3) => {
    if (questId === 1) return lessonsCompleted;
    if (questId === 2) return listeningCompleted;
    return highAccuracyCompleted;
  };

  const getQuestClaimed = (questId: 1 | 2 | 3) => {
    if (questId === 1) return chest1Claimed;
    if (questId === 2) return chest2Claimed;
    return chest3Claimed;
  };

  const onClickQuest = (quest: DailyQuestConfig) => {
    const claimed = getQuestClaimed(quest.id);
    const done = getQuestProgress(quest.id);
    const isCompleted = done >= quest.target;

    if (claimed) {
      toast.info("Bạn đã mở rương nhiệm vụ này hôm nay rồi!");
      return;
    }
    if (!isCompleted) {
      toast.info(
        `Hãy hoàn thành nhiệm vụ (${Math.min(done, quest.target)}/${quest.target}) để mở ${quest.chestName}!`
      );
      return;
    }

    openChestModal({
      tier: quest.chestTier,
      rewardGems: quest.rewardGems,
      questId: quest.id,
      title: quest.chestName,
      description: `Phần thưởng hoàn thành: "${quest.title}"`,
    });
  };

  return (
    <div className="mx-auto w-full max-w-[640px] space-y-6 pb-8">
      {/* Banner Tim Chao Mung (Chuan y het anh mau Duolingo) */}
      <div className="relative flex items-center justify-between overflow-hidden rounded-2xl bg-[#9069CD] px-5 py-6 text-white shadow-sm sm:px-8 sm:py-7">
        <div className="z-10 flex max-w-[62%] flex-col items-start sm:max-w-[65%]">
          <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            Chào mừng!
          </h1>
          <p className="mt-1.5 text-xs font-medium leading-relaxed text-white/95 sm:text-base">
            Hãy hoàn thành nhiệm vụ để nhận thưởng nhé! Mỗi ngày sẽ có các nhiệm
            vụ mới.
          </p>

          <div className="mt-4">
            <DailyGiftButton isClaimedToday={isDailyGiftClaimed} />
          </div>
        </div>

        <div className="z-10 -mr-2 shrink-0 sm:mr-0">
          <QuestsWelcomeMascotGraphic className="h-32 w-36 sm:h-40 sm:w-44" />
        </div>
      </div>

      {/* Tieu de Nhiem vu hang ngay + Dem nguoc 24h doi nhiem vu */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-xl font-extrabold text-neutral-800 sm:text-2xl">
          Nhiệm vụ hằng ngày
        </h2>

        <div
          className="flex items-center gap-x-1.5 text-xs font-extrabold uppercase tracking-wide text-[#FF9600] sm:text-sm"
          title="Thời gian còn lại trước khi đổi bộ nhiệm vụ mới (24h)"
        >
          <Clock className="h-4 w-4 stroke-[2.5]" />
          <span>{countdownLabel}</span>
        </div>
      </div>

      {/* Danh sach cac the nhiem vu */}
      <div className="space-y-4">
        {quests.map((quest) => {
          const rawDone = getQuestProgress(quest.id);
          const current = Math.min(quest.target, rawDone);
          const isCompleted = current >= quest.target;
          const isClaimed = getQuestClaimed(quest.id);
          const percentage = Math.round((current / quest.target) * 100);

          return (
            <button
              key={quest.id}
              type="button"
              onClick={() => onClickQuest(quest)}
              className={`group flex w-full items-center gap-x-4 rounded-2xl border-2 px-4 py-4 text-left transition-all sm:gap-x-5 sm:px-6 sm:py-5 ${
                isCompleted && !isClaimed
                  ? "cursor-pointer border-[#FFC800] bg-amber-50/35 shadow-sm hover:bg-amber-50/70"
                  : isClaimed
                  ? "border-slate-200 bg-white opacity-85"
                  : "cursor-pointer border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              {/* Icon ben trai (Tia set / Muc tieu / Chinh xac) */}
              <QuestLeftIcon type={quest.iconType} />

              {/* Noi dung + Thanh tien do noi lien Ruong */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-extrabold text-neutral-800 sm:text-base">
                    {quest.title}
                  </p>

                  <span className="inline-flex shrink-0 items-center gap-x-1 text-xs font-extrabold text-sky-500">
                    <Image src="/gem.png" alt="Gem" width={14} height={14} />
                    {isClaimed ? "Đã nhận" : `+${quest.rewardGems} Đá quý`}
                  </span>
                </div>

                {/* Thanh tien do mau vang #FFC800 cham sat vao ruong ben phai (Y het anh mau) */}
                <div className="mt-2.5 flex items-center">
                  <div className="relative h-5 flex-1 overflow-hidden rounded-l-full bg-[#E5E5E5]">
                    <div
                      className="h-full rounded-l-full bg-[#FFC800] transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    >
                      {percentage > 0 && (
                        <div className="mx-2 mt-1 h-1.5 rounded-full bg-[#FFE042]/80" />
                      )}
                    </div>
                    <span
                      className={`absolute inset-0 flex items-center justify-center text-xs font-extrabold ${
                        percentage >= 50 ? "text-[#9E7000]" : "text-neutral-500"
                      }`}
                    >
                      {current} / {quest.target}
                    </span>
                  </div>

                  <div className="-ml-1.5 shrink-0">
                    <QuestBarChestIcon
                      tier={quest.chestTier}
                      className={`h-11 w-11 sm:h-12 sm:w-12 transition-transform ${
                        isCompleted && !isClaimed
                          ? "animate-bounce drop-shadow-[0_4px_8px_rgba(255,200,0,0.45)]"
                          : "group-hover:scale-105"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </button>
          );
        })}

        {/* The khoa "Chuan bi mo khoa them nhiem vu moi" (Chuan y het anh mau) */}
        <div className="flex w-full items-center gap-x-4 rounded-2xl border-2 border-slate-200 bg-white px-4 py-5 sm:gap-x-5 sm:px-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center">
            <svg
              viewBox="0 0 44 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
            >
              <path
                d="M12 20V14C12 8.477 16.477 4 22 4C27.523 4 32 8.477 32 14V20"
                stroke="#CECECE"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
              <rect
                x="6"
                y="19"
                width="32"
                height="25"
                rx="6"
                fill="#CECECE"
              />
              <circle cx="22" cy="29.5" r="3" fill="#9E9E9E" />
              <rect
                x="20.5"
                y="31"
                width="3"
                height="6"
                rx="1.5"
                fill="#9E9E9E"
              />
            </svg>
          </div>

          <p className="text-sm font-extrabold text-[#AFAFAF] sm:text-base">
            Chuẩn bị mở khóa thêm nhiệm vụ mới
          </p>
        </div>
      </div>
    </div>
  );
};
