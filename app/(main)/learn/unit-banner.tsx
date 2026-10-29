import { NotebookText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type UnitBannerProps = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: UnitBannerProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-green-500 p-4 sm:p-5 text-white shadow-sm">
      <div className="space-y-1 sm:space-y-2 min-w-0 flex-1 pr-2">
        <h3 className="text-xl sm:text-2xl font-black tracking-tight break-words">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-green-50 break-words leading-snug">
          {description}
        </p>
      </div>

      <Link href="/lesson" prefetch>
        <Button
          size="lg"
          variant="secondary"
          className="hidden border-2 border-b-4 active:border-b-2 xl:flex shrink-0"
        >
          <NotebookText className="mr-2" />
          Tiếp tục
        </Button>
      </Link>
    </div>
  );
};
