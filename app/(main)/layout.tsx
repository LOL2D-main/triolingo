import type { PropsWithChildren } from "react";

import { MobileBottomBar } from "@/components/mobile-bottom-bar";
import { MobileHeader } from "@/components/mobile-header";
import { Sidebar } from "@/components/sidebar";
import { getUserProgress, getUserSubscription } from "@/db/queries";

const MainLayout = async ({ children }: PropsWithChildren) => {
  const [userProgress, userSubscription] = await Promise.all([
    getUserProgress(),
    getUserSubscription(),
  ]);

  const isPro = !!userSubscription?.isActive;

  return (
    <>
      <MobileHeader userProgress={userProgress} isPro={isPro} />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[58px] pb-24 lg:pb-0 lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-4 lg:pt-6">
          {children}
        </div>
      </main>
      <MobileBottomBar />
    </>
  );
};

export default MainLayout;
