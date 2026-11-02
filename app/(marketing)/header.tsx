"use client";

import { useState } from "react";
import { Download, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/components/auth-provider";
import Banner from "@/components/banner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { user, isSignedIn, isLoaded, signOut } = useAuth();
  const [hideBanner, setHideBanner] = useState(true);

  return (
    <>
      <Banner hide={hideBanner} setHide={setHideBanner} />

      <header
        className={cn(
          "h-20 w-full border-b-2 border-slate-200 px-3 sm:px-6",
          !hideBanner ? "mt-20 sm:mt-16 lg:mt-10" : "mt-0"
        )}
      >
        <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
          {/* Logo brand: trên mobile chỉ hiển thị icon logo tròn trịa để không bị trèn/chèn chữ, trên màn hình lớn hiển thị đầy đủ icon + chữ TrioLingo */}
          <Link
            href="/"
            className="flex items-center gap-x-2 sm:gap-x-3 shrink-0"
            prefetch
          >
            <Image
              src="/mascot.svg"
              alt="TrioLingo"
              height={40}
              width={40}
              className="h-9 w-9 sm:h-10 sm:w-10 shrink-0"
            />

            <h1 className="hidden sm:inline text-xl sm:text-2xl font-extrabold tracking-wide text-green-600 shrink-0">
              TrioLingo
            </h1>
          </Link>

          <div className="flex items-center gap-x-1.5 sm:gap-x-3 shrink-0">
            {/* Nút Tải ứng dụng: trên mobile dùng nhãn gọn 'Tải app' + icon tải xuống, trên sm+ hiển thị 'Tải ứng dụng' */}
            <Link href="/download">
              <Button
                size="sm"
                variant="primaryOutline"
                className="h-9 px-2.5 sm:px-3.5 text-xs sm:text-sm font-bold flex items-center gap-1.5 shrink-0"
              >
                <Download className="h-4 w-4 shrink-0 text-sky-600" />
                <span className="hidden sm:inline">Tải ứng dụng</span>
                <span className="sm:hidden">Tải app</span>
              </Button>
            </Link>

            {!isLoaded ? null : isSignedIn ? (
              <div className="flex items-center gap-x-2 sm:gap-x-3 shrink-0">
                <Link href="/learn" className="flex items-center gap-x-2">
                  <Avatar className="h-8 w-8 sm:h-9 sm:w-9 border border-green-500">
                    <AvatarImage src={user?.image || "/mascot.svg"} />
                    <AvatarFallback className="bg-green-100 font-bold text-green-700">
                      <Image
                        src="/mascot.svg"
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden font-bold text-neutral-700 sm:inline text-sm truncate max-w-[120px]">
                    {user?.name}
                  </span>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={signOut}
                  className="h-8 sm:h-9 px-2 sm:px-3 text-neutral-500 hover:text-rose-500 shrink-0"
                  title="Đăng xuất"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1 text-xs sm:text-sm">Đăng xuất</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-x-1.5 sm:gap-x-2 shrink-0">
                <Link href="/sign-in">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-9 px-2.5 sm:px-3.5 text-xs sm:text-sm font-bold shrink-0"
                  >
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/sign-up" className="hidden sm:inline-flex">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-9 px-3.5 text-sm font-bold shrink-0"
                  >
                    Bắt đầu ngay
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
