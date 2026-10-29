"use client";

import { useState, useTransition } from "react";
import { Gift, Check } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { claimDailyFreeChest } from "@/actions/user-progress";
import { useChestModal } from "@/store/use-chest-modal";

type DailyGiftButtonProps = {
  isClaimedToday: boolean;
  className?: string;
};

export const DailyGiftButton = ({
  isClaimedToday = false,
  className = "",
}: DailyGiftButtonProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [claimed, setClaimed] = useState(isClaimedToday);
  const { open: openChestModal } = useChestModal();

  const handleClaim = () => {
    if (claimed) {
      toast.info("Bạn đã nhận quà hôm nay rồi. Quay lại vào ngày mai nhé!");
      return;
    }

    startTransition(async () => {
      try {
        const res = await claimDailyFreeChest();
        if (res.success && res.rewardGems) {
          setClaimed(true);
          openChestModal({
            tier: "wood",
            rewardGems: res.rewardGems,
            title: "Quà mỗi ngày - Rương Đồng",
            description: "Chúc mừng bạn nhận được rương quà đăng nhập hôm nay!",
          });
          router.refresh();
        } else if (res.error) {
          toast.error(res.error);
        }
      } catch {
        toast.error("Không thể nhận quà lúc này.");
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClaim}
      disabled={isPending}
      className={`inline-flex items-center gap-x-2 rounded-full border px-4 py-2 text-sm font-extrabold shadow-sm transition-all active:scale-95 ${
        claimed
          ? "border-amber-200/70 bg-[#FFF9F2] text-amber-700/60 cursor-default"
          : "border-[#FBD38D] bg-[#FFF5EA] text-[#C05621] hover:bg-[#FFEEDB] hover:shadow"
      } ${className}`}
    >
      {claimed ? (
        <Check className="h-4 w-4 text-emerald-600" />
      ) : (
        <Gift className="h-4 w-4 text-[#C05621]" />
      )}
      <span>{claimed ? "QUÀ MỖI NGÀY (ĐÃ NHẬN)" : "QUÀ MỖI NGÀY"}</span>
    </button>
  );
};
