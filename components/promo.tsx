"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useUpgradeModal } from "@/store/use-upgrade-modal";

export const Promo = () => {
  const { open } = useUpgradeModal();

  return (
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="space-y-2">
        <div className="flex items-center gap-x-2">
          <Image
            src="/enery_ultra.png"
            alt="Ultra"
            height={26}
            width={38}
            className="object-contain"
          />

          <h3 className="text-lg font-bold">Nâng cấp lên Ultra</h3>
        </div>

        <p className="text-muted-foreground">
          Năng lượng vô hạn, học không lo gián đoạn!
        </p>
      </div>

      <Button
        variant="super"
        className="w-full text-base font-bold"
        size="lg"
        onClick={open}
      >
        Nâng cấp ngay
      </Button>
    </div>
  );
};
