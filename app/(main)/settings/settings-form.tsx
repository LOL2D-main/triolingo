"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Eye, EyeOff, RotateCcw } from "lucide-react";
import { toast } from "sonner";

import { updateUserProfile } from "@/actions/user-progress";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { userProgress } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useSettings } from "@/store/use-settings";

const AVATAR_PRESETS = [
  { name: "Cú Trio", src: "/mascot.svg" },
  { name: "Cậu bé", src: "/boy.svg" },
  { name: "Cô gái", src: "/girl.svg" },
  { name: "Đàn ông", src: "/man.svg" },
  { name: "Phụ nữ", src: "/woman.svg" },
  { name: "Người máy", src: "/robot.svg" },
  { name: "Zombie", src: "/zombie.svg" },
];

type SettingsFormProps = {
  initialProgress: typeof userProgress.$inferSelect | null;
};

export const SettingsForm = ({ initialProgress }: SettingsFormProps) => {
  const { user, changePassword, resetPassword, updateProfileData } = useAuth();

  // Settings store
  const {
    soundEffects,
    volume,
    vibration,
    autoplayAudio,
    setSoundEffects,
    setVolume,
    setVibration,
    setAutoplayAudio,
    resetSettings,
    playSound,
    triggerVibrate,
  } = useSettings();

  // Profile State
  const [userName, setUserName] = useState(
    initialProgress?.userName || user?.name || "Học viên TrioLingo"
  );
  const [userImageSrc, setUserImageSrc] = useState(
    initialProgress?.userImageSrc || user?.image || "/mascot.svg"
  );
  const [customAvatarUrl, setCustomAvatarUrl] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Handle Profile Update
  const handleSaveProfile = async () => {
    const trimmed = userName.trim();
    if (!trimmed) {
      toast.error("Tên hiển thị không được để trống.");
      return;
    }

    setIsSavingProfile(true);
    try {
      await updateUserProfile({
        userName: trimmed,
        userImageSrc,
      });

      await updateProfileData(trimmed, userImageSrc);

      triggerVibrate(60);
      playSound("/correct.wav");
      toast.success("Đã lưu hồ sơ thành công!");
    } catch (error) {
      console.error("Save profile error:", error);
      toast.error("Không thể lưu thông tin hồ sơ, vui lòng thử lại.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle Custom Avatar URL Apply
  const handleApplyCustomUrl = () => {
    if (!customAvatarUrl.trim()) return;
    setUserImageSrc(customAvatarUrl.trim());
    toast.success("Đã áp dụng ảnh đại diện!");
  };

  // Handle Password Update
  const handleUpdatePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có tối thiểu 6 ký tự.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp.");
      return;
    }

    setIsChangingPassword(true);
    try {
      const ok = await changePassword(newPassword);
      if (ok) {
        setNewPassword("");
        setConfirmPassword("");
        triggerVibrate(80);
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Handle Password Reset Email
  const handleSendResetEmail = async () => {
    if (!user?.email) {
      toast.error("Không tìm thấy email của bạn.");
      return;
    }
    await resetPassword(user.email);
  };

  return (
    <div className="flex w-full flex-col gap-y-6 pb-12">
      {/* 1. HỒ SƠ */}
      <div className="rounded-2xl border-2 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-neutral-800">
          Hồ sơ
        </h2>

        <Separator className="my-4" />

        {/* Selected avatar & Presets */}
        <div className="mb-6 space-y-3">
          <label className="text-sm font-bold text-neutral-700">
            Ảnh đại diện
          </label>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border-2 border-green-500 bg-neutral-50 p-1 shadow-sm">
              <img
                src={userImageSrc || "/mascot.svg"}
                alt="Avatar đã chọn"
                referrerPolicy="no-referrer"
                className="h-full w-full rounded-xl object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/mascot.svg";
                }}
              />
            </div>

            <div className="grid flex-1 grid-cols-4 gap-2 sm:grid-cols-7">
              {AVATAR_PRESETS.map((preset) => {
                const isSelected = userImageSrc === preset.src;
                return (
                  <button
                    key={preset.src}
                    type="button"
                    onClick={() => setUserImageSrc(preset.src)}
                    className={cn(
                      "group relative flex flex-col items-center rounded-xl border-2 p-1.5 transition hover:bg-neutral-50 active:scale-95",
                      isSelected
                        ? "border-green-500 bg-green-50 shadow-sm"
                        : "border-neutral-200"
                    )}
                  >
                    <div className="relative h-10 w-10">
                      <Image
                        src={preset.src}
                        alt={preset.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="mt-1 text-[11px] font-medium text-neutral-600">
                      {preset.name}
                    </span>
                    {isSelected && (
                      <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-white">
                        <Check className="h-2.5 w-2.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Avatar Link */}
          <div className="mt-2 flex items-center gap-x-2 pt-1">
            <input
              type="url"
              placeholder="Hoặc dán URL ảnh đại diện..."
              value={customAvatarUrl}
              onChange={(e) => setCustomAvatarUrl(e.target.value)}
              className="flex-1 rounded-xl border-2 border-neutral-200 px-3 py-2 text-sm text-neutral-700 focus:border-green-500 focus:outline-none"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleApplyCustomUrl}
              disabled={!customAvatarUrl.trim()}
            >
              Áp dụng
            </Button>
          </div>
        </div>

        {/* Display Name Input */}
        <div className="space-y-2">
          <label
            htmlFor="display-name"
            className="text-sm font-bold text-neutral-700"
          >
            Tên hiển thị
          </label>
          <input
            id="display-name"
            type="text"
            maxLength={40}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Nhập tên hiển thị của bạn..."
            className="w-full rounded-xl border-2 border-neutral-200 px-4 py-2.5 text-base text-neutral-800 transition focus:border-green-500 focus:outline-none"
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            size="lg"
            variant="primary"
            onClick={handleSaveProfile}
            disabled={isSavingProfile}
            className="min-w-[150px]"
          >
            {isSavingProfile ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </div>

      {/* 2. MẬT KHẨU */}
      <div className="rounded-2xl border-2 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-x-3 pb-2">
          <Image
            src="/key.svg"
            alt="Mật khẩu"
            width={26}
            height={26}
            className="shrink-0"
          />
          <h2 className="text-xl font-bold text-neutral-800">
            Mật khẩu
          </h2>
        </div>

        <Separator className="my-4" />

        {/* Email Info */}
        <div className="mb-4 text-sm text-neutral-600">
          <span className="font-semibold text-neutral-700">Email:</span>{" "}
          {user?.email || "Chưa xác định"}
        </div>

        {/* Change Password Form */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-neutral-700">
              Mật khẩu mới
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Tối thiểu 6 ký tự..."
                className="w-full rounded-xl border-2 border-neutral-200 px-4 py-2.5 pr-10 text-base text-neutral-800 focus:border-green-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-bold text-neutral-700">
              Xác nhận mật khẩu mới
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu mới..."
              className="w-full rounded-xl border-2 border-neutral-200 px-4 py-2.5 text-base text-neutral-800 focus:border-green-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={handleSendResetEmail}
              className="text-neutral-600"
            >
              Gửi email đặt lại mật khẩu
            </Button>

            <Button
              type="button"
              variant="primary"
              onClick={handleUpdatePassword}
              disabled={isChangingPassword || !newPassword}
            >
              {isChangingPassword ? "Đang xử lý..." : "Cập nhật mật khẩu"}
            </Button>
          </div>
        </div>
      </div>

      {/* 3. ÂM THANH & RUNG */}
      <div className="rounded-2xl border-2 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-x-3 pb-2">
          <Image
            src="/sound.svg"
            alt="Âm thanh"
            width={26}
            height={26}
            className="shrink-0"
          />
          <h2 className="text-xl font-bold text-neutral-800">
            Âm thanh & Rung
          </h2>
        </div>

        <Separator className="my-4" />

        <div className="space-y-5">
          {/* Sound Effects */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-neutral-800">
                Hiệu ứng âm thanh
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => playSound("/correct.wav")}
                disabled={!soundEffects}
                className="text-xs text-neutral-600 hover:text-green-600"
              >
                Nghe thử
              </Button>
              <Switch
                checked={soundEffects}
                onCheckedChange={(val) => {
                  setSoundEffects(val);
                  if (val) playSound("/correct.wav");
                }}
              />
            </div>
          </div>

          <Separator />

          {/* Volume Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-neutral-800">
                Âm lượng
              </p>
              <span className="font-mono text-sm font-bold text-neutral-700">
                {soundEffects ? `${volume}%` : "Tắt"}
              </span>
            </div>
            <Slider
              value={volume}
              min={0}
              max={100}
              step={5}
              disabled={!soundEffects}
              onValueChange={(val) => setVolume(val)}
            />
          </div>

          <Separator />

          {/* Vibration */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-neutral-800">
                Rung phản hồi
              </p>
            </div>
            <div className="flex items-center gap-x-3">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  triggerVibrate([80, 40, 80]);
                  toast.success("Đã rung thử nghiệm!");
                }}
                disabled={!vibration}
                className="text-xs text-neutral-600 hover:text-green-600"
              >
                Thử rung
              </Button>
              <Switch
                checked={vibration}
                onCheckedChange={(val) => {
                  setVibration(val);
                  if (val) triggerVibrate(100);
                }}
              />
            </div>
          </div>

          <Separator />

          {/* Autoplay Audio */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-bold text-neutral-800">
                Tự động phát âm từ vựng
              </p>
            </div>
            <Switch
              checked={autoplayAudio}
              onCheckedChange={setAutoplayAudio}
            />
          </div>

          <Separator />

          {/* Reset settings button */}
          <div className="flex items-center justify-between pt-1">
            <p className="text-sm text-neutral-500">
              Khôi phục âm thanh mặc định
            </p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                resetSettings();
                toast.success("Đã khôi phục cài đặt mặc định!");
              }}
              className="text-neutral-500 hover:text-neutral-800"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Đặt lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
