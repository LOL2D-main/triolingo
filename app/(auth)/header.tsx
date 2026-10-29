"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/components/auth-provider";
import Banner from "@/components/banner";
import { GoogleIcon } from "@/components/google-icon";
import { Button } from "@/components/ui/button";
import { links } from "@/config";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isSignedIn, signInWithGoogle } = useAuth();
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
            prefetch
            className="flex items-center gap-x-3 pb-7 pl-4 pt-8"
          >
            <Image src="/mascot.svg" alt="Mascot" height={40} width={40} />

            <h1 className="text-2xl font-extrabold tracking-wide text-green-600">
              TrioLingo
            </h1>
          </Link>

          <div className="flex items-center gap-x-3">
            {!isSignedIn && (
              <Button
                size="default"
                variant="ghost"
                onClick={signInWithGoogle}
                className="flex items-center gap-x-2 font-bold text-neutral-700"
              >
                <GoogleIcon className="h-4 w-4" />
                Đăng nhập
              </Button>
            )}

            <Link
              href={links.sourceCode}
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 text-neutral-500 hover:opacity-75"
            >
              <Image
                src="/github.svg"
                alt="Source Code"
                height={20}
                width={20}
              />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};
