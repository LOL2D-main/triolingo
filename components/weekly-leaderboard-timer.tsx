"use client";

import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

function formatWeeklyRemaining(ms: number) {
  const totalMinutes = Math.max(1, Math.floor(ms / (1000 * 60)));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days} NGÀY ${hours} TIẾNG`;
  }
  if (hours > 0) {
    return `${hours} TIẾNG ${minutes} PHÚT`;
  }
  return `${minutes} PHÚT`;
}

export const WeeklyLeaderboardTimer = ({
  initialRemainingMs,
}: {
  initialRemainingMs: number;
}) => {
  const [remainingMs, setRemainingMs] = useState(initialRemainingMs);

  useEffect(() => {
    const startAt = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startAt;
      setRemainingMs(Math.max(0, initialRemainingMs - elapsed));
    }, 30_000);
    return () => clearInterval(interval);
  }, [initialRemainingMs]);

  return (
    <div className="mb-4 inline-flex items-center gap-x-2 rounded-2xl border-2 border-amber-200 bg-amber-50 px-3.5 py-2 text-xs sm:text-sm font-extrabold text-amber-600">
      <Clock className="h-4 w-4 shrink-0 stroke-[2.6]" />
      <span>
        Giải đấu Tuần (7 ngày) • Tự động đặt lại KN về 0 sau:{" "}
        <span className="font-black text-orange-600">
          {formatWeeklyRemaining(remainingMs)}
        </span>
      </span>
    </div>
  );
};

