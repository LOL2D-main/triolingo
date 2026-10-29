import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getIsAdmin } from "@/lib/admin";

import { App } from "../app";

const AdminContentPage = async () => {
  const isAdmin = await getIsAdmin();

  if (!isAdmin) redirect("/");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex items-center justify-between border-b bg-white px-6 py-3">
        <Link
          href="/admin"
          className="inline-flex items-center gap-x-2 text-sm font-bold text-neutral-700 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại Bảng điều khiển Admin
        </Link>
        <span className="text-xs font-semibold text-neutral-500">
          Quản lý Khóa học / Chương / Bài học / Câu hỏi
        </span>
      </div>
      <App />
    </div>
  );
};

export default AdminContentPage;
