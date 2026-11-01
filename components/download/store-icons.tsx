import React from "react";

export const WindowsLogoSvg = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M2 2H11.2V11.2H2V2Z" fill="#0078D4" />
    <path d="M12.8 2H22V11.2H12.8V2Z" fill="#0078D4" />
    <path d="M2 12.8H11.2V22H2V12.8Z" fill="#0078D4" />
    <path d="M12.8 12.8H22V22H12.8V12.8Z" fill="#0078D4" />
  </svg>
);

export const AndroidLogoSvg = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M17.523 15.341C16.968 15.341 16.519 14.892 16.519 14.338C16.519 13.783 16.968 13.334 17.523 13.334C18.078 13.334 18.527 13.783 18.527 14.338C18.527 14.892 18.078 15.341 17.523 15.341ZM6.477 15.341C5.922 15.341 5.473 14.892 5.473 14.338C5.473 13.783 5.922 13.334 6.477 13.334C7.032 13.334 7.481 13.783 7.481 14.338C7.481 14.892 7.032 15.341 6.477 15.341ZM17.881 9.298L19.882 5.831C19.994 5.636 19.927 5.387 19.732 5.274C19.537 5.161 19.288 5.228 19.175 5.423L17.149 8.932C15.632 8.241 13.873 7.852 12 7.852C10.127 7.852 8.368 8.241 6.851 8.932L4.825 5.423C4.712 5.228 4.463 5.161 4.268 5.274C4.073 5.387 4.006 5.636 4.118 5.831L6.119 9.298C2.658 11.179 0.303 14.696 0 18.8H24C23.697 14.696 21.342 11.179 17.881 9.298Z"
      fill="#3DDC84"
    />
  </svg>
);

export const AppleLogoSvg = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.1 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
  </svg>
);

export const PlayStoreIconSvg = ({ className = "h-7 w-7" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
    <path
      d="M7.4 4.8C6.9 5.3 6.6 6.2 6.6 7.3V32.7C6.6 33.8 6.9 34.7 7.4 35.2L7.6 35.3L21.8 21.1V19.9V18.9L7.6 4.7L7.4 4.8Z"
      fill="#4285F4"
    />
    <path
      d="M26.5 25.8L21.8 21.1V19.9V18.9L26.5 14.2L26.7 14.3L32.3 17.5C33.9 18.4 33.9 19.9 32.3 20.8L26.7 24L26.5 25.8Z"
      fill="#FBBC04"
    />
    <path
      d="M26.7 24L21.8 19.9L7.4 34.3C7.9 34.9 8.8 35 9.8 34.4L26.7 24Z"
      fill="#EA4335"
    />
    <path
      d="M26.7 15.8L9.8 5.6C8.8 5 7.9 5.1 7.4 5.7L21.8 20.1L26.7 15.8Z"
      fill="#34A853"
    />
  </svg>
);

export const StarIconSvg = ({
  filled = true,
  className = "h-4 w-4",
  color = "#01875F",
}: {
  filled?: boolean;
  className?: string;
  color?: string;
}) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill={filled ? color : "#DADCE0"}
      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
    />
  </svg>
);

export const VerifiedBadgeSvg = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path
      d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"
      fill="#01875F"
    />
  </svg>
);

export const IosStepIllustration = ({ step }: { step: 1 | 2 | 3 | 4 }) => {
  if (step === 1) {
    return (
      <div className="w-full rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-4">
        <div className="mx-auto max-w-[260px] rounded-2xl border-2 border-[#202124] bg-white p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between border-b border-[#E8EAED] pb-2">
            <span className="text-[11px] font-semibold text-[#5F6368]">9:41</span>
            <span className="text-[11px] font-bold text-[#202124]">Safari</span>
            <span className="text-[11px] font-semibold text-[#5F6368]">5G</span>
          </div>
          <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#F1F3F4] px-2.5 py-1.5">
            <img src="/mascot.svg" alt="Triolingo" className="h-4 w-4" />
            <span className="truncate text-xs font-medium text-[#202124]">
              triolingo-web.vercel.app
            </span>
          </div>
          <div className="flex items-center justify-around rounded-lg border border-[#DADCE0] bg-[#F8F9FA] py-2">
            <span className="text-xs font-bold text-[#9AA0A6]">&lt;</span>
            <span className="text-xs font-bold text-[#9AA0A6]">&gt;</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-[#01875F] bg-[#E6F4EA]">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#01875F]" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M12 3v12m0-12l-4 4m4-4l4 4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-xs font-bold text-[#9AA0A6]">[ ]</span>
          </div>
          <p className="mt-2 text-center text-[11px] font-semibold text-[#01875F]">
            Nhấn nút Chia sẻ (Share) ở thanh dưới Safari
          </p>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="w-full rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-4">
        <div className="mx-auto max-w-[260px] rounded-2xl border-2 border-[#202124] bg-white p-3 shadow-sm">
          <div className="mb-2 flex items-center gap-2.5 border-b border-[#E8EAED] pb-2">
            <img src="/mascot.svg" alt="Triolingo" className="h-7 w-7 rounded-md" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-[#202124]">TrioLingo</p>
              <p className="truncate text-[10px] text-[#5F6368]">triolingo-web.vercel.app</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between rounded-lg bg-[#F1F3F4] px-3 py-1.5 text-[11px] text-[#5F6368]">
              <span>Sao chép liên kết</span>
              <span>[ ]</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border-2 border-[#01875F] bg-[#E6F4EA] px-3 py-2 text-xs font-bold text-[#01875F]">
              <span>Thêm vào Màn hình chính</span>
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M12 8v8m-4-4h8" strokeLinecap="round" />
              </svg>
            </div>
            <div className="flex items-center justify-between rounded-lg bg-[#F1F3F4] px-3 py-1.5 text-[11px] text-[#5F6368]">
              <span>Thêm dấu trang</span>
              <span>+</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="w-full rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-4">
        <div className="mx-auto max-w-[260px] rounded-2xl border-2 border-[#202124] bg-white p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between border-b border-[#E8EAED] pb-2">
            <span className="text-xs text-[#5F6368]">Hủy</span>
            <span className="text-xs font-bold text-[#202124]">Thêm vào MH chính</span>
            <span className="rounded-md border-2 border-[#01875F] bg-[#E6F4EA] px-2 py-0.5 text-xs font-bold text-[#01875F]">
              Thêm
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-[#F1F3F4] p-2.5">
            <img src="/mascot.svg" alt="Triolingo" className="h-10 w-10 rounded-xl bg-white p-1 shadow-sm" />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-[#202124]">Triolingo</p>
              <p className="truncate text-[10px] text-[#5F6368]">https://triolingo-web.vercel.app</p>
            </div>
          </div>
          <p className="mt-2.5 text-center text-[11px] font-semibold text-[#01875F]">
            Nhấn nút &ldquo;Thêm&rdquo; ở góc trên bên phải
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-4">
      <div className="mx-auto max-w-[260px] rounded-2xl border-2 border-[#202124] bg-white p-3 shadow-sm">
        <div className="mb-3 flex items-center justify-between border-b border-[#E8EAED] pb-1.5">
          <span className="text-[10px] font-semibold text-[#5F6368]">9:41</span>
          <span className="text-[10px] font-semibold text-[#5F6368]">Màn hình chính iPhone</span>
        </div>
        <div className="grid grid-cols-4 gap-3 py-2 text-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-xl bg-[#E8EAED]" />
            <span className="mt-1 text-[10px] text-[#5F6368]">Ảnh</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-xl bg-[#E8EAED]" />
            <span className="mt-1 text-[10px] text-[#5F6368]">Lịch</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-[#01875F] bg-[#58CC02]/15 p-1">
              <img src="/mascot.svg" alt="Triolingo" className="h-8 w-8" />
            </div>
            <span className="mt-1 text-[10px] font-bold text-[#01875F]">Triolingo</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-xl bg-[#E8EAED]" />
            <span className="mt-1 text-[10px] text-[#5F6368]">Cài đặt</span>
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] font-semibold text-[#01875F]">
          Mở Triolingo trực tiếp từ màn hình chính
        </p>
      </div>
    </div>
  );
};
