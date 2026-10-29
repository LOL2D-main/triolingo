"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { useUpgradeModal } from "@/store/use-upgrade-modal";

export const HeartsModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = useHeartsModal();
  const { open: openUpgradeModal } = useUpgradeModal();

  useEffect(() => setIsClient(true), []);

  const onUpgrade = () => {
    close();
    openUpgradeModal();
  };

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image
              src="/mascot_bad.svg"
              alt="Mascot Bad"
              height={80}
              width={80}
            />
          </div>

          <DialogTitle className="text-center text-2xl font-bold">
            Cần thêm năng lượng?
          </DialogTitle>

          <DialogDescription className="text-center text-base">
            Nâng cấp gói Ultra để nhận năng lượng vô hạn, học không lo bị gián đoạn!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="super"
              className="w-full"
              size="lg"
              onClick={onUpgrade}
            >
              Nâng cấp gói Ultra
            </Button>

            <Button
              variant="ghost"
              className="w-full"
              size="lg"
              onClick={close}
            >
              Không, cảm ơn
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
