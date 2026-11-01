import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const CrownIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
  </svg>
);

export const TrophyIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V19H7v2h10v-2h-4v-3.1c1.8-.4 3.25-1.78 3.61-3.96C19.08 11.63 21 9.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
  </svg>
);

export const MedalIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 8.1l5.8-.8L12 2z" />
  </svg>
);

export type PodiumUser = {
  userId: string;
  userName: string;
  userImageSrc: string;
  points: number;
};

type LeaderboardPodiumProps = {
  topUsers: PodiumUser[];
};

export const LeaderboardPodium = ({ topUsers }: LeaderboardPodiumProps) => {
  const rank1 = topUsers[0];
  const rank2 = topUsers[1];
  const rank3 = topUsers[2];

  if (!rank1) return null;

  return (
    <div className="w-full my-6 bg-gradient-to-b from-slate-50 to-white border-2 border-slate-200/80 rounded-3xl p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-center gap-2 mb-6">
        <TrophyIcon className="w-5 h-5 text-amber-500" />
        <h2 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-neutral-700">
          Vinh danh Top 3 Dẫn đầu Tuần
        </h2>
        <TrophyIcon className="w-5 h-5 text-amber-500" />
      </div>

      <div className="flex items-end justify-center gap-2 sm:gap-4 max-w-md mx-auto pt-6">
        {/* RANK 2 - BẠC (Bên trái) */}
        <div className="flex-1 flex flex-col items-center">
          {rank2 ? (
            <>
              <div className="relative mb-2">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-500 text-white rounded-full p-1 shadow-sm">
                  <MedalIcon className="w-3.5 h-3.5 text-slate-100" />
                </div>
                <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-4 border-slate-300 ring-2 ring-slate-100 shadow">
                  <AvatarImage src={rank2.userImageSrc} className="object-cover" />
                  <AvatarFallback className="bg-slate-400 font-bold text-white text-xs">
                    {rank2.userName?.slice(0, 2).toUpperCase() || "TL"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs sm:text-sm font-bold text-neutral-800 text-center truncate max-w-[90px] sm:max-w-[110px]">
                {rank2.userName}
              </p>
              <p className="text-[11px] sm:text-xs font-black text-slate-600 mb-2">
                {rank2.points.toLocaleString("vi-VN")} KN
              </p>
            </>
          ) : (
            <div className="h-20 flex items-center justify-center text-xs text-muted-foreground font-medium">
              Chờ bạn
            </div>
          )}

          {/* Pillar 2 */}
          <div className="w-full h-24 sm:h-28 bg-gradient-to-t from-slate-200 to-slate-100 border-2 border-slate-300 rounded-t-2xl flex flex-col items-center justify-start pt-2 shadow-inner">
            <span className="text-xl sm:text-2xl font-black text-slate-600">2</span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500">
              Á Quân 1
            </span>
          </div>
        </div>

        {/* RANK 1 - VÀNG (Chính giữa, cao nhất) */}
        <div className="flex-1 flex flex-col items-center">
          <div className="relative mb-2">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-amber-500 text-amber-50 rounded-full p-1.5 shadow-md animate-none">
              <CrownIcon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-100" />
            </div>
            <Avatar className="h-18 w-18 sm:h-20 sm:w-20 border-4 border-amber-400 ring-4 ring-amber-100 shadow-md">
              <AvatarImage src={rank1.userImageSrc} className="object-cover" />
              <AvatarFallback className="bg-amber-500 font-bold text-white text-sm">
                {rank1.userName?.slice(0, 2).toUpperCase() || "TL"}
              </AvatarFallback>
            </Avatar>
          </div>
          <p className="text-xs sm:text-sm font-black text-neutral-900 text-center truncate max-w-[100px] sm:max-w-[125px]">
            {rank1.userName}
          </p>
          <p className="text-xs sm:text-sm font-black text-amber-600 mb-2">
            {rank1.points.toLocaleString("vi-VN")} KN
          </p>

          {/* Pillar 1 */}
          <div className="w-full h-32 sm:h-36 bg-gradient-to-t from-amber-200 via-amber-100 to-amber-50 border-2 border-amber-300 rounded-t-2xl flex flex-col items-center justify-start pt-2 shadow-inner">
            <span className="text-2xl sm:text-3xl font-black text-amber-700">1</span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-800">
              Quán Quân
            </span>
          </div>
        </div>

        {/* RANK 3 - ĐỒNG (Bên phải) */}
        <div className="flex-1 flex flex-col items-center">
          {rank3 ? (
            <>
              <div className="relative mb-2">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-700 text-white rounded-full p-1 shadow-sm">
                  <MedalIcon className="w-3.5 h-3.5 text-amber-100" />
                </div>
                <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-4 border-amber-600/60 ring-2 ring-amber-100 shadow">
                  <AvatarImage src={rank3.userImageSrc} className="object-cover" />
                  <AvatarFallback className="bg-amber-700 font-bold text-white text-xs">
                    {rank3.userName?.slice(0, 2).toUpperCase() || "TL"}
                  </AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs sm:text-sm font-bold text-neutral-800 text-center truncate max-w-[90px] sm:max-w-[110px]">
                {rank3.userName}
              </p>
              <p className="text-[11px] sm:text-xs font-black text-amber-800 mb-2">
                {rank3.points.toLocaleString("vi-VN")} KN
              </p>
            </>
          ) : (
            <div className="h-20 flex items-center justify-center text-xs text-muted-foreground font-medium">
              Chờ bạn
            </div>
          )}

          {/* Pillar 3 */}
          <div className="w-full h-20 sm:h-24 bg-gradient-to-t from-amber-100 to-orange-50 border-2 border-amber-200/90 rounded-t-2xl flex flex-col items-center justify-start pt-2 shadow-inner">
            <span className="text-xl sm:text-2xl font-black text-amber-800">3</span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-700">
              Á Quân 2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

type PreviousWinnersProps = {
  winners: {
    weekKey: string;
    rank: number;
    userName: string;
    userImageSrc: string;
    points: number;
  }[];
};

export const PreviousWeekHonor = ({ winners }: PreviousWinnersProps) => {
  if (!winners || winners.length === 0) return null;

  return (
    <div className="w-full mb-6 bg-amber-500/10 border-2 border-amber-300 rounded-3xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <CrownIcon className="w-5 h-5 text-amber-600" />
          <h3 className="text-xs sm:text-sm font-black text-amber-900 uppercase tracking-wider">
            Vinh danh Quán quân Tuần trước
          </h3>
        </div>
        <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
          Tuần {winners[0]?.weekKey}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {winners.map((winner) => {
          const isGold = winner.rank === 1;
          const isSilver = winner.rank === 2;
          const badgeBg = isGold
            ? "bg-amber-400 text-amber-950 border-amber-500"
            : isSilver
            ? "bg-slate-300 text-slate-900 border-slate-400"
            : "bg-amber-600 text-amber-50 border-amber-700";

          return (
            <div
              key={`${winner.weekKey}-${winner.rank}`}
              className="flex items-center gap-3 bg-white/90 border border-amber-200/80 rounded-2xl p-2.5 px-3 shadow-xs"
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center font-black text-xs shrink-0 border ${badgeBg}`}
              >
                {winner.rank}
              </span>
              <Avatar className="h-9 w-9 border border-slate-200 shrink-0">
                <AvatarImage src={winner.userImageSrc} className="object-cover" />
                <AvatarFallback className="text-xs font-bold">
                  {winner.userName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-neutral-800 truncate">
                  {winner.userName}
                </p>
                <p className="text-[11px] font-extrabold text-amber-700">
                  {winner.points.toLocaleString("vi-VN")} KN
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
