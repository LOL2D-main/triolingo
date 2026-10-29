"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/components/auth-provider";
import Banner from "@/components/banner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { links } from "@/config";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { user, isSignedIn, isLoaded, signOut } = useAuth();
  const [hideBanner, setHideBanner] = useState(true);

  return (
    <>
      <Banner hide={hideBanner} setHide={setHideBanner} />

      <header
        className={cn(
          "h-20 w-full border-b-2 border-slate-200 px-4",
          !hideBanner ? "mt-20 sm:mt-16 lg:mt-10" : "mt-0"
        )}
      >
        <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
          <Link
            href="/"
            className="flex items-center gap-x-3 pb-7 pl-4 pt-8"
            prefetch
          >
            <Image src="/mascot.svg" alt="Mascot" height={40} width={40} />

            <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
              TrioLingo
            </h1>
          </Link>

          <div className="flex items-center gap-x-3">
            {!isLoaded ? null : isSignedIn ? (
              <div className="flex items-center gap-x-3">
                <Link href="/learn" className="flex items-center gap-x-2">
                  <Avatar className="h-9 w-9 border border-green-500">
                    <AvatarImage src={user?.image || "/mascot.svg"} />
                    <AvatarFallback className="bg-green-100 font-bold text-green-700">
                      <Image
                        src="/mascot.svg"
                        alt="Avatar"
                        width={36}
                        height={36}
                        className="object-cover"
                      />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden font-bold text-neutral-700 sm:inline text-sm">
                    {user?.name}
                  </span>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={signOut}
                  className="text-neutral-500 hover:text-rose-500"
                  title="Đăng xuất"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Đăng xuất</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-x-2">
                <Link href="/sign-in">
                  <Button size="sm" variant="ghost">
                    Đăng nhập
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button size="sm" variant="secondary">
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
