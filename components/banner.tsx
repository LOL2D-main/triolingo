"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { XIcon } from "lucide-react";

type BannerProps = {
  hide: boolean;
  setHide: Dispatch<SetStateAction<boolean>>;
};

const BANNER_KEY = "hide-lingo-banner";

const Banner = ({ hide, setHide }: BannerProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const hideBanner = localStorage.getItem(BANNER_KEY);

    if (hideBanner) return;

    setHide(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBannerClose = () => {
    setHide(true);
    localStorage.setItem(BANNER_KEY, "1");
  };

  if (hide || isScrolled) return null;

  return (
    <div
      id="sticky-banner"
      className="fixed left-0 top-0 z-50 block min-h-[48px] sm:h-16 lg:h-10 w-full bg-secondary p-2 sm:p-2.5 opacity-[0.98] shadow-md"
    >
      <div className="relative mx-auto flex w-full max-w-screen-lg items-center justify-center pr-8 sm:pr-0">
        <p className="text-xs sm:text-sm font-normal text-center leading-snug">
          <strong className="font-semibold">
            Chào mừng bạn đến với TrioLingo!
          </strong>{" "}
          <span className="hidden xs:inline sm:inline">
            Nền tảng học Tiếng Anh tương tác vui nhộn và hiệu quả.
          </span>
        </p>

        <button
          data-dismiss-target="#sticky-banner"
          onClick={handleBannerClose}
          type="button"
          className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full border border-gray-300 bg-white p-1 opacity-80 hover:opacity-90"
          title="Đóng thông báo"
        >
          <XIcon className="size-3.5" strokeWidth={3} />
          <span className="sr-only">Close banner</span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
