"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Flame, Gift, Lock, Sparkles } from "lucide-react";

import { claimStreakMilestone } from "@/actions/user-progress";
import { FlameIcon } from "@/components/flame-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getFlameTier,
  getFlameTierDetails,
  isStreakLitToday,
  STREAK_MILESTONES,
} from "@/lib/streak";
import { useStreakModal } from "@/store/use-streak-modal";

export const StreakModal = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, close, streakCount, lastStreakDate, claimedMilestones } =
    useStreakModal();

  const [localClaimed, setLocalClaimed] = useState<number[]>([]);

  const isLit = isStreakLitToday(lastStreakDate);
  const tier = getFlameTier(streakCount, isLit);
  const details = getFlameTierDetails(tier);

  const allClaimed = Array.from(
    new Set([...claimedMilestones, ...localClaimed])
  );

  const onClaimMilestone = (days: number) => {
    startTransition(async () => {
      try {
        const res = await claimStreakMilestone(days);
        if (res.success && res.rewardGems) {
          toast.success(`Nhận thành công +${res.rewardGems} Đá quý! 💎`);
          setLocalClaimed((prev) => [...prev, days]);
          router.refresh();
        } else if (res.error) {
          toast.error(res.error);
        }
      } catch {
        toast.error("Không thể nhận thưởng lúc này.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader className="flex flex-col items-center justify-center text-center">
          <div className="relative mb-3 flex items-center justify-center">
            <FlameIcon tier={tier} size={68} />
          </div>

          <DialogTitle className="text-2xl font-extrabold text-neutral-800">
            Chuỗi {streakCount} ngày
          </DialogTitle>

          <DialogDescription className="mt-1 text-sm font-medium text-neutral-600">
            {details.description}
          </DialogDescription>
        </DialogHeader>

        {/* Thong tin cap do ngon lua */}
        <div
          className={`flex items-center justify-between rounded-xl border p-3 ${details.borderColor} ${details.bgLight}`}
        >
          <div className="flex items-center gap-x-2.5">
            <Flame className={`h-5 w-5 ${details.textColor}`} />
            <div>
              <p className={`text-xs font-bold uppercase tracking-wider ${details.textColor}`}>
                Cấp độ ngọn lửa
              </p>
              <p className="text-sm font-extrabold text-neutral-800">
                {details.name}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
              isLit ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"
            }`}
          >
            {isLit ? "Đã thắp hôm nay" : "Chưa thắp"}
          </span>
        </div>

        {/* Danh sach moc thuong chuoi */}
        <div className="mt-2">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="flex items-center gap-x-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500">
              <Gift className="h-3.5 w-3.5 text-orange-500" />
              Mốc thưởng chuỗi
            </h4>
            <span className="text-xs text-neutral-400">
              Mốc: 7, 14, 28, 50, 100, 200, 300, 500
            </span>
          </div>

          <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
            {STREAK_MILESTONES.map((m) => {
              const isAchieved = streakCount >= m.days;
              const isClaimed = allClaimed.includes(m.days);

              return (
                <div
                  key={m.days}
                  className={`flex items-center justify-between rounded-xl border p-2.5 transition-colors ${
                    isClaimed
                      ? "border-slate-200 bg-slate-50 opacity-75"
                      : isAchieved
                      ? "border-orange-300 bg-orange-50/60"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="flex items-center gap-x-2.5">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg font-extrabold text-xs ${
                        isClaimed
                          ? "bg-emerald-100 text-emerald-700"
                          : isAchieved
                          ? "bg-orange-500 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {isClaimed ? (
                        <Check className="h-4 w-4" />
                      ) : isAchieved ? (
                        <Sparkles className="h-4 w-4" />
                      ) : (
                        <Lock className="h-3.5 w-3.5" />
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-bold text-neutral-800">
                        {m.label}
                      </p>
                      <p className="flex items-center gap-x-1 text-[11px] font-semibold text-sky-600">
                        <Image src="/gem.png" alt="Gem" width={12} height={12} />
                        +{m.rewardGems} Đá quý
                      </p>
                    </div>
                  </div>

                  {isClaimed ? (
                    <span className="text-xs font-bold text-slate-400">
                      Đã nhận
                    </span>
                  ) : isAchieved ? (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={isPending}
                      onClick={() => onClaimMilestone(m.days)}
                      className="h-7 px-3 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600"
                    >
                      Nhận quà
                    </Button>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400">
                      {streakCount}/{m.days} ngày
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-y-2">
          {!isLit && (
            <Button
              variant="primary"
              className="w-full font-bold"
              onClick={() => {
                close();
                router.push("/learn");
              }}
            >
              Học 1 bài để thắp chuỗi ngay
            </Button>
          )}
          <Button variant="ghost" className="w-full text-xs text-neutral-500" onClick={close}>
            Đóng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
