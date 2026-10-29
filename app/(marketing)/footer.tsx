import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="w-full border-t-2 border-slate-200 bg-white">
      <div className="hidden h-20 w-full p-2 lg:block">
        <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
          <Button
            size="lg"
            variant="ghost"
            className="w-full cursor-default font-bold text-green-600"
          >
            <Image
              src="/en.svg"
              alt="English"
              height={32}
              width={40}
              className="mr-4 rounded-md shadow-sm"
            />
            Tiếng Anh
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-full cursor-default font-semibold text-slate-500"
          >
            <Image
              src="/es.svg"
              alt="Spanish"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Tiếng Tây Ban Nha
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-full cursor-default font-semibold text-slate-500"
          >
            <Image
              src="/fr.svg"
              alt="French"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Tiếng Pháp
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-full cursor-default font-semibold text-slate-500"
          >
            <Image
              src="/it.svg"
              alt="Italian"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Tiếng Ý
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-full cursor-default font-semibold text-slate-500"
          >
            <Image
              src="/jp.svg"
              alt="Japanese"
              height={32}
              width={40}
              className="mr-4 rounded-md"
            />
            Tiếng Nhật
          </Button>
        </div>
      </div>

      <div className="border-t border-slate-100 py-3 text-center text-xs font-semibold text-slate-500">
        Bản quyền thuộc lớp 10A8 - THPT Lê Chân | Nguyễn Nhật Thiện & Nguyễn Kim Cương
      </div>
    </footer>
  );
};
