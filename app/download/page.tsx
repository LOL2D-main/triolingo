import type { Metadata } from "next";

import { getAppReviews } from "@/actions/app-reviews";
import { DownloadStoreClient } from "@/components/download/download-store-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tải xuống Triolingo cho Windows, Android & iPhone (iOS) | Triolingo Store",
  description:
    "Tải xuống bộ cài đặt chính thức Triolingo (.exe) cho máy tính Windows 10/11, điện thoại Android và xem hướng dẫn tạo ứng dụng trên màn hình chính iPhone/iPad.",
  keywords: [
    "tải triolingo",
    "triolingo download",
    "triolingo pc",
    "triolingo windows exe",
    "triolingo android apk",
    "triolingo iphone ios",
    "ứng dụng học tiếng anh triolingo",
  ],
  openGraph: {
    title: "Tải xuống Triolingo - Ứng dụng học ngoại ngữ trên Máy tính & Điện thoại",
    description:
      "Bộ cài đặt chính thức cho Windows (.exe), Android và hướng dẫn cài đặt trên iPhone/iPad.",
    images: ["/screenshots/screen-learn.png"],
    type: "website",
  },
};

const DownloadPage = async () => {
  const reviews = await getAppReviews();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Triolingo",
    operatingSystem: "Windows 10, Windows 11, Android, iOS",
    applicationCategory: "EducationalApplication",
    softwareVersion: "1.0.1",
    fileSize: "114MB",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "VND",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue:
        reviews.length > 0
          ? (
              reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
            ).toFixed(1)
          : "4.9",
      ratingCount: Math.max(1, reviews.length),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DownloadStoreClient initialPlatform="overview" initialReviews={reviews} />
    </>
  );
};

export default DownloadPage;
