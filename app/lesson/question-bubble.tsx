import Image from "next/image";

type QuestionBubbleProps = {
  question: string;
};

export const QuestionBubble = ({ question }: QuestionBubbleProps) => {
  return (
    <div className="mb-4 sm:mb-6 flex items-center gap-x-3 sm:gap-x-4">
      <div className="relative h-10 w-10 sm:h-12 sm:w-12 lg:h-[60px] lg:w-[60px] shrink-0">
        <Image
          src="/mascot.svg"
          alt="Mascot"
          fill
          className="object-contain"
        />
      </div>

      <div className="relative flex-1 min-w-0 rounded-2xl border-2 border-slate-200 bg-white px-3.5 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base font-bold text-neutral-800 break-words">
        {question}

        <div
          className="absolute -left-2 top-1/2 h-0 w-0 -translate-y-1/2 rotate-90 transform border-x-6 border-t-6 border-x-transparent border-t-slate-200"
          aria-hidden
        />
      </div>
    </div>
  );
};
