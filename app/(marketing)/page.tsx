"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader } from "lucide-react";

import { useAuth } from "@/components/auth-provider";

export default function MarketingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <div className="mx-auto flex w-full max-w-[988px] flex-1 flex-col items-center justify-center gap-2 p-4 lg:flex-row">
      <div className="relative mb-8 h-[240px] w-[240px] lg:mb-0 lg:h-[424px] lg:w-[424px]">
        <Image src="/hero.svg" alt="Hero" fill priority />
      </div>

      <div className="flex flex-col items-center gap-y-8">
        <h1 className="max-w-[480px] text-center text-xl font-bold text-neutral-600 lg:text-3xl">
          Học tập, luyện tập và làm chủ Tiếng Anh cùng TrioLingo.
        </h1>

        <div className="flex w-full max-w-[330px] flex-col items-center gap-y-3">
          {!isLoaded ? (
            <div className="flex h-12 w-full items-center justify-center">
              <Loader className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : isSignedIn ? (
            <Link
              href="/learn"
              prefetch
              className="flex w-full items-center justify-center gap-x-2 rounded-full border-b-4 border-green-600 bg-green-500 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-lg shadow-green-500/30 transition hover:bg-green-400 active:translate-y-0.5 active:border-b-0"
            >
              Tiếp tục học
              <ArrowRight className="h-5 w-5" />
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="flex w-full items-center justify-center gap-x-2 rounded-full border-b-4 border-green-600 bg-green-500 py-4 text-base font-extrabold uppercase tracking-wide text-white shadow-lg shadow-green-500/30 transition hover:-translate-y-0.5 hover:bg-green-400 active:translate-y-0 active:border-b-0"
            >
              Trải nghiệm ngay
              <ArrowRight className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
