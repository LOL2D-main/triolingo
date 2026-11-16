"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/components/auth-provider";
import { ADMIN_AVATAR, ADMIN_EMAIL, ADMIN_USER_ID } from "@/lib/admin-constants";

export const MobileBottomBar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAdmin =
    user?.userId === ADMIN_USER_ID ||
    user?.email?.toLowerCase() === ADMIN_EMAIL;
  const profileAvatar = isAdmin ? ADMIN_AVATAR : user?.image || "/mascot.svg";

  const navItems = [
    {
      href: "/practice",
      label: "Luyện tập",
      icon: "/practice.svg",
      match: ["/practice"],
    },
    {
      href: "/leaderboard",
      label: "Xếp hạng",
      icon: "/leaderboard.svg",
      match: ["/leaderboard"],
    },
    {
      href: "/learn",
      label: "Học tập",
      icon: "/learn.svg",
      isCenter: true,
      match: ["/learn", "/courses"],
    },
    {
      href: "/quests",
      label: "Nhiệm vụ",
      icon: "/quests.svg",
      match: ["/quests"],
    },
    {
      href: "/shop",
      label: "Cửa hàng",
      icon: "/shop.svg",
      match: ["/shop"],
    },
    {
      href: "/profile",
      label: "Hồ sơ",
      icon: profileAvatar,
      isRounded: true,
      match: ["/profile", "/settings"],
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-[64px] items-center justify-around border-t-2 border-slate-200 bg-white/95 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      {navItems.map((item) => {
        const isActive = item.match.some((route) => pathname.startsWith(route));

        if (item.isCenter) {
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              className="relative -top-3.5 flex flex-col items-center justify-center px-1 focus:outline-none"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl border-4 transition-all active:scale-95 ${
                  isActive
                    ? "border-green-400 bg-green-500 shadow-[0_6px_16px_rgba(34,197,94,0.45)] scale-105"
                    : "border-slate-200 bg-white shadow-md hover:border-green-300 hover:bg-green-50"
                }`}
              >
                <Image
                  src={item.icon}
                  alt={item.label}
                  height={28}
                  width={28}
                  className={`transition-transform ${
                    isActive ? "brightness-0 invert scale-105" : ""
                  }`}
                />
              </div>

              <span
                className={`mt-0.5 text-[9px] font-black tracking-tight whitespace-nowrap ${
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
            className="flex flex-1 min-w-0 flex-col items-center justify-center py-1 focus:outline-none"
          >
            <div
              className={`flex h-8 w-10 items-center justify-center rounded-xl transition-all ${
                isActive
                  ? "border-2 border-sky-300 bg-sky-50 shadow-xs"
                  : "hover:bg-slate-100/70"
              }`}
            >
              <Image
                src={item.icon}
                alt={item.label}
                height={22}
                width={22}
                className={
                  item.isRounded
                    ? "h-6 w-6 rounded-full border border-slate-200 object-cover"
                    : "h-[22px] w-[22px] object-contain"
                }
              />
            </div>

            <span
              className={`mt-0.5 text-[9px] font-bold whitespace-nowrap truncate max-w-full ${
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
