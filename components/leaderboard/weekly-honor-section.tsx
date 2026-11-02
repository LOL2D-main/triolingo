"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CrownIcon, MedalIcon, TrophyIcon } from "./podium";

type WinnerItem = {
  weekKey: string;
  rank: number;
  userName: string;
  userImageSrc: string;
  points: number;
};

type WeeklyHonorSectionProps = {
  winners: WinnerItem[];
  isCelebrationTime: boolean;
};

export const WeeklyHonorSection = ({
  winners,
  isCelebrationTime,
}: WeeklyHonorSectionProps) => {
  // Chỉ khi hết tuần (isCelebrationTime = true) thì bảng mới tự động hiện lên.
  // Bình thường trong tuần (isCelebrationTime = false) thì mặc định ẩn hoàn toàn.
  const [isOpen, setIsOpen] = useState(isCelebrationTime);

  if (!winners || winners.length === 0) return null;

  return (
    <div className="w-full mb-4">
      {/* Nút bật/tắt khi ở ngày thường để không chiếm diện tích nếu không cần thiết */}
      {!isCelebrationTime && (
        <div className="flex justify-center mb-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs font-bold text-neutral-500 hover:text-neutral-800 flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            <TrophyIcon className="w-3.5 h-3.5 text-amber-500" />
            <span>{isOpen ? "Thu gọn vinh danh tuần trước" : "Xem vinh danh Top 3 tuần trước"}</span>
          </button>
        </div>
      )}

      {/* Bảng vinh danh chỉ hiển thị khi hết tuần hoặc khi người dùng chủ động mở */}
      {isOpen && (
        <div className="w-full bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-300 rounded-3xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <CrownIcon className="w-5 h-5 text-amber-600" />
              <h3 className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-wider">
                Vinh danh Top 1, 2, 3 Tuần vừa kết thúc
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                Tuần {winners[0]?.weekKey}
              </span>
              {isCelebrationTime && (
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-amber-800 hover:text-amber-950 text-xs font-bold px-1.5 py-0.5 rounded"
                  title="Đóng bảng vinh danh"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {winners.map((winner) => {
              const isGold = winner.rank === 1;
              const isSilver = winner.rank === 2;
              const badgeClass = isGold
                ? "bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-200"
                : isSilver
                ? "bg-slate-300 text-slate-900 border-slate-400 ring-2 ring-slate-200"
                : "bg-amber-700 text-amber-50 border-amber-800 ring-2 ring-amber-100";

              const titleLabel = isGold
                ? "Quán Quân"
                : isSilver
                ? "Á Quân 1"
                : "Á Quân 2";

              return (
                <div
                  key={`${winner.weekKey}-${winner.rank}`}
                  className="flex items-center gap-3 bg-white/95 border border-amber-200/90 rounded-2xl p-3 shadow-xs"
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 border ${badgeClass}`}
                  >
                    {winner.rank}
                  </span>
                  <Avatar className="h-10 w-10 border-2 border-slate-200 shrink-0">
                    <AvatarImage src={winner.userImageSrc} className="object-cover" />
                    <AvatarFallback className="text-xs font-bold">
                      {winner.userName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-bold text-neutral-800 truncate">
                        {winner.userName}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-amber-700">
                        {titleLabel}
                      </span>
                      <p className="text-[11px] font-extrabold text-lime-700">
                        {winner.points.toLocaleString("vi-VN")} KN
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

