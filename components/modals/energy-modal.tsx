"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEnergyModal } from "@/store/use-energy-modal";
import { useUpgradeModal } from "@/store/use-upgrade-modal";

export const EnergyModal = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useEnergyModal();
  const { open: openUpgradeModal } = useUpgradeModal();

  useEffect(() => setIsClient(true), []);

  const onReturnHome = () => {
    close();
    router.push("/learn");
  };

  const onUpgradeUltra = () => {
    close();
    openUpgradeModal();
  };

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-3 flex w-full flex-col items-center justify-center gap-y-3">
            <Image
              src="/mascot_bad.svg"
              alt="Mascot hết năng lượng"
              height={88}
              width={88}
            />
            <div className="flex items-center gap-x-1.5 text-lg font-extrabold text-pink-500">
              <Image
                src="/energy.png"
                alt="Năng lượng"
                width={30}
                height={18}
                className="block h-[18px] w-[30px] object-contain"
              />
              0
            </div>
          </div>

          <DialogTitle className="text-center text-2xl font-bold text-neutral-800">
            Bạn đã hết năng lượng!
          </DialogTitle>

          <DialogDescription className="text-center text-base text-neutral-600">
            Mỗi câu trả lời tốn <span className="font-bold text-pink-500">1 năng lượng</span>.
            Mỗi ngày bạn có sẵn <span className="font-bold text-pink-500">20 năng lượng</span>,
            được làm đầy lại vào lúc <span className="font-bold text-neutral-800">00:00</span> (giờ Việt Nam).
            <br />
            <span className="mt-2 block text-xs text-neutral-500">
              Nâng cấp gói Ultra để học tập thoải mái mà không bị giới hạn năng lượng!
            </span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-3">
            <Button
              variant="super"
              className="w-full flex items-center justify-center gap-x-2"
              size="lg"
              onClick={onUpgradeUltra}
            >
              <Image
                src="/enery_ultra.png"
                alt="Ultra"
                width={28}
                height={18}
                className="object-contain"
              />
              Nâng cấp gói Ultra (Vô hạn)
            </Button>

            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={onReturnHome}
            >
              Về trang học tập
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
