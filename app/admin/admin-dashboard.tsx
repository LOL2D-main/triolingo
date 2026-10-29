"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Ban,
  BookOpen,
  Check,
  Copy,
  KeyRound,
  LockOpen,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";

import {
  createCampaignKey,
  deleteCampaignKey,
  deleteUltraKey,
  deleteUserAccount,
  generateUltraKeys,
  setUserBanned,
  setUserUltra,
  updateUserStats,
} from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { ADMIN_AVATAR, ADMIN_USER_ID } from "@/lib/admin-constants";
import { cn } from "@/lib/utils";

export type AdminUserRow = {
  userId: string;
  userName: string;
  userEmail: string | null;
  userImageSrc: string;
  points: number;
  gems: number;
  isBanned: boolean;
  isUltra: boolean;
  subscriptionType: string | null;
  periodEnd: string | null;
  usedKeyCode: string | null;
};

export type AdminKeyRow = {
  id: number;
  code: string;
  createdAt: string;
  usedBy: string | null;
  usedByEmail: string | null;
  usedAt: string | null;
};

export type AdminCampaignKeyRow = {
  id: number;
  code: string;
  description: string | null;
  durationDays: number;
  createdAt: string;
};

export type AdminCampaignRedemptionRow = {
  id: number;
  code: string;
  userId: string;
  userEmail: string | null;
  redeemedAt: string;
};

type AdminDashboardProps = {
  users: AdminUserRow[];
  keys: AdminKeyRow[];
  campaignKeys?: AdminCampaignKeyRow[];
  campaignRedemptions?: AdminCampaignRedemptionRow[];
  stats: {
    coursesCount: number;
    unitsCount: number;
    lessonsCount: number;
    challengesCount: number;
  };
};

export const AdminDashboard = ({
  users,
  keys,
  campaignKeys = [],
  campaignRedemptions = [],
  stats,
}: AdminDashboardProps) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState<
    "users" | "subscribers" | "keys" | "content"
  >("users");

  const [userSearch, setUserSearch] = useState("");
  const [keyFilter, setKeyFilter] = useState<"all" | "unused" | "used">("all");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [editingUser, setEditingUser] = useState<AdminUserRow | null>(null);
  const [editGems, setEditGems] = useState(0);
  const [editPoints, setEditPoints] = useState(0);

  // Modal tạo key dùng chung
  const [showCreateCampaignModal, setShowCreateCampaignModal] = useState(false);
  const [newCampaignCode, setNewCampaignCode] = useState("");
  const [newCampaignDesc, setNewCampaignDesc] = useState("");
  const [newCampaignDays, setNewCampaignDays] = useState(7);

  const filteredUsers = users.filter((u) => {
    const q = userSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      u.userName.toLowerCase().includes(q) ||
      (u.userEmail && u.userEmail.toLowerCase().includes(q)) ||
      u.userId.toLowerCase().includes(q)
    );
  });

  const subscribers = users.filter(
    (u) => u.isUltra && u.userId !== ADMIN_USER_ID
  );

  const filteredKeys = keys.filter((k) => {
    if (keyFilter === "unused") return !k.usedBy;
    if (keyFilter === "used") return !!k.usedBy;
    return true;
  });

  const unusedKeysCount = keys.filter((k) => !k.usedBy).length;
  const usedKeysCount = keys.filter((k) => !!k.usedBy).length;
  const bannedUsersCount = users.filter((u) => u.isBanned).length;

  const handleCopyKey = (code: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success(`Đã sao chép key: ${code}`);
      setTimeout(() => setCopiedCode(null), 1800);
    }
  };

  const handleToggleBan = (user: AdminUserRow) => {
    if (user.userId === ADMIN_USER_ID) return;
    startTransition(async () => {
      const res = await setUserBanned(user.userId, !user.isBanned);
      if (res.success) {
        toast.success(
          !user.isBanned
            ? `Đã khóa tài khoản ${user.userName}`
            : `Đã mở khóa tài khoản ${user.userName}`
        );
        router.refresh();
      } else {
        toast.error(res.error || "Không thể thực hiện.");
      }
    });
  };

  const handleDeleteUser = (user: AdminUserRow) => {
    if (user.userId === ADMIN_USER_ID) return;
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản "${user.userName}"?`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const res = await deleteUserAccount(user.userId);
      if (res.success) {
        toast.success(`Đã xóa tài khoản ${user.userName}`);
        router.refresh();
      } else {
        toast.error(res.error || "Không thể xóa tài khoản.");
      }
    });
  };

  const handleToggleUltra = (user: AdminUserRow) => {
    if (user.userId === ADMIN_USER_ID) return;
    startTransition(async () => {
      const res = await setUserUltra(user.userId, !user.isUltra);
      if (res.success) {
        toast.success(
          !user.isUltra
            ? `Đã kích hoạt gói Ultra cho ${user.userName}`
            : `Đã hủy gói Ultra của ${user.userName}`
        );
        router.refresh();
      }
    });
  };

  const handleGenerateKeys = (count: number) => {
    startTransition(async () => {
      const res = await generateUltraKeys(count);
      if (res.success) {
        toast.success(`Đã tạo ${res.codes.length} mã Key Ultra mới.`);
        router.refresh();
      }
    });
  };

  const handleDeleteKey = (id: number) => {
    startTransition(async () => {
      const res = await deleteUltraKey(id);
      if (res.success) {
        toast.success("Đã xóa key.");
        router.refresh();
      } else {
        toast.error(res.error || "Không thể xóa key.");
      }
    });
  };

  const handleDeleteCampaignKey = (k: AdminCampaignKeyRow) => {
    if (
      !window.confirm(
        `Bạn có chắc chắn muốn xóa mã key "${k.code}"? Sau khi xóa, key này sẽ hết tác dụng và không tài khoản nào có thể nhập được nữa.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const res = await deleteCampaignKey(k.id);
      if (res.success) {
        toast.success(`Đã xóa key "${k.code}". Key đã hết tác dụng.`);
        router.refresh();
      } else {
        toast.error(res.error || "Không thể xóa key.");
      }
    });
  };

  const handleCreateCampaignKeySubmit = () => {
    if (!newCampaignCode.trim()) {
      toast.error("Vui lòng nhập mã key.");
      return;
    }

    startTransition(async () => {
      const res = await createCampaignKey({
        code: newCampaignCode,
        description: newCampaignDesc,
        durationDays: newCampaignDays,
      });

      if (res.success) {
        toast.success(
          `Đã tạo key dùng chung "${newCampaignCode.trim().toUpperCase()}".`
        );
        setShowCreateCampaignModal(false);
        setNewCampaignCode("");
        setNewCampaignDesc("");
        setNewCampaignDays(7);
        router.refresh();
      } else {
        toast.error(res.error || "Không thể tạo key.");
      }
    });
  };

  const openEditModal = (user: AdminUserRow) => {
    setEditingUser(user);
    setEditGems(user.gems);
    setEditPoints(user.points);
  };

  const handleSaveStats = () => {
    if (!editingUser) return;
    startTransition(async () => {
      const res = await updateUserStats(editingUser.userId, {
        gems: editGems,
        points: editPoints,
      });
      if (res.success) {
        toast.success(`Đã cập nhật chỉ số cho ${editingUser.userName}`);
        setEditingUser(null);
        router.refresh();
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Header */}
      <header className="border-b-2 border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-x-3">
            <Image
              src={ADMIN_AVATAR}
              alt="Admin Avatar"
              width={44}
              height={44}
              className="rounded-xl"
            />
            <div>
              <h1 className="text-xl font-extrabold text-neutral-800">
                Quản trị hệ thống TrioLingo
              </h1>
              <p className="text-xs font-medium text-neutral-500">
                admin@gmail.com • 99.999 Gem • 9.999 KN • Mở khóa toàn bộ bài học
              </p>
            </div>
          </div>

          <div className="flex items-center gap-x-2">
            <Link href="/learn">
              <Button variant="secondaryOutline" size="sm">
                Về trang Học tập
              </Button>
            </Link>
            <Link href="/admin/content">
              <Button variant="primary" size="sm">
                Quản lý Bài học & Câu hỏi
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6">
        {/* Summary Cards */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl border-2 border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase text-neutral-500">
              Tổng tài khoản
            </p>
            <p className="mt-1 text-2xl font-black text-neutral-800">
              {users.length}
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">
              Đang khóa: {bannedUsersCount}
            </p>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase text-neutral-500">
              Người mua gói Ultra
            </p>
            <p className="mt-1 text-2xl font-black text-sky-600">
              {subscribers.length}
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">
              Đang kích hoạt Ultra
            </p>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase text-neutral-500">
              Key dùng chung
            </p>
            <p className="mt-1 text-2xl font-black text-sky-600">
              {campaignKeys.length} mã
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">
              Đã nhận: {campaignRedemptions.length} lượt
            </p>
          </div>

          <div className="rounded-xl border-2 border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase text-neutral-500">
              Key đơn chưa dùng
            </p>
            <p className="mt-1 text-2xl font-black text-emerald-600">
              {unusedKeysCount}
            </p>
            <p className="mt-0.5 text-xs text-neutral-500">
              Đã sử dụng: {usedKeysCount}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-6 flex flex-wrap gap-2 border-b-2 border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={cn(
              "flex items-center gap-x-2 rounded-xl px-4 py-2.5 text-sm font-bold transition",
              activeTab === "users"
                ? "bg-neutral-800 text-white"
                : "bg-white text-neutral-600 hover:bg-slate-100"
            )}
          >
            <Users className="h-4 w-4" />
            Tài khoản ({users.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("subscribers")}
            className={cn(
              "flex items-center gap-x-2 rounded-xl px-4 py-2.5 text-sm font-bold transition",
              activeTab === "subscribers"
                ? "bg-neutral-800 text-white"
                : "bg-white text-neutral-600 hover:bg-slate-100"
            )}
          >
            <ShieldCheck className="h-4 w-4" />
            Người mua gói Ultra ({subscribers.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("keys")}
            className={cn(
              "flex items-center gap-x-2 rounded-xl px-4 py-2.5 text-sm font-bold transition",
              activeTab === "keys"
                ? "bg-neutral-800 text-white"
                : "bg-white text-neutral-600 hover:bg-slate-100"
            )}
          >
            <KeyRound className="h-4 w-4" />
            Quản lý Key Ultra ({campaignKeys.length + keys.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={cn(
              "flex items-center gap-x-2 rounded-xl px-4 py-2.5 text-sm font-bold transition",
              activeTab === "content"
                ? "bg-neutral-800 text-white"
                : "bg-white text-neutral-600 hover:bg-slate-100"
            )}
          >
            <BookOpen className="h-4 w-4" />
            Quản lý nội dung
          </button>
        </div>

        {/* TAB 1: QUAN LY TAI KHOAN */}
        {activeTab === "users" && (
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-extrabold text-neutral-800">
                Danh sách tài khoản người dùng
              </h2>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Tìm theo tên hoặc email..."
                  className="w-full rounded-xl border-2 border-slate-200 py-2 pl-9 pr-3 text-sm font-medium outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-100 text-xs font-bold uppercase text-neutral-500">
                    <th className="py-3 pr-3">Người dùng</th>
                    <th className="px-3 py-3">KN / Gem</th>
                    <th className="px-3 py-3">Gói cước</th>
                    <th className="px-3 py-3">Trạng thái</th>
                    <th className="py-3 pl-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.map((u) => {
                    const isAdminRow = u.userId === ADMIN_USER_ID;
                    return (
                      <tr key={u.userId} className="hover:bg-slate-50/80">
                        <td className="py-3 pr-3">
                          <div className="flex items-center gap-x-3">
                            <img
                              src={
                                isAdminRow
                                  ? ADMIN_AVATAR
                                  : u.userImageSrc || "/mascot.svg"
                              }
                              alt={u.userName}
                              className="h-10 w-10 rounded-xl border object-cover"
                            />
                            <div>
                              <div className="flex items-center gap-x-2">
                                <p className="font-bold text-neutral-800">
                                  {u.userName}
                                </p>
                                {isAdminRow && (
                                  <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-black uppercase text-amber-800">
                                    ADMIN
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-neutral-500">
                                {u.userEmail || u.userId}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-3">
                          <p className="font-bold text-neutral-800">
                            {u.points.toLocaleString("vi-VN")} KN
                          </p>
                          <p className="text-xs font-semibold text-sky-600">
                            {u.gems.toLocaleString("vi-VN")} Gem
                          </p>
                        </td>

                        <td className="px-3 py-3">
                          {u.isUltra ? (
                            <div>
                              <span className="inline-block rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-700">
                                Ultra
                              </span>
                              {u.usedKeyCode && (
                                <p className="mt-1 font-mono text-[11px] text-neutral-500">
                                  Key: {u.usedKeyCode}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="text-xs font-medium text-neutral-400">
                              Miễn phí
                            </span>
                          )}
                        </td>

                        <td className="px-3 py-3">
                          {u.isBanned ? (
                            <span className="inline-block rounded-lg bg-rose-100 px-2.5 py-1 text-xs font-bold text-rose-700">
                              Đã khóa
                            </span>
                          ) : (
                            <span className="inline-block rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                              Hoạt động
                            </span>
                          )}
                        </td>

                        <td className="py-3 pl-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditModal(u)}
                              disabled={pending}
                              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-neutral-700 hover:bg-slate-100"
                              title="Chỉnh sửa Gem & KN"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </button>

                            {!isAdminRow && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleToggleUltra(u)}
                                  disabled={pending}
                                  className={cn(
                                    "rounded-lg border px-2.5 py-1.5 text-xs font-bold transition",
                                    u.isUltra
                                      ? "border-slate-200 bg-white text-neutral-600 hover:bg-slate-100"
                                      : "border-sky-200 bg-sky-50 text-sky-700 hover:bg-sky-100"
                                  )}
                                >
                                  {u.isUltra ? "Hủy Ultra" : "Cấp Ultra"}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleToggleBan(u)}
                                  disabled={pending}
                                  className={cn(
                                    "inline-flex items-center gap-x-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition",
                                    u.isBanned
                                      ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                      : "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                                  )}
                                >
                                  {u.isBanned ? (
                                    <>
                                      <LockOpen className="h-3.5 w-3.5" />
                                      Mở khóa
                                    </>
                                  ) : (
                                    <>
                                      <Ban className="h-3.5 w-3.5" />
                                      Khóa
                                    </>
                                  )}
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(u)}
                                  disabled={pending}
                                  className="inline-flex items-center gap-x-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                  Xóa
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-sm text-neutral-500"
                      >
                        Không tìm thấy tài khoản nào phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: NGUOI MUA GOI ULTRA */}
        {activeTab === "subscribers" && (
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
            <h2 className="mb-4 text-lg font-extrabold text-neutral-800">
              Danh sách người dùng đang sở hữu gói Ultra
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-100 text-xs font-bold uppercase text-neutral-500">
                    <th className="py-3 pr-3">Học viên</th>
                    <th className="px-3 py-3">Hình thức kích hoạt</th>
                    <th className="px-3 py-3">Mã Key đã dùng</th>
                    <th className="px-3 py-3">Hạn sử dụng</th>
                    <th className="py-3 pl-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {subscribers.map((u) => (
                    <tr key={u.userId} className="hover:bg-slate-50/80">
                      <td className="py-3 pr-3">
                        <div className="flex items-center gap-x-3">
                          <img
                            src={u.userImageSrc || "/mascot.svg"}
                            alt={u.userName}
                            className="h-9 w-9 rounded-xl border object-cover"
                          />
                          <div>
                            <p className="font-bold text-neutral-800">
                              {u.userName}
                            </p>
                            <p className="text-xs text-neutral-500">
                              {u.userEmail || u.userId}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-3 py-3">
                        <span className="rounded-lg bg-sky-100 px-2.5 py-1 text-xs font-bold text-sky-700">
                          {u.subscriptionType === "ultra_admin_granted"
                            ? "Admin cấp"
                            : u.subscriptionType?.startsWith("ultra_key_lop")
                            ? "Key dùng chung (7 ngày)"
                            : "Kích hoạt bằng Key"}
                        </span>
                      </td>

                      <td className="px-3 py-3 font-mono text-xs font-bold text-neutral-700">
                        {u.usedKeyCode || "—"}
                      </td>

                      <td className="px-3 py-3 text-xs text-neutral-600">
                        {u.periodEnd
                          ? new Date(u.periodEnd).toLocaleDateString("vi-VN")
                          : "Vĩnh viễn"}
                      </td>

                      <td className="py-3 pl-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleToggleUltra(u)}
                          disabled={pending}
                          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100"
                        >
                          Thu hồi gói Ultra
                        </button>
                      </td>
                    </tr>
                  ))}

                  {subscribers.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="py-8 text-center text-sm text-neutral-500"
                      >
                        Chưa có người dùng nào kích hoạt gói Ultra.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: QUAN LY KEY ULTRA */}
        {activeTab === "keys" && (
          <div className="space-y-6">
            {/* PHẦN 1: KEY DÙNG CHUNG / LỚP HỌC (Không giới hạn acc nhập, mỗi acc 1 lần, Xóa key mới hết hạn) */}
            <div className="rounded-2xl border-2 border-sky-300 bg-sky-50/40 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-x-2">
                    <span className="rounded-md bg-sky-600 px-2.5 py-0.5 text-xs font-black uppercase text-white">
                      Key dùng chung / Lớp học
                    </span>
                    <h2 className="text-lg font-black text-neutral-800">
                      Mỗi acc được nhập 1 lần • Không giới hạn số acc • Xóa key mới hết tác dụng
                    </h2>
                  </div>
                  <p className="mt-1 text-xs text-neutral-600">
                    Học sinh lớp học có thể cùng nhập mã này để nhận Ultra. Khi Admin bấm &quot;Xóa key&quot; thì key mới hết hạn.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowCreateCampaignModal(true)}
                  className="gap-x-1.5"
                >
                  <Plus className="h-4 w-4" />
                  Thêm Key dùng chung
                </Button>
              </div>

              {campaignKeys.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {campaignKeys.map((ck) => {
                    const redemptions = campaignRedemptions.filter(
                      (r) => r.code === ck.code
                    );
                    return (
                      <div
                        key={ck.id}
                        className="flex flex-col justify-between rounded-xl border-2 border-sky-200 bg-white p-4 shadow-sm"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-mono text-base font-black tracking-wider text-sky-800">
                                {ck.code}
                              </span>
                              <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                                Đang hoạt động
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleCopyKey(ck.code)}
                              className="inline-flex items-center gap-x-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-bold text-neutral-700 hover:bg-slate-100"
                              title="Sao chép"
                            >
                              {copiedCode === ck.code ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-600" />
                                  <span className="text-[11px] text-emerald-600">
                                    Đã chép
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  <span className="text-[11px]">Sao chép</span>
                                </>
                              )}
                            </button>
                          </div>

                          <p className="mt-1 text-xs font-semibold text-neutral-700">
                            {ck.description || "Key dùng chung cho lớp học"}
                          </p>
                          <p className="mt-0.5 text-xs text-sky-600 font-bold">
                            Phần thưởng: {ck.durationDays} ngày Trio Ultra
                          </p>

                          <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs text-neutral-600">
                            <span className="font-bold text-neutral-800">
                              Đã có {redemptions.length} tài khoản kích hoạt mã này
                            </span>
                            {redemptions.length > 0 && (
                              <div className="mt-1.5 max-h-20 overflow-y-auto space-y-0.5">
                                {redemptions.map((r) => (
                                  <p
                                    key={r.id}
                                    className="truncate font-mono text-[11px] text-neutral-500"
                                  >
                                    • {r.userEmail || r.userId} (
                                    {new Date(r.redeemedAt).toLocaleDateString(
                                      "vi-VN"
                                    )}
                                    )
                                  </p>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end border-t border-slate-100 pt-3">
                          <button
                            type="button"
                            onClick={() => handleDeleteCampaignKey(ck)}
                            disabled={pending}
                            className="inline-flex items-center gap-x-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-100 active:scale-95"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Xóa key (Hết tác dụng)
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-sky-300 bg-white p-6 text-center text-xs text-neutral-500">
                  Chưa có key dùng chung nào. Hãy ấn &quot;Thêm Key dùng chung&quot; để tạo.
                </div>
              )}
            </div>

            {/* PHẦN 2: KEY ĐƠN (1 lần duy nhất trên toàn hệ thống) */}
            <div className="rounded-2xl border-2 border-slate-200 bg-white p-5">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-extrabold text-neutral-800">
                    Quản lý mã Key Ultra đơn (Định dạng ABCD-KHU6I-EGN89)
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Mỗi mã Key chỉ dùng được duy nhất 1 lần trên toàn hệ thống.
                    Nhập lại sẽ báo &quot;Key đã được sử dụng&quot;.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={pending}
                    onClick={() => handleGenerateKeys(1)}
                    className="gap-x-1.5"
                  >
                    <Plus className="h-4 w-4" />
                    Tạo 1 Key
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    disabled={pending}
                    onClick={() => handleGenerateKeys(5)}
                  >
                    +5 Key
                  </Button>
                  <Button
                    variant="secondaryOutline"
                    size="sm"
                    disabled={pending}
                    onClick={() => handleGenerateKeys(10)}
                  >
                    +10 Key
                  </Button>
                </div>
              </div>

              {/* Filter */}
              <div className="mb-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setKeyFilter("all")}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-bold",
                    keyFilter === "all"
                      ? "bg-neutral-800 text-white"
                      : "bg-slate-100 text-neutral-600"
                  )}
                >
                  Tất cả ({keys.length})
                </button>
                <button
                  type="button"
                  onClick={() => setKeyFilter("unused")}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-bold",
                    keyFilter === "unused"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-neutral-600"
                  )}
                >
                  Chưa sử dụng ({unusedKeysCount})
                </button>
                <button
                  type="button"
                  onClick={() => setKeyFilter("used")}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-bold",
                    keyFilter === "used"
                      ? "bg-amber-600 text-white"
                      : "bg-slate-100 text-neutral-600"
                  )}
                >
                  Đã sử dụng ({usedKeysCount})
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-100 text-xs font-bold uppercase text-neutral-500">
                      <th className="py-3 pr-3">Mã Key Ultra</th>
                      <th className="px-3 py-3">Trạng thái</th>
                      <th className="px-3 py-3">Người sử dụng</th>
                      <th className="px-3 py-3">Thời gian dùng</th>
                      <th className="py-3 pl-3 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredKeys.map((k) => {
                      const isUsed = !!k.usedBy;
                      return (
                        <tr key={k.id} className="hover:bg-slate-50/80">
                          <td className="py-3 pr-3">
                            <span className="rounded-lg bg-slate-100 px-3 py-1.5 font-mono text-sm font-black tracking-wider text-neutral-800">
                              {k.code}
                            </span>
                          </td>

                          <td className="px-3 py-3">
                            {isUsed ? (
                              <span className="inline-block rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-800">
                                Đã sử dụng
                              </span>
                            ) : (
                              <span className="inline-block rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                                Chưa dùng
                              </span>
                            )}
                          </td>

                          <td className="px-3 py-3 text-xs font-semibold text-neutral-700">
                            {k.usedByEmail || k.usedBy || "—"}
                          </td>

                          <td className="px-3 py-3 text-xs text-neutral-500">
                            {k.usedAt
                              ? new Date(k.usedAt).toLocaleString("vi-VN")
                              : "—"}
                          </td>

                          <td className="py-3 pl-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                onClick={() => handleCopyKey(k.code)}
                                className="inline-flex items-center gap-x-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-neutral-700 hover:bg-slate-100"
                              >
                                {copiedCode === k.code ? (
                                  <>
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                    Đã chép
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5" />
                                    Sao chép
                                  </>
                                )}
                              </button>

                              {!isUsed && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteKey(k.id)}
                                  disabled={pending}
                                  className="rounded-lg border border-rose-200 bg-rose-50 p-1.5 text-rose-600 hover:bg-rose-100"
                                  title="Xóa key"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredKeys.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="py-8 text-center text-sm text-neutral-500"
                        >
                          Chưa có mã Key nào trong danh sách này.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: QUAN LY NOI DUNG */}
        {activeTab === "content" && (
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-6">
            <h2 className="text-lg font-extrabold text-neutral-800">
              Quản lý Khóa học, Chương, Bài học & Câu hỏi
            </h2>
            <p className="mt-1 text-sm text-neutral-600">
              Thêm, sửa, xóa các khóa học, chương học, bài học và câu hỏi trắc
              nghiệm hoặc vào trực tiếp lộ trình học với quyền Admin (đã mở khóa
              tất cả các bài).
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/admin/content">
                <Button variant="primary" size="lg">
                  Mở Trình quản lý Câu hỏi & Bài học
                </Button>
              </Link>
              <Link href="/learn">
                <Button variant="secondaryOutline" size="lg">
                  Tới trang Học tập (Đã mở khóa toàn bộ bài)
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* Modal chỉnh sửa Gem & KN */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-extrabold text-neutral-800">
              Chỉnh sửa chỉ số: {editingUser.userName}
            </h3>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-600">
                  Số Đá quý (Gem)
                </label>
                <input
                  type="number"
                  min={0}
                  value={editGems}
                  onChange={(e) => setEditGems(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-600">
                  Điểm kinh nghiệm (KN)
                </label>
                <input
                  type="number"
                  min={0}
                  value={editPoints}
                  onChange={(e) => setEditPoints(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingUser(null)}
              >
                Hủy
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={pending}
                onClick={handleSaveStats}
              >
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Thêm Key dùng chung mới */}
      {showCreateCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-extrabold text-neutral-800">
              Thêm Key dùng chung / Lớp học
            </h3>
            <p className="mt-1 text-xs text-neutral-500">
              Key này cho phép nhiều tài khoản cùng nhập (mỗi tài khoản 1 lần). Key chỉ hết hạn khi Admin bấm Xóa key.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-bold uppercase text-neutral-600">
                  Mã Key
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: LOP10A8-THPTLC"
                  value={newCampaignCode}
                  onChange={(e) => setNewCampaignCode(e.target.value.toUpperCase())}
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 px-3 py-2 font-mono text-sm font-bold uppercase outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-600">
                  Mô tả / Tên lớp
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Key lớp 10A8 THPT LC"
                  value={newCampaignDesc}
                  onChange={(e) => setNewCampaignDesc(e.target.value)}
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm font-medium outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-neutral-600">
                  Số ngày Ultra nhận được
                </label>
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={newCampaignDays}
                  onChange={(e) => setNewCampaignDays(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border-2 border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCreateCampaignModal(false)}
              >
                Hủy
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={pending || !newCampaignCode.trim()}
                onClick={handleCreateCampaignKeySubmit}
              >
                Tạo Key
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
