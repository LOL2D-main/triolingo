"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";

import { useAuth } from "@/components/auth-provider";
import { GoogleIcon } from "@/components/google-icon";
import { cn } from "@/lib/utils";

export type AuthMode = "login" | "register" | "forgot";

const copy = {
  login: {
    title: "Chào mừng trở lại!",
    subtitle: "Đăng nhập để tiếp tục hành trình học Tiếng Anh của bạn.",
    submit: "Đăng nhập",
  },
  register: {
    title: "Tạo tài khoản mới",
    subtitle: "Miễn phí và chỉ mất chưa đến 1 phút để bắt đầu.",
    submit: "Đăng ký",
  },
  forgot: {
    title: "Quên mật khẩu?",
    subtitle: "Nhập email của bạn, chúng tôi sẽ gửi liên kết đặt lại mật khẩu.",
    submit: "Gửi liên kết đặt lại",
  },
};

const inputWrap =
  "flex items-center gap-x-3 rounded-full border-2 border-slate-200 bg-slate-50 px-5 py-3 transition focus-within:border-green-500 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(34,197,94,0.12)]";
const inputCls =
  "w-full bg-transparent text-sm font-semibold text-neutral-700 outline-none placeholder:font-medium placeholder:text-slate-400";

export const AuthForm = ({ initialMode }: { initialMode: AuthMode }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setError(null);
    setSent(false);
    if (typeof window !== "undefined") {
      const path = next === "register" ? "/sign-up" : "/sign-in";
      window.history.replaceState(null, "", path);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) return setError("Vui lòng nhập email.");

    if (mode === "forgot") {
      setLoading(true);
      const ok = await resetPassword(email.trim());
      setLoading(false);
      if (ok) setSent(true);
      return;
    }

    if (password.length < 6) return setError("Mật khẩu cần tối thiểu 6 ký tự.");

    if (mode === "register") {
      if (!name.trim()) return setError("Vui lòng nhập tên của bạn.");
      if (password !== confirm) return setError("Mật khẩu nhập lại không khớp.");
    }

    setLoading(true);
    if (mode === "login") await signInWithEmail(email.trim(), password);
    else await signUpWithEmail(name.trim(), email.trim(), password);
    setLoading(false);
  };

  const c = copy[mode];

  return (
    <div className="w-full max-w-md">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-x-2 rounded-full border-2 border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-sm transition hover:-translate-x-0.5 hover:border-green-400 hover:text-green-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Về trang chủ
      </Link>

      <div className="rounded-[2rem] border-2 border-slate-100 bg-white p-8 shadow-xl shadow-green-900/5">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50">
            <Image src="/mascot.svg" alt="TrioLingo" height={44} width={44} />
          </div>
          <h1 className="text-2xl font-extrabold text-neutral-800">{c.title}</h1>
          <p className="mt-1 text-sm font-medium text-neutral-500">{c.subtitle}</p>
        </div>

        {mode !== "forgot" && (
          <>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="flex w-full items-center justify-center gap-x-3 rounded-full border-2 border-slate-200 bg-white py-3 text-sm font-bold text-neutral-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md active:translate-y-0"
            >
              <GoogleIcon className="h-5 w-5" />
              {mode === "login" ? "Đăng nhập với Google" : "Đăng ký với Google"}
            </button>

            <div className="my-5 flex items-center gap-x-3 text-xs font-bold uppercase text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              hoặc dùng email
              <span className="h-px flex-1 bg-slate-200" />
            </div>
          </>
        )}

        {sent ? (
          <div className="rounded-3xl bg-green-50 p-5 text-center text-sm font-semibold text-green-700">
            Đã gửi liên kết đến <b>{email}</b>. Hãy kiểm tra hộp thư (cả mục Spam) nhé!
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-y-3" noValidate>
            {mode === "register" && (
              <label className={inputWrap}>
                <User className="h-5 w-5 text-slate-400" />
                <input
                  className={inputCls}
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>
            )}

            <label className={inputWrap}>
              <Mail className="h-5 w-5 text-slate-400" />
              <input
                type="email"
                className={inputCls}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </label>

            {mode !== "forgot" && (
              <label className={inputWrap}>
                <Lock className="h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={inputCls}
                  placeholder="Mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="text-slate-400 hover:text-green-600"
                  aria-label="Hiện/ẩn mật khẩu"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </label>
            )}

            {mode === "register" && (
              <label className={inputWrap}>
                <Lock className="h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className={inputCls}
                  placeholder="Nhập lại mật khẩu"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
              </label>
            )}

            {mode === "login" && (
              <button
                type="button"
                onClick={() => switchMode("forgot")}
                className="self-end text-xs font-bold text-sky-500 hover:underline"
              >
                Quên mật khẩu?
              </button>
            )}

            {error && (
              <p className="rounded-full bg-rose-50 px-4 py-2 text-center text-xs font-bold text-rose-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={cn(
                "mt-1 flex items-center justify-center gap-x-2 rounded-full border-b-4 border-green-600 bg-green-500 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-green-500/30 transition hover:bg-green-400 active:translate-y-0.5 active:border-b-0",
                loading && "pointer-events-none opacity-70"
              )}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {c.submit}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm font-semibold text-neutral-500">
          {mode === "login" && (
            <>
              Chưa có tài khoản?{" "}
              <button onClick={() => switchMode("register")} className="font-extrabold text-green-600 hover:underline">
                Đăng ký ngay
              </button>
            </>
          )}
          {mode === "register" && (
            <>
              Đã có tài khoản?{" "}
              <button onClick={() => switchMode("login")} className="font-extrabold text-green-600 hover:underline">
                Đăng nhập
              </button>
            </>
          )}
          {mode === "forgot" && (
            <button onClick={() => switchMode("login")} className="font-extrabold text-green-600 hover:underline">
              Quay lại đăng nhập
            </button>
          )}
        </p>
      </div>
    </div>
  );
};
