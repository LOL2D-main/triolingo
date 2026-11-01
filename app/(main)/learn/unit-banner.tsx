import { NotebookText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const UNIT_TITLES_MAP: Record<number, { en: string; vi: string }> = {
  1: {
    en: "Greetings, Self & Introductions",
    vi: "Chương 1: Chào hỏi, Bản thân & Làm quen",
  },
  2: {
    en: "Family, Home & Everyday Objects",
    vi: "Chương 2: Gia đình, Tổ ấm & Đồ vật",
  },
  3: {
    en: "Time, Daily Routines & Jobs",
    vi: "Chương 3: Thời gian, Thói quen & Công việc",
  },
  4: {
    en: "Food, Dining & Daily Shopping",
    vi: "Chương 4: Ẩm thực, Bữa ăn & Mua sắm",
  },
  5: {
    en: "City, Places & Transportation",
    vi: "Chương 5: Thành phố, Nơi chốn & Phương tiện",
  },
  6: {
    en: "Careers, Workplace & Negotiations",
    vi: "Chương 6: Nghề nghiệp, Nơi công sở & Đàm phán",
  },
  7: {
    en: "Technology, Digital Era & Media",
    vi: "Chương 7: Công nghệ, Kỷ nguyên số & Truyền thông",
  },
  8: {
    en: "Environment, Climate & Sustainability",
    vi: "Chương 8: Môi trường, Biến đổi khí hậu & Bền vững",
  },
  9: {
    en: "Critical Thinking, Academia & Research",
    vi: "Chương 9: Tư duy phản biện, Học thuật & Nghiên cứu",
  },
  10: {
    en: "Macroeconomics & Global Finance",
    vi: "Chương 10: Kinh tế vĩ mô & Tài chính toàn cầu",
  },
  11: {
    en: "Big Data, AI & Tech Breakthroughs",
    vi: "Chương 11: Dữ liệu lớn, Trí tuệ nhân tạo & Đột phá",
  },
  12: {
    en: "Behavioral Psychology & Leadership",
    vi: "Chương 12: Tâm lý học hành vi & Lãnh đạo",
  },
  13: {
    en: "Literature, Linguistics & Expression",
    vi: "Chương 13: Văn học, Ngôn ngữ học & Biểu đạt",
  },
  14: {
    en: "International Diplomacy & Grand Master",
    vi: "Chương 14: Ngoại giao quốc tế & Vương miện C2",
  },
};

type UnitBannerProps = {
  order: number;
  title: string;
  description?: string;
};

export const UnitBanner = ({ order, title, description }: UnitBannerProps) => {
  const mapData = UNIT_TITLES_MAP[order];

  // Chữ to ở trên: Lesson [order]: [Tên tiếng Anh]
  const englishHeading = mapData
    ? `Lesson ${order}: ${mapData.en}`
    : `Lesson ${order}: ${title.replace(/^Chương \d+:\s*/i, "")}`;

  // Chữ nhỏ ở dưới: Chương [order]: [Tên tiếng Việt]
  const vietnameseSubtitle = mapData
    ? mapData.vi
    : title.startsWith("Chương")
    ? title
    : `Chương ${order}: ${title}`;

  return (
    <div className="flex w-full items-center justify-between rounded-2xl bg-green-500 p-4 sm:p-5 text-white shadow-sm">
      <div className="space-y-1 sm:space-y-1.5 min-w-0 flex-1 pr-3">
        <h3 className="text-lg sm:text-2xl font-black tracking-tight break-words">
          {englishHeading}
        </h3>
        <p className="text-xs sm:text-sm font-semibold text-green-50/95 break-words leading-snug">
          {vietnameseSubtitle}
        </p>
      </div>

      <Link href="/lesson" prefetch>
        <Button
          size="lg"
          variant="secondary"
          className="hidden sm:flex border-2 border-b-4 active:border-b-2 shrink-0 font-extrabold uppercase tracking-wide text-xs sm:text-sm"
        >
          <NotebookText className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Tiếp tục
        </Button>
      </Link>
    </div>
  );
};
