"use client";

import Image from "next/image";
import { useUpgradeModal } from "@/store/use-upgrade-modal";

export const VerticalBanner = () => {
  const { open } = useUpgradeModal();

  return (
    <div
      onClick={open}
      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-2 shadow-sm transition hover:border-sky-300 hover:shadow-md active:scale-[0.99]"
      title="Nâng cấp gói Trio Ultra"
    >
      <div className="relative aspect-[1122/1402] w-full overflow-hidden rounded-xl bg-slate-100">
        <Image
          src="/banner-doc.png"
          alt="Banner TrioLingo"
          fill
          sizes="(max-width: 1024px) 100vw, 368px"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority
        />
      </div>
    </div>
  );
};

