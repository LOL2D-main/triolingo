"use client";

import { Ban, LogOut } from "lucide-react";

import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";

export default function BannedPage() {
  const { signOut } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-2xl border-2 border-rose-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <Ban className="h-8 w-8" />
        </div>

        <h1 className="text-2xl font-extrabold text-neutral-800">
          Tài khoản đã bị khóa
        </h1>

        <p className="mt-2 text-sm text-neutral-600">
          Tài khoản của bạn đã bị Quản trị viên tạm khóa. Vui lòng liên hệ quản
          trị viên nếu bạn cho rằng đây là sự nhầm lẫn.
        </p>

        <div className="mt-6">
          <Button
            variant="danger"
            size="lg"
            className="w-full gap-x-2"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </div>
    </div>
  );
}

