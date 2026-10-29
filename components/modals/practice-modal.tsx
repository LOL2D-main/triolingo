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
import { usePracticeModal } from "@/store/use-practice-modal";

export const PracticeModal = () => {
  const [isClient, setIsClient] = useState(false);
  const { isOpen, close } = usePracticeModal();

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="mb-5 flex w-full items-center justify-center">
            <Image
              src="/gem.png"
              alt="Gem"
              height={80}
              width={80}
              className="object-contain"
            />
          </div>

          <DialogTitle className="text-center text-2xl font-bold text-neutral-800">
            Bài học luyện tập
          </DialogTitle>

          <DialogDescription className="text-center text-base text-neutral-600">
            Luyện tập lại bài học để củng cố kiến thức và kiếm thêm điểm kinh nghiệm (KN) leo bảng xếp hạng!
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mb-4">
          <div className="flex w-full flex-col gap-y-4">
            <Button
              variant="primary"
              className="w-full"
              size="lg"
              onClick={close}
            >
              Tôi đã hiểu
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
