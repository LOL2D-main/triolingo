"use client";

import { useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";

import {
  buyStreakFreeze,
  refillEnergyWithGems,
  refillHeartsWithGems,
} from "@/actions/user-progress";
import { Button } from "@/components/ui/button";
import { DAILY_ENERGY, MAX_HEARTS } from "@/constants";
import { useUpgradeModal } from "@/store/use-upgrade-modal";

type ItemsProps = {
  gems: number;
  energy: number;
  hearts: number;
  streakFreezes: number;
  hasActiveSubscription: boolean;
};

const GEMS_FOR_ENERGY = 50;
const GEMS_FOR_HEARTS = 50;
const GEMS_FOR_FREEZE = 600;

export const Items = ({
  gems,
  energy,
  hearts,
  streakFreezes,
  hasActiveSubscription,
}: ItemsProps) => {
  const [pending, startTransition] = useTransition();
  const { open: openUpgradeModal } = useUpgradeModal();

  const onRefillHearts = () => {
    if (pending || hearts >= MAX_HEARTS) return;
    if (gems < GEMS_FOR_HEARTS) {
      toast.error("Bạn không đủ 50 Đá quý để hồi phục trái tim.");
      return;
    }

    startTransition(async () => {
      try {
        await refillHeartsWithGems();
        toast.success("Đã hồi phục đầy đủ 5/5 trái tim!");
      } catch (err: unknown) {
        toast.error(
          err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    });
  };

  const onRefillEnergy = () => {
    if (pending || energy >= DAILY_ENERGY) return;
    if (gems < GEMS_FOR_ENERGY) {
      toast.error("Bạn không đủ 50 Đá quý để nạp năng lượng.");
      return;
    }

    startTransition(async () => {
      try {
        await refillEnergyWithGems();
        toast.success("Đã hồi phục toàn bộ 20/20 năng lượng!");
      } catch (err: unknown) {
        toast.error(
          err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    });
  };

  const onBuyFreeze = () => {
    if (pending || streakFreezes >= 2) return;
    if (gems < GEMS_FOR_FREEZE) {
      toast.error("Bạn không đủ 600 Đá quý để mua Streak Freeze.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await buyStreakFreeze();
        toast.success(
          `Đã trang bị Streak Freeze (${res.streakFreezes}/2)! Chuỗi của bạn đã được bảo vệ.`
        );
      } catch (err: unknown) {
        toast.error(
          err instanceof Error ? err.message : "Có lỗi xảy ra, vui lòng thử lại."
        );
      }
    });
  };

  const isHeartsFull = hearts >= MAX_HEARTS;
  const isEnergyFull = energy >= DAILY_ENERGY;
  const isFreezeMax = streakFreezes >= 2;

  return (
    <div className="w-full pb-12">
      {/* Banner Gói Ultra ở đầu Cửa hàng (giống thiết kế ảnh 3) */}
      <div className="relative mb-8 flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-r from-[#0e1b4d] via-[#2b146b] to-[#581c87] p-6 text-white shadow-sm sm:flex-row sm:items-center sm:p-7">
        <div className="z-10 max-w-md space-y-2.5">
          <div className="mb-1">
            <Image
              src="/assets/super-badge.png"
              alt="Ultra Badge"
              width={86}
              height={24}
              className="h-6 w-auto object-contain"
            />
          </div>
          <h2 className="text-xl font-black tracking-tight sm:text-2xl">
            Bắt đầu dùng gói Ultra ngay!
          </h2>
          <p className="text-xs font-medium leading-relaxed text-indigo-100 sm:text-sm">
            Học tập không giới hạn năng lượng, luyện nói và luyện nghe chuyên sâu
            không gián đoạn.
          </p>
          <div className="pt-2">
            <Button
              type="button"
              onClick={openUpgradeModal}
              className="h-11 rounded-2xl border-b-4 border-slate-300 bg-white px-7 text-xs font-black uppercase tracking-wider text-[#1e1b4b] hover:bg-slate-100 active:border-b-2 sm:text-sm"
            >
              {hasActiveSubscription ? "ĐANG DÙNG ULTRA" : "TÌM HIỂU THÊM"}
            </Button>
          </div>
        </div>

        <div className="mt-4 flex shrink-0 items-center justify-end sm:mt-0 sm:pl-4">
          <Image
            src="/assets/mascot-cube.png"
            alt="TrioLingo Mascot"
            width={136}
            height={136}
            className="h-28 w-28 object-contain sm:h-36 sm:w-36"
          />
        </div>
      </div>

      {/* Muc 1: Trai tim & Nang luong */}
      <h2 className="mb-3 text-xl font-black text-neutral-800 sm:text-2xl">
        Trái tim & Năng lượng
      </h2>

      <ul className="w-full border-t-2 border-slate-200 divide-y-2 divide-slate-200">
        {/* Hoi phuc Trai tim */}
        <li className="flex w-full items-center gap-x-3 py-5 sm:gap-x-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center">
            <Image
              src="/heart.svg"
              alt="Trái tim"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
            />
          </div>

          <div className="min-w-0 flex-1 pr-2">
            <p className="text-base font-extrabold text-neutral-800 sm:text-lg">
              Hồi phục Trái tim
            </p>
            <p className="mt-1 text-xs font-medium leading-relaxed text-neutral-500 sm:text-sm">
              Lấp đầy 5/5 trái tim để không phải lo lắng mắc lỗi sai trong bài
              học vượt
            </p>
          </div>

          <Button
            onClick={onRefillHearts}
            disabled={pending || isHeartsFull}
            className="h-11 shrink-0 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-4 text-xs font-black uppercase text-sky-500 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-neutral-400 active:border-b-2 sm:min-w-[148px]"
          >
            {isHeartsFull ? (
              "ĐẦY ĐỦ"
            ) : (
              <span className="flex items-center gap-x-1.5">
                <span>MUA:</span>
                <Image
                  src="/gem.png"
                  alt="Gem"
                  height={18}
                  width={18}
                  className="object-contain"
                />
                <span>{GEMS_FOR_HEARTS}</span>
              </span>
            )}
          </Button>
        </li>

        {/* Hoi phuc Nang luong */}
        <li className="flex w-full items-center gap-x-3 py-5 sm:gap-x-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center">
            <Image
              src="/energy.png"
              alt="Năng lượng"
              width={56}
              height={40}
              className="h-12 w-14 object-contain"
            />
          </div>

          <div className="min-w-0 flex-1 pr-2">
            <p className="text-base font-extrabold text-neutral-800 sm:text-lg">
              Hồi phục Năng lượng
            </p>
            <p className="mt-1 text-xs font-medium leading-relaxed text-neutral-500 sm:text-sm">
              Dùng 50 Đá quý để nạp đầy lại 20/20 năng lượng học tập ngay lập
              tức
            </p>
          </div>

          <Button
            onClick={onRefillEnergy}
            disabled={pending || isEnergyFull}
            className="h-11 shrink-0 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-4 text-xs font-black uppercase text-sky-500 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-neutral-400 active:border-b-2 sm:min-w-[148px]"
          >
            {isEnergyFull ? (
              "ĐẦY ĐỦ"
            ) : (
              <span className="flex items-center gap-x-1.5">
                <span>MUA:</span>
                <Image
                  src="/gem.png"
                  alt="Gem"
                  height={18}
                  width={18}
                  className="object-contain"
                />
                <span>{GEMS_FOR_ENERGY}</span>
              </span>
            )}
          </Button>
        </li>

        {/* Nang luong & Trai tim vo han (Ultra) */}
        <li className="flex w-full items-center gap-x-3 py-5 sm:gap-x-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center">
            <Image
              src="/enery_ultra.png"
              alt="Ultra"
              width={58}
              height={44}
              className="h-12 w-14 object-contain"
            />
          </div>

          <div className="min-w-0 flex-1 pr-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-extrabold text-neutral-800 sm:text-lg">
                Năng lượng vô hạn
              </p>
              <Image
                src="/assets/super-badge.png"
                alt="Super"
                width={64}
                height={18}
                className="h-4 w-auto object-contain"
              />
            </div>
            <p className="mt-1 text-xs font-medium leading-relaxed text-neutral-500 sm:text-sm">
              Không bao giờ hết năng lượng khi học cùng gói Ultra!
            </p>
          </div>

          <Button
            onClick={openUpgradeModal}
            disabled={pending || hasActiveSubscription}
            className="h-11 shrink-0 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-4 text-xs font-black uppercase text-[#7c3aed] hover:bg-purple-50 disabled:bg-purple-50 disabled:text-purple-500 active:border-b-2 sm:min-w-[148px]"
          >
            {hasActiveSubscription ? "ĐANG DÙNG" : "DÙNG ULTRA"}
          </Button>
        </li>
      </ul>

      {/* Muc 2: Tang suc manh */}
      <h2 className="mt-8 mb-3 text-xl font-black text-neutral-800 sm:text-2xl">
        Tăng sức mạnh
      </h2>

      <ul className="w-full border-t-2 border-slate-200 divide-y-2 divide-slate-200">
        <li className="flex w-full items-center gap-x-3 py-5 sm:gap-x-5">
          {/* Icon Khieng bang Streak Freeze */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center">
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14"
            >
              <path
                d="M14 14C14 10.6863 16.6863 8 20 8H44C47.3137 8 50 10.6863 50 14V38C50 47.9411 41.9411 56 32 56C22.0589 56 14 47.9411 14 38V14Z"
                fill="#7CE0FF"
              />
              <path
                d="M32 8H44C47.3137 8 50 10.6863 50 14V38C50 47.9411 41.9411 56 32 56V8Z"
                fill="#4CCBF9"
              />
              <path
                d="M32 20C32 20 24 27.5 24 34C24 38.4183 27.5817 42 32 42C36.4183 42 40 38.4183 40 34C40 27.5 32 20 32 20Z"
                fill="#FFFFFF"
                fillOpacity="0.85"
              />
            </svg>
          </div>

          <div className="min-w-0 flex-1 pr-2">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-base font-extrabold text-neutral-800 sm:text-lg">
                Streak Freeze
              </p>
              <span className="rounded-md bg-slate-200 px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-600">
                ĐÃ TRANG BỊ {streakFreezes} / 2
              </span>
            </div>
            <p className="mt-1 text-xs font-medium leading-relaxed text-neutral-500 sm:text-sm">
              Streak Freeze cho phép bạn giữ nguyên streak ngay cả khi bạn không
              vào học trong một ngày
            </p>
          </div>

          <Button
            onClick={onBuyFreeze}
            disabled={pending || isFreezeMax}
            className="h-11 shrink-0 rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-4 text-xs font-black uppercase text-sky-500 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-neutral-400 active:border-b-2 sm:min-w-[168px]"
          >
            {isFreezeMax ? (
              "ĐÃ ĐẦY (2/2)"
            ) : (
              <span className="flex items-center gap-x-1.5">
                <span>MUA VỚI GIÁ:</span>
                <Image
                  src="/gem.png"
                  alt="Gem"
                  height={18}
                  width={18}
                  className="object-contain"
                />
                <span>{GEMS_FOR_FREEZE}</span>
              </span>
            )}
          </Button>
        </li>
      </ul>
    </div>
  );
};
