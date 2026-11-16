"use client";

import { useState, useTransition } from "react";
import {
  ChevronRight,
  Pencil,
  Search,
  Settings,
  UserCheck,
  UserPlus,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

import { searchLearners, toggleFollowUser } from "@/actions/social";
import { FlameIcon } from "@/components/flame-icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getFlameTier, isStreakLitToday } from "@/lib/streak";
import { cn } from "@/lib/utils";

type SocialUser = {
  userId: string;
  userName: string;
  userImageSrc: string;
  points: number;
  isFollowingBack?: boolean;
};

type ProfileClientProps = {
  user: {
    userId: string;
    userName: string;
    userImageSrc: string;
    userEmail: string;
    points: number;
    streakCount: number;
    lastStreakDate: string;
    createdAtIso: string;
    activeCourseTitle: string;
    activeCourseImage: string;
  };
  isPro: boolean;
  top3Count: number;
  completedLessonsCount: number;
  initialFollowing: SocialUser[];
  initialFollowers: SocialUser[];
  initialFollowingIds: string[];
  discoverUsers: SocialUser[];
};

function formatJoinDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "Đã tham gia TrioLingo";
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  return `Đã tham gia Tháng ${month} năm ${year}`;
}

function computeLeague(points: number): {
  name: string;
  color: string;
  bg: string;
} {
  if (points >= 1000) {
    return { name: "Kim Cương", color: "#0ea5e9", bg: "#e0f2fe" };
  }
  if (points >= 400) {
    return { name: "Thạch Anh Tím", color: "#9333ea", bg: "#f3e8ff" };
  }
  if (points >= 150) {
    return { name: "Giải Vàng", color: "#eab308", bg: "#fef9c3" };
  }
  if (points >= 50) {
    return { name: "Giải Bạc", color: "#64748b", bg: "#f1f5f9" };
  }
  return { name: "Giải Đồng", color: "#d97706", bg: "#fef3c7" };
}

function computeStepTarget(value: number, steps: number[]): {
  level: number;
  target: number;
} {
  for (let i = 0; i < steps.length; i++) {
    if (value < steps[i]) {
      return { level: i + 1, target: steps[i] };
    }
  }
  return {
    level: steps.length,
    target: steps[steps.length - 1],
  };
}

export const ProfileMain = ({
  user,
  isPro,
  top3Count,
  completedLessonsCount,
  followingCount,
  followersCount,
}: {
  user: ProfileClientProps["user"];
  isPro: boolean;
  top3Count: number;
  completedLessonsCount: number;
  followingCount: number;
  followersCount: number;
}) => {
  const [showAllAchievements, setShowAllAchievements] = useState(false);

  const isLit = isStreakLitToday(user.lastStreakDate);
  const flameTier = getFlameTier(user.streakCount, isLit);
  const league = computeLeague(user.points);

  const handleTag = user.userEmail
    ? user.userEmail.split("@")[0]
    : user.userId.slice(0, 12);

  const streakTier = computeStepTarget(user.streakCount, [
    3, 7, 14, 30, 60, 100, 125, 200, 365,
  ]);
  const xpTier = computeStepTarget(user.points, [
    50, 150, 300, 600, 1200, 2500, 5000, 10000, 20000,
  ]);
  const top3Tier = computeStepTarget(top3Count, [1, 2, 3, 5, 10, 20]);
  const lessonTier = computeStepTarget(completedLessonsCount, [
    1, 5, 10, 20, 35, 50, 75, 100,
  ]);

  const achievements = [
    {
      id: "streak",
      title: "Lửa rừng",
      level: streakTier.level,
      current: user.streakCount,
      target: streakTier.target,
      subtitle: `Đạt chuỗi ${streakTier.target} ngày streak`,
      bgColor: "#ff4b4b",
      icon: <FlameIcon tier="red" size={32} />,
    },
    {
      id: "xp",
      title: "Cao nhân",
      level: xpTier.level,
      current: user.points,
      target: xpTier.target,
      subtitle: `Kiếm đủ ${xpTier.target.toLocaleString("vi-VN")} KN`,
      bgColor: "#58cc02",
      icon: (
        <Image
          src="/assets/mascot-cube.png"
          alt="Cao nhân"
          width={38}
          height={38}
          className="h-9 w-9 object-contain"
        />
      ),
    },
    {
      id: "top3",
      title: "Quán quân",
      level: top3Tier.level,
      current: top3Count,
      target: top3Tier.target,
      subtitle: `Đạt Top 3 bảng xếp hạng tuần`,
      bgColor: "#ce82ff",
      icon: (
        <svg viewBox="0 0 36 36" fill="none" className="h-9 w-9">
          <circle cx="18" cy="18" r="11" fill="#FFC800" />
          <circle cx="18" cy="18" r="7" fill="#FFE066" />
          <rect x="14" y="5" width="8" height="4" rx="1.5" fill="#F59E0B" />
        </svg>
      ),
    },
    {
      id: "lessons",
      title: "Học giả",
      level: lessonTier.level,
      current: completedLessonsCount,
      target: lessonTier.target,
      subtitle: `Hoàn thành ${lessonTier.target} bài học`,
      bgColor: "#1cb0f6",
      icon: (
        <Image
          src="/assets/practice-vocab.png"
          alt="Học giả"
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
      ),
    },
  ];

  const visibleAchievements = showAllAchievements
    ? achievements
    : achievements.slice(0, 3);

  const onShareProfile = async () => {
    const shareText = `Hồ sơ TrioLingo của ${user.userName}: ${user.points.toLocaleString("vi-VN")} điểm KN, chuỗi ${user.streakCount} ngày, ${league.name}!`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "TrioLingo - Hồ sơ học tập",
          text: shareText,
          url: window.location.origin,
        });
        return;
      } catch {
        // User cancelled share
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(
        `${shareText} ${window.location.origin}`
      );
      toast.success("Đã sao chép thông tin chia sẻ hồ sơ!");
    }
  };

  return (
    <div className="w-full pb-12">
      {/* Anh bia & Avatar lon (giong anh 2) */}
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#e5e7eb] sm:h-52">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-sm sm:h-40 sm:w-40">
          <img
            src={user.userImageSrc || "/mascot.svg"}
            alt={user.userName}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute right-3 top-3 flex items-center gap-2">
          <Link
            href="/settings"
            title="Chỉnh sửa hồ sơ & ảnh đại diện"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-slate-600 transition hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Thong tin ca nhan */}
      <div className="mt-4 flex items-start justify-between gap-3 border-b-2 border-slate-200 pb-5">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="truncate text-2xl font-black text-neutral-800">
              {user.userName}
            </h1>
            {isPro && (
              <Image
                src="/assets/super-badge.png"
                alt="Ultra"
                width={66}
                height={18}
                className="h-5 w-auto object-contain"
              />
            )}
          </div>
          <p className="mt-0.5 text-sm font-semibold text-neutral-400">
            @{handleTag}
          </p>
          <p className="mt-1.5 text-sm font-medium text-neutral-500">
            {formatJoinDate(user.createdAtIso)}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-extrabold text-[#1cb0f6]">
            <span>Đang theo dõi {followingCount}</span>
            <span>{followersCount} Người theo dõi</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Image
            src={user.activeCourseImage}
            alt={user.activeCourseTitle}
            width={34}
            height={24}
            className="h-6 w-9 rounded border border-slate-200 object-cover"
            title={user.activeCourseTitle}
          />
          <Link
            href="/settings"
            title="Cài đặt tài khoản & âm thanh"
            className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50"
          >
            <Settings className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Banner chia se ho so (giong banner xanh nhat o anh 2) */}
      <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-[#dff4ff] p-4 sm:p-5">
        <div className="flex-1 space-y-3">
          <p className="text-sm font-black leading-snug text-neutral-800 sm:text-lg">
            Chia sẻ thành tích học Tiếng Anh TrioLingo của bạn!
          </p>
          <Button
            type="button"
            onClick={onShareProfile}
            className="h-10 rounded-2xl border-b-4 border-[#0e86c7] bg-[#1cb0f6] px-6 text-xs font-black uppercase tracking-wider text-white hover:bg-[#15a0e0] active:border-b-2 sm:text-sm"
          >
            CHIA SẺ HỒ SƠ
          </Button>
        </div>

        <div className="shrink-0">
          <Image
            src="/assets/mascot-cube.png"
            alt="TrioLingo"
            width={92}
            height={92}
            className="h-20 w-20 object-contain sm:h-24 sm:w-24"
          />
        </div>
      </div>

      {/* Muc Thong ke (Grid 2x2 giong anh 2) */}
      <h2 className="mt-8 mb-3 text-xl font-black text-neutral-800 sm:text-2xl">
        Thống kê
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {/* 1. Ngay streak */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-3.5 sm:p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center">
            <FlameIcon tier={flameTier} size={28} />
          </div>
          <div className="min-w-0">
            <p className="text-lg font-black text-neutral-800">
              {user.streakCount}
            </p>
            <p className="truncate text-xs font-medium text-neutral-500">
              Ngày streak
            </p>
          </div>
        </div>

        {/* 2. Tong diem KN */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-3.5 sm:p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center">
            <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
              <path
                d="M18 3L7 17.5H15.5L13.5 29L25 14H16.5L18 3Z"
                fill="#FFC800"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-black text-neutral-800">
              {user.points.toLocaleString("vi-VN")}
            </p>
            <p className="truncate text-xs font-medium text-neutral-500">
              Tổng điểm KN
            </p>
          </div>
        </div>

        {/* 3. Giai dau hien tai */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-3.5 sm:p-4">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: league.bg }}
          >
            <svg viewBox="0 0 28 28" fill="none" className="h-6 w-6">
              <path
                d="M6 6C6 4.9 6.9 4 8 4H20C21.1 4 22 4.9 22 6V14.5C22 19.3 18.5 23.3 14 24.5C9.5 23.3 6 19.3 6 14.5V6Z"
                fill={league.color}
              />
              <path
                d="M10 11L14 8L18 11L16.5 17H11.5L10 11Z"
                fill="white"
                fillOpacity="0.85"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="truncate text-base font-black text-neutral-800 sm:text-lg">
              {league.name}
            </p>
            <p className="truncate text-xs font-medium text-neutral-500">
              Giải đấu hiện tại
            </p>
          </div>
        </div>

        {/* 4. So lan dat top 3 */}
        <div className="flex items-center gap-3 rounded-2xl border-2 border-slate-200 bg-white p-3.5 sm:p-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center">
            <svg viewBox="0 0 32 32" fill="none" className="h-7 w-7">
              <circle cx="16" cy="18" r="9" fill="#FFC800" />
              <circle cx="16" cy="18" r="5.5" fill="#FFE066" />
              <path d="M11 4H21L19 10H13L11 4Z" fill="#1CB0F6" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-lg font-black text-neutral-800">{top3Count}</p>
            <p className="truncate text-xs font-medium text-neutral-500">
              Số lần đạt top 3
            </p>
          </div>
        </div>
      </div>

      {/* Muc Thanh tich (giong anh 2) */}
      <div className="mt-8 mb-3 flex items-center justify-between">
        <h2 className="text-xl font-black text-neutral-800 sm:text-2xl">
          Thành tích
        </h2>
        <button
          type="button"
          onClick={() => setShowAllAchievements((v) => !v)}
          className="text-xs font-black uppercase tracking-wide text-[#1cb0f6] hover:underline"
        >
          {showAllAchievements ? "THU GỌN" : "XEM TẤT CẢ"}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white divide-y-2 divide-slate-200">
        {visibleAchievements.map((item) => {
          const pct = Math.min(
            100,
            Math.round((item.current / Math.max(1, item.target)) * 100)
          );
          return (
            <div key={item.id} className="flex items-center gap-4 p-4 sm:p-5">
              <div
                className="flex h-20 w-16 shrink-0 flex-col items-center justify-between rounded-xl py-2 text-white"
                style={{ backgroundColor: item.bgColor }}
              >
                <div className="flex flex-1 items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-wide">
                  CẤP {item.level}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-black text-neutral-800">
                    {item.title}
                  </h3>
                  <span className="text-xs font-bold text-neutral-400">
                    {item.current.toLocaleString("vi-VN")}/
                    {item.target.toLocaleString("vi-VN")}
                  </span>
                </div>

                <div className="my-2 h-3.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#ffc800] transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <p className="text-xs font-medium text-neutral-500 sm:text-sm">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const ProfileSidebarSocial = ({
  initialFollowing,
  initialFollowers,
  initialFollowingIds,
  discoverUsers,
}: {
  initialFollowing: SocialUser[];
  initialFollowers: SocialUser[];
  initialFollowingIds: string[];
  discoverUsers: SocialUser[];
}) => {
  const [activeTab, setActiveTab] = useState<"following" | "followers">(
    "following"
  );
  const [showAllList, setShowAllList] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] =
    useState<SocialUser[]>(discoverUsers);
  const [followingIds, setFollowingIds] = useState<string[]>(
    initialFollowingIds
  );
  const [followingList, setFollowingList] =
    useState<SocialUser[]>(initialFollowing);
  const [pending, startTransition] = useTransition();

  const currentList =
    activeTab === "following" ? followingList : initialFollowers;
  const visibleList = showAllList ? currentList : currentList.slice(0, 3);
  const remainingCount = Math.max(0, currentList.length - 3);

  const handleToggleFollow = (targetUser: SocialUser) => {
    startTransition(async () => {
      try {
        const res = await toggleFollowUser(targetUser.userId);
        if (res.following) {
          setFollowingIds((prev) =>
            prev.includes(targetUser.userId)
              ? prev
              : [...prev, targetUser.userId]
          );
          setFollowingList((prev) =>
            prev.some((u) => u.userId === targetUser.userId)
              ? prev
              : [targetUser, ...prev]
          );
          toast.success(`Đã theo dõi ${targetUser.userName}`);
        } else {
          setFollowingIds((prev) =>
            prev.filter((id) => id !== targetUser.userId)
          );
          setFollowingList((prev) =>
            prev.filter((u) => u.userId !== targetUser.userId)
          );
          toast.info(`Đã hủy theo dõi ${targetUser.userName}`);
        }
      } catch {
        toast.error("Không thể cập nhật trạng thái theo dõi.");
      }
    });
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    startTransition(async () => {
      try {
        const rows = await searchLearners(q);
        setSearchResults(rows);
      } catch {
        // ignore transient search error
      }
    });
  };

  const handleInvite = async () => {
    const url =
      typeof window !== "undefined"
        ? window.location.origin
        : "https://triolingo-web.vercel.app";
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(
        `Cùng mình học Tiếng Anh trên TrioLingo nhé! ${url}`
      );
      toast.success("Đã sao chép liên kết mời bạn bè!");
    }
  };

  return (
    <div className="space-y-5">
      {/* The Dang theo doi / Nguoi theo doi */}
      <div className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white">
        <div className="grid grid-cols-2 border-b-2 border-slate-200">
          <button
            type="button"
            onClick={() => {
              setActiveTab("following");
              setShowAllList(false);
            }}
            className={cn(
              "py-3.5 text-center text-xs font-black uppercase tracking-wide transition",
              activeTab === "following"
                ? "border-b-2 border-[#1cb0f6] text-[#1cb0f6] -mb-[2px]"
                : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            ĐANG THEO DÕI
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("followers");
              setShowAllList(false);
            }}
            className={cn(
              "py-3.5 text-center text-xs font-black uppercase tracking-wide transition",
              activeTab === "followers"
                ? "border-b-2 border-[#1cb0f6] text-[#1cb0f6] -mb-[2px]"
                : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            NGƯỜI THEO DÕI
          </button>
        </div>

        <div className="p-4">
          {visibleList.length === 0 ? (
            <div className="py-5 text-center">
              <p className="text-sm font-bold text-neutral-500">
                {activeTab === "following"
                  ? "Bạn chưa theo dõi học viên nào."
                  : "Chưa có ai theo dõi bạn."}
              </p>
              <Button
                type="button"
                variant="primaryOutline"
                size="sm"
                className="mt-3 border-2 border-slate-200 text-xs font-extrabold"
                onClick={() => setIsSearchOpen(true)}
              >
                Tìm bạn bè ngay
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {visibleList.map((person) => (
                <div
                  key={person.userId}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="h-11 w-11 shrink-0 border-2 border-green-500 bg-green-50">
                      <AvatarImage
                        src={person.userImageSrc || "/mascot.svg"}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-green-100 font-bold text-green-700">
                        {person.userName.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-extrabold text-neutral-800">
                        {person.userName}
                      </p>
                      <p className="text-xs font-bold text-neutral-400">
                        {person.points.toLocaleString("vi-VN")} KN
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {remainingCount > 0 && !showAllList && (
          <button
            type="button"
            onClick={() => setShowAllList(true)}
            className="flex w-full items-center justify-between border-t-2 border-slate-200 px-4 py-3 text-sm font-extrabold text-neutral-600 hover:bg-slate-50"
          >
            <span>Xem thêm {remainingCount} người khác</span>
            <ChevronRight className="h-4 w-4 text-neutral-400" />
          </button>
        )}
      </div>

      {/* The Them ban be */}
      <div className="rounded-2xl border-2 border-slate-200 bg-white p-4">
        <h3 className="mb-3 text-lg font-black text-neutral-800">
          Thêm bạn bè
        </h3>

        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex w-full items-center justify-between rounded-xl p-2 text-left transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-500">
                <Search className="h-5 w-5" />
              </div>
              <span className="text-sm font-extrabold text-neutral-700">
                Tìm bạn bè
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-neutral-400" />
          </button>

          <button
            type="button"
            onClick={handleInvite}
            className="flex w-full items-center justify-between rounded-xl p-2 text-left transition hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50">
                <Image
                  src="/mascot.svg"
                  alt="Mời bạn bè"
                  width={26}
                  height={26}
                  className="object-contain"
                />
              </div>
              <span className="text-sm font-extrabold text-neutral-700">
                Mời bạn bè
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-neutral-400" />
          </button>
        </div>
      </div>

      {/* Modal Tim ban be */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-neutral-800">
              Tìm bạn bè trên TrioLingo
            </DialogTitle>
            <DialogDescription>
              Tìm kiếm và kết nối với những học viên khác để cùng đua top mỗi
              tuần.
            </DialogDescription>
          </DialogHeader>

          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Nhập tên học viên..."
              className="w-full rounded-xl border-2 border-slate-200 py-2.5 pl-9 pr-4 text-sm font-medium text-neutral-800 focus:border-[#1cb0f6] focus:outline-none"
            />
          </div>

          <div className="mt-3 max-h-80 space-y-2 overflow-y-auto pr-1">
            {searchResults.length === 0 ? (
              <p className="py-6 text-center text-sm text-neutral-500">
                Không tìm thấy học viên phù hợp.
              </p>
            ) : (
              searchResults.map((learner) => {
                const isFollowing = followingIds.includes(learner.userId);
                return (
                  <div
                    key={learner.userId}
                    className="flex items-center justify-between rounded-xl border border-slate-200 p-2.5"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="h-10 w-10 shrink-0 border border-slate-200">
                        <AvatarImage
                          src={learner.userImageSrc || "/mascot.svg"}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-green-100 text-xs font-bold text-green-700">
                          {learner.userName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-extrabold text-neutral-800">
                          {learner.userName}
                        </p>
                        <p className="text-xs font-bold text-neutral-400">
                          {learner.points.toLocaleString("vi-VN")} KN
                        </p>
                      </div>
                    </div>

                    <Button
                      type="button"
                      size="sm"
                      disabled={pending}
                      variant={isFollowing ? "default" : "primary"}
                      onClick={() => handleToggleFollow(learner)}
                      className="shrink-0 gap-1.5 text-xs font-black"
                    >
                      {isFollowing ? (
                        <>
                          <UserCheck className="h-3.5 w-3.5" />
                          Đang theo dõi
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-3.5 w-3.5" />
                          Theo dõi
                        </>
                      )}
                    </Button>
                  </div>
                );
              })
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
