import { Clock, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type ResultCardProps = {
  value: string | number;
  variant: "points" | "accuracy" | "speed";
};

export const ResultCard = ({ value, variant }: ResultCardProps) => {
  const title =
    variant === "points"
      ? "TỔNG ĐIỂM KN"
      : variant === "accuracy"
      ? "TỶ LỆ ĐÚNG"
      : "CỰC NHANH";

  return (
    <div
      className={cn(
        "flex flex-col w-full rounded-2xl border-2 overflow-hidden shadow-sm bg-white transition hover:scale-105",
        variant === "points" && "border-amber-400",
        variant === "accuracy" && "border-green-500",
        variant === "speed" && "border-sky-400"
      )}
    >
      <div
        className={cn(
          "py-1.5 px-2 text-center text-[11px] lg:text-xs font-black uppercase text-white tracking-wider",
          variant === "points" && "bg-amber-400",
          variant === "accuracy" && "bg-green-500",
          variant === "speed" && "bg-sky-400"
        )}
      >
        {title}
      </div>

      <div className="flex flex-1 items-center justify-center gap-x-2 py-5 px-3 text-lg lg:text-xl font-black">
        {variant === "points" && (
          <Zap className="h-6 w-6 fill-amber-400 text-amber-500 stroke-[2.5]" />
        )}
        {variant === "accuracy" && (
          <Target className="h-6 w-6 text-green-500 stroke-[2.5]" />
        )}
        {variant === "speed" && (
          <Clock className="h-6 w-6 text-sky-500 stroke-[2.5]" />
        )}

        <span
          className={cn(
            variant === "points" && "text-neutral-800",
            variant === "accuracy" && "text-green-600",
            variant === "speed" && "text-sky-500"
          )}
        >
          {value}
        </span>
      </div>
    </div>
  );
};
