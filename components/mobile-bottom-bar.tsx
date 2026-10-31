"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    href: "/quests",
    label: "Nhiệm vụ",
    icon: "/quests.svg",
    match: ["/quests"],
  },
  {
    href: "/leaderboard",
    label: "Xếp hạng",
    icon: "/leaderboard.svg",
    match: ["/leaderboard"],
  },
  {
    href: "/learn",
    label: "Trang chủ",
    icon: "/learn.svg",
    isCenter: true,
    match: ["/learn", "/courses"],
  },
  {
    href: "/shop",
    label: "Cửa hàng",
    icon: "/shop.svg",
    match: ["/shop"],
  },
  {
    href: "/settings",
    label: "Tài khoản",
    icon: "/settings.svg",
    match: ["/settings"],
  },
];

export const MobileBottomBar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[64px] items-center justify-around border-t-2 border-slate-200 bg-white/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = item.match.some((route) => pathname.startsWith(route));

        if (item.isCenter) {
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className="relative -top-4 flex flex-col items-center justify-center focus:outline-none"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl border-4 transition-all active:scale-95 ${
                  isActive
                    ? "border-green-400 bg-green-500 shadow-[0_6px_16px_rgba(34,197,94,0.45)] scale-105"
                    : "border-slate-200 bg-white shadow-md hover:border-green-300 hover:bg-green-50"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  height={32}
                  width={32}
                  className={`transition-transform ${
                    isActive ? "brightness-0 invert scale-110" : ""
                  }`}
                />
              </div>

              <span
                className={`mt-1 text-[10px] font-black tracking-tight ${
                  isActive ? "text-green-600" : "text-neutral-500"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        }

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className="flex flex-1 flex-col items-center justify-center py-1 focus:outline-none"
          >
            <div
              className={`flex h-9 w-12 items-center justify-center rounded-xl transition-all ${
                isActive
                  ? "border-2 border-sky-300 bg-sky-50 shadow-sm"
                  : "hover:bg-slate-100/70"
              }`}
            >
              <Image
                src={item.icon}
                alt={item.label}
                height={26}
                width={26}
                className="object-contain"
              />
            </div>

            <span
              className={`mt-0.5 text-[10px] font-bold ${
                isActive ? "text-sky-600" : "text-neutral-500"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

