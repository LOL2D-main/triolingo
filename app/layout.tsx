import { AuthProvider } from "@/components/auth-provider";
import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";

import { BannerModal } from "@/components/modals/banner-modal";
import { ChestOpenModal } from "@/components/modals/chest-open-modal";
import { EnergyModal } from "@/components/modals/energy-modal";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { StreakModal } from "@/components/modals/streak-modal";
import { UpgradeModal } from "@/components/modals/upgrade-modal";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config";

import "./globals.css";

const font = Nunito({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#22C55E",
};

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="vi">
        <body className={font.className}>
          <Toaster theme="light" richColors closeButton />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          <EnergyModal />
          <UpgradeModal />
          <ChestOpenModal />
          <StreakModal />
          <BannerModal />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
