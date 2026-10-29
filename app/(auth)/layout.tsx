import type { PropsWithChildren } from "react";
import Image from "next/image";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-gradient-to-br from-green-100 via-emerald-50 to-sky-100 lg:block">
        <Image
          src="/education-banner.jpg"
          alt="Học Tiếng Anh cùng TrioLingo"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-green-900/70 to-transparent p-10 pt-24 text-white">
          <h2 className="text-3xl font-extrabold">Học Tiếng Anh mỗi ngày, thật vui!</h2>
          <p className="mt-2 max-w-md text-sm font-semibold text-green-50">
            Bài học ngắn, trò chơi thú vị và theo dõi tiến độ — cùng TrioLingo chinh phục Tiếng Anh.
          </p>
        </div>
      </aside>

      <main className="flex items-center justify-center bg-gradient-to-b from-white to-green-50/60 p-4 sm:p-8">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
