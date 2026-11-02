"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useRef, useState, useTransition } from "react";
import { toast } from "sonner";

import {
  type AppReviewItem,
  markReviewHelpful,
  submitAppReview,
} from "@/actions/app-reviews";
import {
  AndroidLogoSvg,
  AppleLogoSvg,
  IosStepIllustration,
  PlayStoreIconSvg,
  StarIconSvg,
  VerifiedBadgeSvg,
  WindowsLogoSvg,
} from "@/components/download/store-icons";

export type PlatformKey = "overview" | "windows" | "android" | "apple";

export const WINDOWS_EXE_DOWNLOAD_URL =
  "https://github.com/LOL2D-main/triolingo/releases/download/v1.0.1/Triolingo-Setup-1.0.1.exe";

export const ANDROID_APK_DOWNLOAD_URL =
  "https://github.com/LOL2D-main/triolingo/releases/download/v1.0.1/triolingo.apk";

const APP_SCREENSHOTS = [
  {
    src: "/screenshots/screen-home.png",
    title: "Trang chủ giới thiệu bên ngoài",
    subtitle: "Giao diện chào mừng và chọn ngôn ngữ bắt đầu học",
  },
  {
    src: "/screenshots/screen-login.png",
    title: "Giao diện Đăng nhập và Đăng ký",
    subtitle: "Hỗ trợ đăng nhập nhanh bằng tài khoản Google hoặc Email",
  },
  {
    src: "/screenshots/screen-learn.png",
    title: "Lộ trình bài học theo từng Chương",
    subtitle: "Hệ thống bài học trực quan chia theo từng cấp độ",
  },
  {
    src: "/screenshots/screen-lesson.png",
    title: "Bảng từ vựng trọng tâm trước bài học",
    subtitle: "Nghe phát âm chuẩn và xem ví dụ ngữ cảnh trước khi làm bài",
  },
  {
    src: "/screenshots/screen-quiz.png",
    title: "Hệ thống câu hỏi tương tác trong bài",
    subtitle: "Bài tập trắc nghiệm, luyện nghe và kiểm tra phản xạ từ vựng",
  },
  {
    src: "/screenshots/screen-quests.png",
    title: "Nhiệm vụ hằng ngày và Mở rương",
    subtitle: "Hoàn thành mục tiêu mỗi 24 giờ để mở rương nhận Đá quý",
  },
  {
    src: "/screenshots/screen-leaderboard.png",
    title: "Bảng xếp hạng Giải đấu Tuần",
    subtitle: "Đua top điểm kinh nghiệm (KN) cùng cộng đồng học viên mỗi 7 ngày",
  },
  {
    src: "/screenshots/screen-shop.png",
    title: "Cửa hàng vật phẩm và Năng lượng",
    subtitle: "Sử dụng Đá quý tích lũy để hồi phục năng lượng và nâng cấp Ultra",
  },
];

type Props = {
  initialPlatform?: PlatformKey;
  initialReviews: AppReviewItem[];
};

export const DownloadStoreClient = ({
  initialPlatform = "overview",
  initialReviews,
}: Props) => {
  const [activePlatform, setActivePlatform] =
    useState<PlatformKey>(initialPlatform);
  const [reviews, setReviews] = useState<AppReviewItem[]>(initialReviews);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Review form state (No login required)
  const [authorName, setAuthorName] = useState("");
  const [selectedStars, setSelectedStars] = useState<number>(5);
  const [hoverStars, setHoverStars] = useState<number>(0);
  const [reviewPlatform, setReviewPlatform] = useState<string>("Windows");
  const [comment, setComment] = useState("");
  const [helpfulClickedIds, setHelpfulClickedIds] = useState<number[]>([]);
  const [isPending, startTransition] = useTransition();

  const galleryRef = useRef<HTMLDivElement>(null);
  const platformDetailRef = useRef<HTMLDivElement>(null);

  const ratingStats = useMemo(() => {
    const total = reviews.length;
    if (total === 0) {
      return {
        avg: "5.0",
        total: 0,
        counts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>,
      };
    }
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;
    for (const r of reviews) {
      const star = Math.min(5, Math.max(1, Math.round(r.rating)));
      counts[star] = (counts[star] || 0) + 1;
      sum += star;
    }
    return {
      avg: (sum / total).toFixed(1),
      total,
      counts,
    };
  }, [reviews]);

  const handleSelectPlatform = (platform: PlatformKey) => {
    setActivePlatform(platform);
    if (platform !== "overview" && platformDetailRef.current) {
      setTimeout(() => {
        platformDetailRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 60);
    }
  };

  const scrollGallery = (direction: "left" | "right") => {
    if (!galleryRef.current) return;
    const offset = direction === "left" ? -420 : 420;
    galleryRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      toast.error("Vui lòng nhập họ và tên của bạn.");
      return;
    }
    if (!comment.trim() || comment.trim().length < 3) {
      toast.error("Vui lòng nhập nội dung đánh giá chi tiết hơn.");
      return;
    }

    startTransition(async () => {
      const res = await submitAppReview({
        authorName,
        rating: selectedStars,
        comment,
        platform: reviewPlatform,
      });

      if (res.error) {
        toast.error(res.error);
        return;
      }

      if (res.review) {
        setReviews((prev) => [res.review!, ...prev]);
        setAuthorName("");
        setComment("");
        setSelectedStars(5);
        toast.success("Cảm ơn bạn đã gửi đánh giá cho Triolingo!");
      }
    });
  };

  const handleHelpful = (id: number) => {
    if (helpfulClickedIds.includes(id)) return;
    setHelpfulClickedIds((prev) => [...prev, id]);
    setReviews((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
    markReviewHelpful(id);
  };

  return (
    <div className="min-h-screen bg-white text-[#202124]">
      {/* Top Google Play Store Header */}
      <header className="sticky top-0 z-30 border-b border-[#DADCE0] bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-8">
            <Link
              href="/download"
              onClick={() => setActivePlatform("overview")}
              className="flex items-center gap-2.5"
            >
              <PlayStoreIconSvg className="h-7 w-7" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-medium tracking-tight text-[#5F6368]">
                  Triolingo
                </span>
                <span className="text-xl font-normal text-[#5F6368]">Store</span>
              </div>
            </Link>

            <nav className="hidden items-center gap-1 md:flex">
              {[
                { key: "overview" as const, label: "Tổng quan" },
                { key: "windows" as const, label: "Windows" },
                { key: "android" as const, label: "Android" },
                { key: "apple" as const, label: "Apple iOS" },
              ].map((tab) => {
                const isActive = activePlatform === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => handleSelectPlatform(tab.key)}
                    className={`relative flex h-16 items-center px-4 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#01875F]"
                        : "text-[#5F6368] hover:text-[#202124]"
                    }`}
                  >
                    {tab.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-4 right-4 h-[3px] rounded-t-full bg-[#01875F]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-[#DADCE0] bg-white px-4 py-2 text-xs sm:text-sm font-medium text-[#01875F] transition-colors hover:bg-[#F8F9FA]"
            >
              Mở bản Web trực tiếp
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {/* App Store Hero Section */}
        <section className="flex flex-col-reverse items-start justify-between gap-8 border-b border-[#E8EAED] pb-10 md:flex-row md:items-center">
          <div className="w-full flex-1">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-[#E8EAED] bg-white p-2.5 shadow-sm sm:h-24 sm:w-24">
                <Image
                  src="/mascot.svg"
                  alt="Triolingo Logo"
                  width={80}
                  height={80}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-medium tracking-tight text-[#202124] sm:text-4xl">
                  Triolingo: Học Ngoại Ngữ
                </h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="text-sm font-medium text-[#01875F]">
                    Triolingo Education
                  </span>
                  <span className="text-xs text-[#5F6368]">•</span>
                  <span className="text-xs text-[#5F6368]">
                    Không chứa quảng cáo
                  </span>
                  <span className="text-xs text-[#5F6368]">•</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[#01875F]">
                    <VerifiedBadgeSvg className="h-3.5 w-3.5" />
                    Đã xác minh bảo mật
                  </span>
                </div>
              </div>
            </div>

            {/* Google Play Metrics Bar */}
            <div className="mt-7 flex flex-wrap items-center gap-6 sm:gap-8">
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-[#202124]">
                    {ratingStats.avg}
                  </span>
                  <StarIconSvg className="h-3.5 w-3.5" color="#202124" />
                </div>
                <span className="mt-0.5 text-xs text-[#5F6368]">
                  {ratingStats.total} bài đánh giá
                </span>
              </div>

              <div className="h-6 w-px bg-[#DADCE0]" />

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#202124]">
                  10N+
                </span>
                <span className="mt-0.5 text-xs text-[#5F6368]">
                  Lượt tải xuống
                </span>
              </div>

              <div className="h-6 w-px bg-[#DADCE0]" />

              <div className="flex flex-col">
                <span className="inline-flex w-fit items-center rounded border border-[#202124] px-1 py-0.2 text-[11px] font-bold leading-tight text-[#202124]">
                  3+
                </span>
                <span className="mt-0.5 text-xs text-[#5F6368]">
                  Mọi lứa tuổi
                </span>
              </div>

              <div className="h-6 w-px bg-[#DADCE0]" />

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-[#202124]">
                  v1.0.1
                </span>
                <span className="mt-0.5 text-xs text-[#5F6368]">
                  Phiên bản chính thức
                </span>
              </div>
            </div>

            {/* 3 Platform Selection Cards (Windows, Android, Apple) */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#5F6368]">
                Chọn nền tảng thiết bị của bạn để tải hoặc xem hướng dẫn cài đặt
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {/* Windows Card */}
                <button
                  type="button"
                  onClick={() => handleSelectPlatform("windows")}
                  className={`flex items-center gap-3.5 rounded-xl border p-4 text-left transition-colors ${
                    activePlatform === "windows"
                      ? "border-[#01875F] bg-[#E6F4EA]/60"
                      : "border-[#DADCE0] bg-white hover:bg-[#F8F9FA]"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E8EAED] bg-white">
                    <WindowsLogoSvg className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#202124]">
                      Windows PC
                    </p>
                    <p className="truncate text-xs text-[#01875F]">
                      Tải bộ cài .exe (114 MB)
                    </p>
                  </div>
                </button>

                {/* Android Card */}
                <button
                  type="button"
                  onClick={() => handleSelectPlatform("android")}
                  className={`flex items-center gap-3.5 rounded-xl border p-4 text-left transition-colors ${
                    activePlatform === "android"
                      ? "border-[#01875F] bg-[#E6F4EA]/60"
                      : "border-[#DADCE0] bg-white hover:bg-[#F8F9FA]"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E8EAED] bg-white">
                    <AndroidLogoSvg className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#202124]">
                      Android
                    </p>
                    <p className="truncate text-xs text-[#5F6368]">
                      Cài đặt APK & Hướng dẫn
                    </p>
                  </div>
                </button>

                {/* Apple Card */}
                <button
                  type="button"
                  onClick={() => handleSelectPlatform("apple")}
                  className={`flex items-center gap-3.5 rounded-xl border p-4 text-left transition-colors ${
                    activePlatform === "apple"
                      ? "border-[#01875F] bg-[#E6F4EA]/60"
                      : "border-[#DADCE0] bg-white hover:bg-[#F8F9FA]"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E8EAED] bg-white">
                    <AppleLogoSvg className="h-6 w-6 text-[#202124]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#202124]">
                      Apple iOS / iPadOS
                    </p>
                    <p className="truncate text-xs text-[#5F6368]">
                      Hướng dẫn tạo App iPhone
                    </p>
                  </div>
                </button>
              </div>

              {/* Primary Quick Action Bar */}
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <a
                  href={WINDOWS_EXE_DOWNLOAD_URL}
                  download="Triolingo-Setup-1.0.1.exe"
                  onClick={() => {
                    toast.success(
                      "Đang tải xuống bộ cài đặt Triolingo Setup 1.0.1.exe cho Windows..."
                    );
                  }}
                  className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#01875F] px-7 py-3 text-sm font-medium text-white transition-colors hover:bg-[#016848]"
                >
                  <WindowsLogoSvg className="h-4 w-4 brightness-200 contrast-200 invert" />
                  <span>Cài đặt cho Windows (.exe)</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleSelectPlatform("apple")}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DADCE0] bg-white px-5 py-3 text-sm font-medium text-[#202124] transition-colors hover:bg-[#F8F9FA]"
                >
                  <AppleLogoSvg className="h-4 w-4" />
                  <span>Hướng dẫn cho iPhone / iPad</span>
                </button>

                <a
                  href={ANDROID_APK_DOWNLOAD_URL}
                  download="triolingo.apk"
                  onClick={() => {
                    toast.success(
                      "Đang tải xuống bộ cài đặt triolingo.apk (10 MB) cho Android..."
                    );
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DADCE0] bg-white px-5 py-3 text-sm font-medium text-[#202124] transition-colors hover:bg-[#F8F9FA]"
                >
                  <AndroidLogoSvg className="h-4 w-4" />
                  <span>Tải cho Android (.apk)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Featured App Graphic Card */}
          <div className="hidden w-64 shrink-0 flex-col items-center rounded-2xl border border-[#E8EAED] bg-[#F8F9FA] p-6 text-center lg:flex">
            <div className="flex h-32 w-32 items-center justify-center rounded-3xl border border-[#E8EAED] bg-white p-4 shadow-sm">
              <Image
                src="/mascot.svg"
                alt="Triolingo App Icon"
                width={112}
                height={112}
                className="h-full w-full object-contain"
              />
            </div>
            <p className="mt-4 text-base font-semibold text-[#202124]">
              Triolingo Desktop & Mobile
            </p>
            <p className="mt-1 text-xs leading-relaxed text-[#5F6368]">
              Đồng bộ tài khoản, chuỗi ngày học (Streak), Đá quý và Bảng xếp hạng trên mọi thiết bị.
            </p>
          </div>
        </section>

        {/* Detailed Platform Section (Windows / Android / Apple) */}
        <section
          ref={platformDetailRef}
          className="mt-10 scroll-mt-20 rounded-2xl border border-[#DADCE0] bg-[#F8F9FA] p-6 sm:p-8"
        >
          {/* Platform Switcher Pills */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#DADCE0] pb-4">
            <div>
              <h2 className="text-lg font-medium text-[#202124] sm:text-xl">
                Chi tiết tải xuống và Hướng dẫn cài đặt theo thiết bị
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-[#5F6368]">
                Chọn đúng hệ điều hành của bạn bên dưới để xem hướng dẫn từng bước
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActivePlatform("windows")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  activePlatform === "windows" || activePlatform === "overview"
                    ? "bg-[#01875F] text-white"
                    : "border border-[#DADCE0] bg-white text-[#5F6368] hover:text-[#202124]"
                }`}
              >
                <WindowsLogoSvg className="h-3.5 w-3.5" />
                <span>Windows (.exe)</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePlatform("android")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  activePlatform === "android"
                    ? "bg-[#01875F] text-white"
                    : "border border-[#DADCE0] bg-white text-[#5F6368] hover:text-[#202124]"
                }`}
              >
                <AndroidLogoSvg className="h-3.5 w-3.5" />
                <span>Android</span>
              </button>

              <button
                type="button"
                onClick={() => setActivePlatform("apple")}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                  activePlatform === "apple"
                    ? "bg-[#01875F] text-white"
                    : "border border-[#DADCE0] bg-white text-[#5F6368] hover:text-[#202124]"
                }`}
              >
                <AppleLogoSvg className="h-3.5 w-3.5" />
                <span>Apple (iPhone / iPad)</span>
              </button>
            </div>
          </div>

          {/* WINDOWS PLATFORM DETAIL */}
          {(activePlatform === "windows" || activePlatform === "overview") && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#DADCE0] bg-white p-6 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E8EAED] bg-[#F8F9FA]">
                    <WindowsLogoSvg className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-[#202124]">
                        Triolingo cho Windows (64-bit)
                      </h3>
                      <span className="rounded bg-[#E6F4EA] px-2 py-0.5 text-xs font-medium text-[#01875F]">
                        Chính thức v1.0.1
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#5F6368]">
                      Bộ cài đặt chuẩn NSIS (`Triolingo-Setup-1.0.1.exe`). Tự động tạo biểu tượng ứng dụng ngoài màn hình Desktop và Start Menu.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5F6368]">
                      <span>Tên file: Triolingo-Setup-1.0.1.exe</span>
                      <span>•</span>
                      <span>Dung lượng: 114.7 MB</span>
                      <span>•</span>
                      <span>Hỗ trợ: Windows 10 / Windows 11</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  <a
                    href={WINDOWS_EXE_DOWNLOAD_URL}
                    download="Triolingo-Setup-1.0.1.exe"
                    onClick={() =>
                      toast.success(
                        "Bắt đầu tải xuống Triolingo-Setup-1.0.1.exe..."
                      )
                    }
                    className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#01875F] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#016848] md:w-auto"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <path
                        d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Tải xuống bản cài đặt (.exe)</span>
                  </a>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#202124]">
                  Hướng dẫn cài đặt trên máy tính Windows
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      step: "Bước 1",
                      title: "Tải file cài đặt .exe",
                      desc: "Nhấn vào nút Tải xuống bản cài đặt (.exe) phía trên để lưu file Triolingo-Setup-1.0.1.exe về máy tính.",
                    },
                    {
                      step: "Bước 2",
                      title: "Mở trình cài đặt",
                      desc: "Nhấp đúp chuột vào file Triolingo-Setup-1.0.1.exe vừa tải về. Nếu Windows SmartScreen hỏi, chọn More info rồi nhấn Run anyway.",
                    },
                    {
                      step: "Bước 3",
                      title: "Chọn thư mục & Cài đặt",
                      desc: "Chọn thư mục lưu ứng dụng (hoặc để mặc định) và nhấn Install. Trình cài đặt sẽ tự động tạo biểu tượng trên Desktop.",
                    },
                    {
                      step: "Bước 4",
                      title: "Mở từ màn hình chính",
                      desc: "Sau khi cài xong, biểu tượng chú cú xanh Triolingo sẽ xuất hiện ngay trên Desktop. Nhấp vào để học ngay như ứng dụng gốc.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex flex-col rounded-xl border border-[#DADCE0] bg-white p-4"
                    >
                      <span className="w-fit rounded bg-[#E6F4EA] px-2.5 py-0.5 text-xs font-bold text-[#01875F]">
                        {item.step}
                      </span>
                      <p className="mt-2.5 text-sm font-semibold text-[#202124]">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#5F6368]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ANDROID PLATFORM DETAIL */}
          {activePlatform === "android" && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#DADCE0] bg-white p-6 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E8EAED] bg-[#F8F9FA]">
                    <AndroidLogoSvg className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-[#202124]">
                        Triolingo cho điện thoại Android
                      </h3>
                      <span className="rounded bg-[#E6F4EA] px-2 py-0.5 text-xs font-medium text-[#01875F]">
                        Android 8.0 trở lên
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#5F6368]">
                      Giao diện tối ưu riêng cho màn hình cảm ứng điện thoại với thanh điều hướng nổi bên dưới.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#5F6368]">
                      <span>Định dạng: Bộ cài APK chính thức (10 MB)</span>
                      <span>•</span>
                      <span>Yêu cầu: Android 8.0+</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row md:shrink-0">
                  <a
                    href={ANDROID_APK_DOWNLOAD_URL}
                    download="triolingo.apk"
                    onClick={() =>
                      toast.success(
                        "Đang tải xuống bộ cài đặt triolingo.apk (10 MB)..."
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#01875F] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#016848]"
                  >
                    <AndroidLogoSvg className="h-4 w-4 brightness-200 invert" />
                    <span>Tải xuống cho Android (.apk)</span>
                  </a>
                  <a
                    href="/triolingo.apk"
                    download="triolingo.apk"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#DADCE0] bg-white px-4 py-3.5 text-xs font-medium text-[#5F6368] hover:text-[#202124]"
                  >
                    Link dự phòng
                  </a>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#202124]">
                  Hướng dẫn cài đặt trên điện thoại Android
                </h4>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      step: "Bước 1",
                      title: "Tải gói cài đặt APK",
                      desc: "Nhấn nút Tải xuống cho Android phía trên để tải file cài đặt về điện thoại của bạn.",
                    },
                    {
                      step: "Bước 2",
                      title: "Cho phép cài đặt",
                      desc: "Mở file APK vừa tải trên thanh thông báo. Nếu máy hỏi quyền, bật Cho phép cài đặt ứng dụng từ nguồn này.",
                    },
                    {
                      step: "Bước 3",
                      title: "Nhấn Cài đặt (Install)",
                      desc: "Chờ vài giây để hệ thống giải nén và tạo biểu tượng Triolingo trên màn hình chờ Android.",
                    },
                    {
                      step: "Bước 4",
                      title: "Hoặc thêm nhanh qua Chrome",
                      desc: "Bạn cũng có thể mở triolingo-web.vercel.app bằng Chrome, nhấn biểu tượng 3 chấm góc phải và chọn Thêm vào màn hình chính.",
                    },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className="flex flex-col rounded-xl border border-[#DADCE0] bg-white p-4"
                    >
                      <span className="w-fit rounded bg-[#E6F4EA] px-2.5 py-0.5 text-xs font-bold text-[#01875F]">
                        {item.step}
                      </span>
                      <p className="mt-2.5 text-sm font-semibold text-[#202124]">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#5F6368]">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APPLE iOS / iPadOS PLATFORM DETAIL (NO DOWNLOAD BUTTON, FULL VISUAL GUIDE) */}
          {activePlatform === "apple" && (
            <div className="space-y-6">
              <div className="flex flex-col justify-between gap-6 rounded-xl border border-[#DADCE0] bg-white p-6 md:flex-row md:items-center">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-[#E8EAED] bg-[#F8F9FA]">
                    <AppleLogoSvg className="h-8 w-8 text-[#202124]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-[#202124]">
                        Triolingo cho iPhone & iPad (iOS / iPadOS)
                      </h3>
                      <span className="rounded bg-[#E6F4EA] px-2 py-0.5 text-xs font-medium text-[#01875F]">
                        Tạo App trực tiếp trên Safari
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#5F6368]">
                      Trên iPhone và iPad, bạn không cần tải file cài đặt phức tạp. Chỉ với 3 thao tác trên trình duyệt Safari, bạn có thể tạo ngay ứng dụng Triolingo ngoài màn hình chính với logo chuẩn.
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    href="/"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#01875F] bg-[#E6F4EA] px-6 py-3 text-sm font-medium text-[#01875F] transition-colors hover:bg-[#CEEAD6] md:w-auto"
                  >
                    <span>Mở trang chính để thêm vào iPhone</span>
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#202124]">
                  Hướng dẫn chi tiết kèm hình minh họa tạo ứng dụng trên iPhone / iPad
                </h4>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex flex-col justify-between rounded-xl border border-[#DADCE0] bg-white p-4">
                    <div>
                      <span className="w-fit rounded bg-[#E6F4EA] px-2.5 py-0.5 text-xs font-bold text-[#01875F]">
                        Bước 1
                      </span>
                      <p className="mt-2.5 text-sm font-semibold text-[#202124]">
                        Mở bằng trình duyệt Safari
                      </p>
                      <p className="mt-1.5 mb-4 text-xs leading-relaxed text-[#5F6368]">
                        Trên iPhone hoặc iPad, mở trình duyệt <strong>Safari</strong> và truy cập địa chỉ <strong>triolingo-web.vercel.app</strong>, sau đó nhấn vào nút <strong>Chia sẻ (Share)</strong> ở chính giữa thanh công cụ phía dưới.
                      </p>
                    </div>
                    <IosStepIllustration step={1} />
                  </div>

                  <div className="flex flex-col justify-between rounded-xl border border-[#DADCE0] bg-white p-4">
                    <div>
                      <span className="w-fit rounded bg-[#E6F4EA] px-2.5 py-0.5 text-xs font-bold text-[#01875F]">
                        Bước 2
                      </span>
                      <p className="mt-2.5 text-sm font-semibold text-[#202124]">
                        Chọn Thêm vào Màn hình chính
                      </p>
                      <p className="mt-1.5 mb-4 text-xs leading-relaxed text-[#5F6368]">
                        Khi bảng tùy chọn hiện lên, bạn vuốt nhẹ xuống dưới và nhấn chọn dòng <strong>&ldquo;Thêm vào Màn hình chính&rdquo;</strong> (tiếng Anh là <strong>Add to Home Screen</strong> có biểu tượng dấu cộng).
                      </p>
                    </div>
                    <IosStepIllustration step={2} />
                  </div>

                  <div className="flex flex-col justify-between rounded-xl border border-[#DADCE0] bg-white p-4">
                    <div>
                      <span className="w-fit rounded bg-[#E6F4EA] px-2.5 py-0.5 text-xs font-bold text-[#01875F]">
                        Bước 3
                      </span>
                      <p className="mt-2.5 text-sm font-semibold text-[#202124]">
                        Nhấn xác nhận Thêm (Add)
                      </p>
                      <p className="mt-1.5 mb-4 text-xs leading-relaxed text-[#5F6368]">
                        Hệ thống sẽ tự động nhận diện tên ứng dụng là <strong>Triolingo</strong> kèm biểu tượng chú cú xanh. Bạn chỉ cần nhấn vào chữ <strong>&ldquo;Thêm&rdquo; (Add)</strong> ở góc trên cùng bên phải.
                      </p>
                    </div>
                    <IosStepIllustration step={3} />
                  </div>

                  <div className="flex flex-col justify-between rounded-xl border border-[#DADCE0] bg-white p-4">
                    <div>
                      <span className="w-fit rounded bg-[#E6F4EA] px-2.5 py-0.5 text-xs font-bold text-[#01875F]">
                        Bước 4
                      </span>
                      <p className="mt-2.5 text-sm font-semibold text-[#202124]">
                        Mở ứng dụng từ màn hình chính
                      </p>
                      <p className="mt-1.5 mb-4 text-xs leading-relaxed text-[#5F6368]">
                        Quay trở lại màn hình chính của iPhone, bạn sẽ thấy ngay ứng dụng <strong>Triolingo</strong>. Nhấn vào biểu tượng để học trực tiếp toàn màn hình y hệt ứng dụng tải từ App Store.
                      </p>
                    </div>
                    <IosStepIllustration step={4} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Real App Screenshots Carousel Section (Google Play Style) */}
        <section className="mt-12 border-b border-[#E8EAED] pb-12">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium text-[#202124] sm:text-xl">
                Hình ảnh giao diện thực tế trong ứng dụng
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-[#5F6368]">
                Ảnh chụp trực tiếp từ các phần bên ngoài, màn hình đăng nhập, bài học và câu hỏi trong Triolingo
              </p>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => scrollGallery("left")}
                aria-label="Cuộn sang trái"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DADCE0] bg-white text-[#5F6368] transition-colors hover:bg-[#F8F9FA] hover:text-[#202124]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollGallery("right")}
                aria-label="Cuộn sang phải"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DADCE0] bg-white text-[#5F6368] transition-colors hover:bg-[#F8F9FA] hover:text-[#202124]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div
            ref={galleryRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-thin"
          >
            {APP_SCREENSHOTS.map((shot, idx) => (
              <div
                key={shot.src}
                onClick={() => setLightboxIndex(idx)}
                className="group w-[310px] shrink-0 cursor-pointer overflow-hidden rounded-xl border border-[#DADCE0] bg-white transition-colors hover:border-[#01875F] sm:w-[380px]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F1F3F4]">
                  <img
                    src={shot.src}
                    alt={shot.title}
                    className="h-full w-full object-cover object-top"
                  />
                </div>
                <div className="border-t border-[#E8EAED] px-4 py-3">
                  <p className="text-sm font-medium text-[#202124] group-hover:text-[#01875F]">
                    {shot.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[#5F6368]">
                    {shot.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About This App Section (Using existing project SVG assets) */}
        <section className="mt-10 border-b border-[#E8EAED] pb-12">
          <h2 className="text-lg font-medium text-[#202124] sm:text-xl">
            Về ứng dụng này
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#5F6368]">
            Triolingo là nền tảng học ngoại ngữ tương tác hiện đại được thiết kế tối ưu cho cả máy tính (Windows Desktop) và thiết bị di động (Android, iPhone/iPad). Ứng dụng kết hợp lộ trình học tập khoa học theo từng chủ đề, hệ thống câu hỏi luyện nghe phát âm chuẩn xác, nhiệm vụ mở rương hằng ngày và bảng xếp hạng giải đấu theo tuần.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-start gap-3.5 rounded-xl border border-[#E8EAED] bg-white p-4">
              <Image
                src="/learn.svg"
                alt="Lộ trình học"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-[#202124]">
                  Lộ trình học bài bản
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#5F6368]">
                  Chia theo từng Chương và bài học từ cơ bản tới nâng cao kèm bảng từ vựng chi tiết.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-xl border border-[#E8EAED] bg-white p-4">
              <Image
                src="/quests.svg"
                alt="Nhiệm vụ hằng ngày"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-[#202124]">
                  Nhiệm vụ & Mở rương 24h
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#5F6368]">
                  Hệ thống 3 nhiệm vụ tự động làm mới sau mỗi 24 giờ với phần thưởng Rương Đồng, Hiếm và Mega.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-xl border border-[#E8EAED] bg-white p-4">
              <Image
                src="/leaderboard.svg"
                alt="Bảng xếp hạng tuần"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-[#202124]">
                  Bảng xếp hạng Tuần (7 ngày)
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#5F6368]">
                  Thi đua tích lũy điểm KN hằng tuần cùng bạn bè, tự động tổng kết và làm mới sau mỗi 7 ngày.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 rounded-xl border border-[#E8EAED] bg-white p-4">
              <Image
                src="/shop.svg"
                alt="Cửa hàng & Trio Ultra"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-[#202124]">
                  Cửa hàng & Gói Trio Ultra
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#5F6368]">
                  Đổi Đá quý lấy năng lượng hoặc nhập mã Key kích hoạt gói học không giới hạn Trio Ultra.
                </p>
              </div>
            </div>
          </div>

          {/* App Technical Specifications Grid */}
          <div className="mt-8 grid grid-cols-2 gap-6 rounded-xl border border-[#E8EAED] bg-[#F8F9FA] p-5 sm:grid-cols-4">
            <div>
              <p className="text-xs text-[#5F6368]">Phiên bản</p>
              <p className="mt-1 text-sm font-medium text-[#202124]">1.0.1</p>
            </div>
            <div>
              <p className="text-xs text-[#5F6368]">Cập nhật gần nhất</p>
              <p className="mt-1 text-sm font-medium text-[#202124]">
                Tháng 11, 2026
              </p>
            </div>
            <div>
              <p className="text-xs text-[#5F6368]">Yêu cầu hệ thống</p>
              <p className="mt-1 text-sm font-medium text-[#202124]">
                Windows 10/11, Android, iOS
              </p>
            </div>
            <div>
              <p className="text-xs text-[#5F6368]">Đơn vị phát triển</p>
              <p className="mt-1 text-sm font-medium text-[#202124]">
                Triolingo Team
              </p>
            </div>
          </div>
        </section>

        {/* Ratings and Reviews Section (Google Play Authentic Layout + No-Login Form) */}
        <section className="mt-12">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-[#202124] sm:text-xl">
              Xếp hạng và đánh giá
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-[#5F6368]">
              Điểm xếp hạng và bài đánh giá từ những người học đã tải và trải nghiệm Triolingo
            </p>
          </div>

          {/* Rating Histogram Overview */}
          <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E8EAED] bg-white p-6 md:grid-cols-12">
            <div className="flex flex-col items-center text-center md:col-span-4 md:items-start md:text-left">
              <span className="text-5xl font-normal tracking-tight text-[#202124] sm:text-6xl">
                {ratingStats.avg}
              </span>
              <div className="mt-2 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <StarIconSvg
                    key={s}
                    filled={s <= Math.round(Number(ratingStats.avg))}
                    className="h-4 w-4"
                  />
                ))}
              </div>
              <span className="mt-1.5 text-xs text-[#5F6368]">
                Dựa trên {ratingStats.total} bài đánh giá thực tế
              </span>
            </div>

            <div className="space-y-2 md:col-span-8">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingStats.counts[star] || 0;
                const pct =
                  ratingStats.total > 0
                    ? Math.round((count / ratingStats.total) * 100)
                    : 0;
                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-3 text-right text-xs font-medium text-[#202124]">
                      {star}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#E8EAED]">
                      <div
                        className="h-full rounded-full bg-[#01875F]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-xs text-[#5F6368]">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Write a Review Form (NO LOGIN REQUIRED) */}
          <div className="mt-8 rounded-2xl border border-[#DADCE0] bg-[#F8F9FA] p-6">
            <h3 className="text-base font-semibold text-[#202124]">
              Viết đánh giá của bạn
            </h3>
            <p className="mt-0.5 text-xs text-[#5F6368]">
              Không cần đăng nhập tài khoản. Chỉ cần nhập tên của bạn, chọn số sao và chia sẻ cảm nhận.
            </p>

            <form onSubmit={handleSubmitReview} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#202124]">
                    Họ và tên của bạn *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full rounded-lg border border-[#DADCE0] bg-white px-3.5 py-2.5 text-sm text-[#202124] outline-none transition-colors focus:border-[#01875F]"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#202124]">
                    Thiết bị đang sử dụng
                  </label>
                  <select
                    value={reviewPlatform}
                    onChange={(e) => setReviewPlatform(e.target.value)}
                    className="w-full rounded-lg border border-[#DADCE0] bg-white px-3.5 py-2.5 text-sm text-[#202124] outline-none transition-colors focus:border-[#01875F]"
                  >
                    <option value="Windows">Máy tính Windows (.exe)</option>
                    <option value="Android">Điện thoại Android</option>
                    <option value="Apple">iPhone / iPad (iOS)</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[#202124]">
                    Mức độ hài lòng ({selectedStars} / 5 sao)
                  </label>
                  <div className="flex h-[42px] items-center gap-1.5 rounded-lg border border-[#DADCE0] bg-white px-3.5">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const active = (hoverStars || selectedStars) >= star;
                      return (
                        <button
                          key={star}
                          type="button"
                          onMouseEnter={() => setHoverStars(star)}
                          onMouseLeave={() => setHoverStars(0)}
                          onClick={() => setSelectedStars(star)}
                          className="p-0.5 focus:outline-none"
                          aria-label={`${star} sao`}
                        >
                          <StarIconSvg
                            filled={active}
                            className="h-6 w-6"
                            color="#01875F"
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#202124]">
                  Nội dung đánh giá *
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={600}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Chia sẻ trải nghiệm của bạn sau khi cài đặt và học trên ứng dụng Triolingo..."
                  className="w-full rounded-lg border border-[#DADCE0] bg-white p-3.5 text-sm text-[#202124] outline-none transition-colors focus:border-[#01875F]"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-[#01875F] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#016848] disabled:opacity-60"
                >
                  {isPending ? "Đang gửi đánh giá..." : "Gửi đánh giá"}
                </button>
              </div>
            </form>
          </div>

          {/* Reviews List */}
          <div className="mt-8 space-y-6">
            {reviews.map((rev) => {
              const initials = rev.authorName
                .trim()
                .split(/\s+/)
                .slice(-2)
                .map((w) => w[0]?.toUpperCase() || "")
                .join("");

              return (
                <div
                  key={rev.id}
                  className="border-b border-[#E8EAED] pb-6 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#01875F] text-xs font-semibold text-white">
                        {initials || "HV"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#202124]">
                          {rev.authorName}
                        </p>
                        <span className="text-[11px] text-[#5F6368]">
                          Thiết bị: {rev.platform}
                        </span>
                      </div>
                    </div>

                    <span className="text-xs text-[#5F6368]">
                      {rev.createdAt}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIconSvg
                        key={s}
                        filled={s <= rev.rating}
                        className="h-3.5 w-3.5"
                      />
                    ))}
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-[#3C4043]">
                    {rev.comment}
                  </p>

                  <div className="mt-3 flex items-center gap-4 text-xs text-[#5F6368]">
                    <span>
                      {rev.helpfulCount > 0
                        ? `${rev.helpfulCount} người thấy bài đánh giá này hữu ích`
                        : "Bài đánh giá này có hữu ích không?"}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleHelpful(rev.id)}
                      disabled={helpfulClickedIds.includes(rev.id)}
                      className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-colors ${
                        helpfulClickedIds.includes(rev.id)
                          ? "border-[#01875F] bg-[#E6F4EA] text-[#01875F]"
                          : "border-[#DADCE0] bg-white text-[#5F6368] hover:bg-[#F8F9FA]"
                      }`}
                    >
                      {helpfulClickedIds.includes(rev.id)
                        ? "Đã đánh dấu hữu ích"
                        : "Có"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Clean Google Play Footer */}
      <footer className="mt-16 border-t border-[#DADCE0] bg-[#F8F9FA] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-[#5F6368] sm:flex-row sm:px-6">
          <div className="flex items-center gap-2">
            <Image src="/mascot.svg" alt="Triolingo" width={20} height={20} />
            <span className="font-medium text-[#202124]">
              Triolingo Download Store
            </span>
            <span>•</span>
            <span>Bản quyền © 2026 Triolingo Education</span>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              onClick={() => handleSelectPlatform("windows")}
              className="hover:text-[#202124]"
            >
              Windows PC (.exe)
            </button>
            <button
              type="button"
              onClick={() => handleSelectPlatform("android")}
              className="hover:text-[#202124]"
            >
              Android (.apk)
            </button>
            <button
              type="button"
              onClick={() => handleSelectPlatform("apple")}
              className="hover:text-[#202124]"
            >
              Apple iOS (Safari)
            </button>
            <Link href="/" className="hover:text-[#202124]">
              Trang chủ học tập
            </Link>
          </div>
        </div>
      </footer>

      {/* Screenshot Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#DADCE0] px-5 py-3">
              <div>
                <p className="text-sm font-semibold text-[#202124]">
                  {APP_SCREENSHOTS[lightboxIndex].title}
                </p>
                <p className="text-xs text-[#5F6368]">
                  {APP_SCREENSHOTS[lightboxIndex].subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                className="rounded-lg border border-[#DADCE0] px-3 py-1 text-xs font-medium text-[#202124] hover:bg-[#F8F9FA]"
              >
                Đóng
              </button>
            </div>
            <div className="bg-[#202124] p-2">
              <img
                src={APP_SCREENSHOTS[lightboxIndex].src}
                alt={APP_SCREENSHOTS[lightboxIndex].title}
                className="max-h-[78vh] w-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
