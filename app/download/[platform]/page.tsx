import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getAppReviews } from "@/actions/app-reviews";
import {
  DownloadStoreClient,
  type PlatformKey,
} from "@/components/download/download-store-client";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ platform: string }>;
};

const VALID_PLATFORMS: Record<string, { key: PlatformKey; title: string; desc: string }> = {
  windows: {
    key: "windows",
    title: "Tải Triolingo cho Windows (.exe) - Bộ cài đặt Máy tính chính thức",
    desc: "Tải xuống file cài đặt Triolingo-Setup-1.0.1.exe cho máy tính Windows 10/11 (64-bit). Tự động tạo biểu tượng ngoài màn hình Desktop.",
  },
  android: {
    key: "android",
    title: "Tải Triolingo cho Android (.apk) - Bản cài đặt chính thức 10 MB",
    desc: "Tải xuống file cài đặt triolingo.apk chính thức cho điện thoại và máy tính bảng Android (8.0+).",
  },
  apple: {
    key: "apple",
    title: "Hướng dẫn cài đặt Triolingo trên iPhone & iPad (iOS)",
    desc: "Hướng dẫn chi tiết từng bước cách thêm ứng dụng Triolingo vào màn hình chính iPhone và iPad thông qua trình duyệt Safari.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { platform } = await params;
  const info = VALID_PLATFORMS[platform.toLowerCase()];
  if (!info) {
    return { title: "Tải xuống Triolingo" };
  }
  return {
    title: info.title,
    description: info.desc,
    openGraph: {
      title: info.title,
      description: info.desc,
      images: ["/screenshots/screen-learn.png"],
    },
  };
}

const PlatformDownloadPage = async ({ params }: Props) => {
  const { platform } = await params;
  const info = VALID_PLATFORMS[platform.toLowerCase()];
  if (!info) {
    notFound();
  }

  const reviews = await getAppReviews();

  return (
    <DownloadStoreClient
      initialPlatform={info.key}
      initialReviews={reviews}
    />
  );
};

export default PlatformDownloadPage;
