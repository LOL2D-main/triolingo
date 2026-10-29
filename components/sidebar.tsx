"use client";

import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/components/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ADMIN_AVATAR, ADMIN_EMAIL, ADMIN_USER_ID } from "@/lib/admin-constants";
import { cn } from "@/lib/utils";

import { SidebarItem } from "./sidebar-item";

type SidebarProps = {
  className?: string;
};

export const Sidebar = ({ className }: SidebarProps) => {
  const { user, signOut } = useAuth();
  const isAdmin =
    user?.userId === ADMIN_USER_ID ||
    user?.email?.toLowerCase() === ADMIN_EMAIL;

  return (
    <div
      className={cn(
        "left-0 top-0 flex h-full flex-col border-r-2 px-4 lg:fixed lg:w-[256px]",
        className
      )}
    >
      <Link href="/learn" prefetch>
        <div className="flex items-center gap-x-3 pb-7 pl-4 pt-8">
          <Image src="/mascot.svg" alt="Mascot" height={40} width={40} />

          <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
            TrioLingo
          </h1>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-y-2">
        <SidebarItem label="Học tập" href="/learn" iconSrc="/learn.svg" />
        <SidebarItem
          label="Xếp hạng"
          href="/leaderboard"
          iconSrc="/leaderboard.svg"
        />
        <SidebarItem label="Nhiệm vụ" href="/quests" iconSrc="/quests.svg" />
        <SidebarItem label="Cửa hàng" href="/shop" iconSrc="/shop.svg" />
        <SidebarItem label="Cài đặt" href="/settings" iconSrc="/settings.svg" />
        {isAdmin && (
          <SidebarItem
            label="Quản trị"
            href="/admin"
            iconSrc={ADMIN_AVATAR}
          />
        )}
      </div>

      <div className="border-t-2 p-4">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-3 overflow-hidden">
              <Avatar
                className={cn(
                  "h-9 w-9 shrink-0 border",
                  isAdmin ? "border-amber-500" : "border-green-500"
                )}
              >
                <AvatarImage
                  src={isAdmin ? ADMIN_AVATAR : user.image || "/mascot.svg"}
                />
                <AvatarFallback className="bg-green-100 font-bold text-green-700">
                  <Image
                    src={isAdmin ? ADMIN_AVATAR : "/mascot.svg"}
                    alt="Avatar"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </AvatarFallback>
              </Avatar>
              <div className="truncate">
                <p className="truncate text-sm font-bold text-neutral-700">
                  {user.name}
                </p>
                <p className="truncate text-xs text-neutral-500">
                  {user.email}
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={signOut}
              className="p-1.5 text-neutral-400 hover:text-rose-500"
              title="Đăng xuất"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Link href="/">
            <Button variant="ghost" size="sm" className="w-full">
              Đăng nhập
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
