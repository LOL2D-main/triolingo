"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
  lessonId,
  correctAnswer,
}: FooterProps) => {
  const router = useRouter();

  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn(
        "h-[100px] border-t-2 lg:h-[140px]",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="flex items-center text-base font-bold text-green-500 lg:text-2xl">
            <CheckCircle className="mr-4 h-6 w-6 lg:h-10 lg:w-10" />
            Làm tốt lắm!
          </div>
        )}

        {status === "wrong" && (
          <div className="flex flex-col gap-1.5 text-rose-600 max-w-[70%]">
            <div className="flex items-center text-xl font-black text-rose-600 lg:text-3xl tracking-tight">
              <XCircle className="mr-3 h-7 w-7 shrink-0 lg:h-9 lg:w-9" />
              Sai rồi!
            </div>
            {correctAnswer && (
              <div className="text-base font-semibold text-neutral-800 lg:text-lg pl-10 lg:pl-12">
                <span className="font-bold text-rose-700">Đáp án đúng: </span>
                <span className="font-extrabold text-neutral-900 bg-white px-3 py-1 rounded-xl border border-rose-300 shadow-sm inline-block">
                  {correctAnswer}
                </span>
              </div>
            )}
          </div>
        )}

        {status === "completed" && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            onClick={() => router.push(`/lesson/${lessonId}`)}
          >
            Luyện tập lại
          </Button>
        )}

        <Button
          disabled={disabled}
          aria-disabled={disabled}
          className={cn(
            "ml-auto",
            disabled &&
              "border-slate-200 bg-slate-200 text-slate-400 opacity-100 disabled:opacity-100"
          )}
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {status === "none" && "Kiểm tra"}
          {status === "correct" && "Tiếp tục"}
          {status === "wrong" && "Tiếp tục"}
          {status === "completed" && "Tiếp tục"}
        </Button>
      </div>
    </footer>
  );
};
