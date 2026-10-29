"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FooterProps = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
  correctAnswer?: string | null;
};

export const Footer = ({
  onCheck,
  status,
  disabled,
  correctAnswer,
}: FooterProps) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn(
        "h-[88px] sm:h-[100px] border-t-2 lg:h-[130px] pb-[env(safe-area-inset-bottom)] transition-colors",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between px-3 sm:px-6 lg:px-10 gap-x-2">
        {status === "correct" && (
          <div className="flex items-center text-sm sm:text-base font-extrabold text-green-600 lg:text-2xl">
            <CheckCircle className="mr-2 sm:mr-3 h-5 w-5 sm:h-7 sm:w-7 shrink-0" />
            Làm tốt lắm!
          </div>
        )}

        {status === "wrong" && (
          <div className="flex flex-col gap-0.5 sm:gap-1 text-rose-600 max-w-[62%] sm:max-w-[70%]">
            <div className="flex items-center text-sm sm:text-lg font-black text-rose-600 tracking-tight lg:text-2xl">
              <XCircle className="mr-1.5 sm:mr-2.5 h-5 w-5 sm:h-6 sm:w-6 shrink-0" />
              Sai rồi!
            </div>
            {correctAnswer && (
              <p className="text-[11px] sm:text-xs lg:text-sm font-semibold text-rose-700 line-clamp-2 break-words">
                Đáp án: <span className="font-extrabold">{correctAnswer}</span>
              </p>
            )}
          </div>
        )}

        {status === "completed" && <div />}
        {status === "none" && <div />}

        <Button
          disabled={disabled}
          className="ml-auto font-black shrink-0 px-4 sm:px-8 text-xs sm:text-sm h-10 sm:h-12"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Kiểm tra"}
          {status === "correct" && "Tiếp tục"}
          {status === "wrong" && "Tiếp tục"}
          {status === "completed" && "Hoàn thành"}
        </Button>
      </div>
    </footer>
  );
};
