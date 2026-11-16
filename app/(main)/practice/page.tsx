import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { PracticePromoCard } from "@/components/practice/practice-promo-card";
import { Quests } from "@/components/quests";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getPracticeOverviewData } from "@/db/queries";
import { auth } from "@/lib/auth";

const PracticePage = async () => {
  await auth.protect();

  const data = await getPracticeOverviewData();
  if (!data) redirect("/courses");

  const { userProgress, isPro, mistakesCount, vocabCount } = data;
  const vocabBadge = vocabCount >= 30 ? "30+" : `${vocabCount}`;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-3 sm:px-6 pb-12">
      {/* Cot phai giong anh 12 */}
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse!}
          hearts={userProgress.hearts}
          points={userProgress.points}
          gems={userProgress.gems ?? 100}
          energy={userProgress.energy}
          hasActiveSubscription={isPro}
          streakCount={userProgress.streakCount ?? 0}
          lastStreakDate={userProgress.lastStreakDate ?? ""}
          claimedStreakMilestones={userProgress.claimedStreakMilestones ?? ""}
        />

        {!isPro && <PracticePromoCard />}

        <Quests
          lessonsCompleted={userProgress.questLessonsCompleted ?? 0}
          listeningCompleted={userProgress.questListeningCompleted ?? 0}
          highAccuracyCompleted={userProgress.questHighAccuracyCompleted ?? 0}
          chest1Claimed={!!userProgress.questChest1Claimed}
          chest2Claimed={!!userProgress.questChest2Claimed}
          chest3Claimed={!!userProgress.questChest3Claimed}
        />
      </StickyWrapper>

      {/* Cot chinh ben trai (y het bo cuc anh 12) */}
      <FeedWrapper>
        <div className="w-full space-y-8">
          {/* Phan 1: On tap hang ngay */}
          <section>
            <h1 className="mb-3 text-xl font-black text-neutral-800 sm:text-2xl">
              Ôn tập hằng ngày
            </h1>

            <div className="relative flex min-h-[210px] items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b1b4a] via-[#132568] to-[#1d1c63] p-6 text-white shadow-sm sm:p-7">
              <div className="z-10 max-w-[65%] space-y-2.5">
                <Image
                  src="/assets/super-badge.png"
                  alt="Super"
                  width={84}
                  height={24}
                  className="h-5 w-auto object-contain"
                />

                <h2 className="text-xl font-black tracking-tight sm:text-2xl">
                  Luyện tập chuyên sâu
                </h2>

                <p className="text-xs font-medium leading-relaxed text-indigo-100 sm:text-sm">
                  Tập trung ôn luyện những điểm còn yếu
                </p>

                <div className="pt-2">
                  <Link
                    href="/lesson/practice?mode=intensive"
                    prefetch
                    className="inline-flex h-11 items-center justify-center rounded-2xl border-b-4 border-slate-300 bg-white px-6 text-xs font-black uppercase tracking-wider text-[#1e1b4b] transition hover:bg-slate-100 active:translate-y-0.5 active:border-b-2 sm:text-sm"
                  >
                    BẮT ĐẦU LUYỆN
                  </Link>
                </div>
              </div>

              {/* Hinh muc tieu (anh 10) + linh vat (anh 11) tinh khong lo lung */}
              <div className="pointer-events-none relative flex h-36 w-36 shrink-0 items-center justify-center sm:h-44 sm:w-44">
                <Image
                  src="/assets/target-bullseye.png"
                  alt="Mục tiêu"
                  width={160}
                  height={160}
                  className="absolute right-0 top-1/2 h-32 w-32 -translate-y-1/2 object-contain opacity-95 sm:h-40 sm:w-40"
                />
                <Image
                  src="/assets/mascot-cube.png"
                  alt="Linh vật TrioLingo"
                  width={120}
                  height={120}
                  className="relative z-10 h-24 w-24 -translate-x-3 translate-y-2 object-contain sm:h-28 sm:w-28"
                />
              </div>
            </div>
          </section>

          {/* Phan 2: Luyen giao tiep */}
          <section>
            <h2 className="mb-3 text-xl font-black text-neutral-800 sm:text-2xl">
              Luyện giao tiếp
            </h2>

            <div className="space-y-3">
              {/* Luyen noi (anh 4) */}
              <Link
                href="/lesson/practice?mode=speak"
                prefetch
                className="flex items-center justify-between gap-4 rounded-2xl border-2 border-b-4 border-slate-200 bg-white p-4 transition hover:bg-slate-50 active:translate-y-0.5 active:border-b-2 sm:p-5"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-black text-neutral-800 sm:text-lg">
                      Luyện nói
                    </h3>
                    <Image
                      src="/assets/super-badge.png"
                      alt="Super"
                      width={68}
                      height={18}
                      className="h-4 w-auto object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium text-neutral-500 sm:text-sm">
                    Học sử dụng một số cụm từ quan trọng để cải thiện kỹ năng nói
                  </p>
                </div>

                <div className="shrink-0">
                  <Image
                    src="/assets/practice-speak.png"
                    alt="Luyện nói"
                    width={58}
                    height={58}
                    className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                  />
                </div>
              </Link>

              {/* Luyen nghe (anh 5) */}
              <Link
                href="/lesson/practice?mode=listen"
                prefetch
                className="flex items-center justify-between gap-4 rounded-2xl border-2 border-b-4 border-slate-200 bg-white p-4 transition hover:bg-slate-50 active:translate-y-0.5 active:border-b-2 sm:p-5"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-black text-neutral-800 sm:text-lg">
                      Luyện nghe
                    </h3>
                    <Image
                      src="/assets/super-badge.png"
                      alt="Super"
                      width={68}
                      height={18}
                      className="h-4 w-auto object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium text-neutral-500 sm:text-sm">
                    Trau dồi kỹ năng nghe với bài học tập trung âm thanh
                  </p>
                </div>

                <div className="shrink-0">
                  <Image
                    src="/assets/practice-listen.png"
                    alt="Luyện nghe"
                    width={58}
                    height={58}
                    className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                  />
                </div>
              </Link>
            </div>
          </section>

          {/* Phan 3: Goc hoc tap */}
          <section>
            <h2 className="mb-3 text-xl font-black text-neutral-800 sm:text-2xl">
              Góc học tập
            </h2>

            <div className="space-y-3">
              {/* Tu vung (anh 6) */}
              <Link
                href="/practice/vocab"
                prefetch
                className="relative flex items-center justify-between gap-4 rounded-2xl border-2 border-b-4 border-slate-200 bg-white p-4 transition hover:bg-slate-50 active:translate-y-0.5 active:border-b-2 sm:p-5"
              >
                <span className="absolute -top-2.5 right-4 rounded-full bg-[#ff4b4b] px-2.5 py-0.5 text-[11px] font-black text-white shadow-xs">
                  {vocabBadge}
                </span>

                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-black text-neutral-800 sm:text-lg">
                      Từ vựng
                    </h3>
                    <Image
                      src="/assets/super-badge.png"
                      alt="Super"
                      width={68}
                      height={18}
                      className="h-4 w-auto object-contain"
                    />
                  </div>
                  <p className="text-xs font-medium text-neutral-500 sm:text-sm">
                    Ôn tập từ vựng tiếng Anh của riêng bạn bất kỳ lúc nào
                  </p>
                </div>

                <div className="shrink-0">
                  <Image
                    src="/assets/practice-vocab.png"
                    alt="Từ vựng"
                    width={58}
                    height={58}
                    className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                  />
                </div>
              </Link>

              {/* Kho truyen (anh 7) */}
              <Link
                href="/practice/stories"
                prefetch
                className="flex items-center justify-between gap-4 rounded-2xl border-2 border-b-4 border-slate-200 bg-white p-4 transition hover:bg-slate-50 active:translate-y-0.5 active:border-b-2 sm:p-5"
              >
                <div className="min-w-0 flex-1 space-y-1.5">
                  <h3 className="text-base font-black text-neutral-800 sm:text-lg">
                    Kho truyện
                  </h3>
                  <p className="text-xs font-medium text-neutral-500 sm:text-sm">
                    Đọc lại những mẫu chuyện ngắn để ôn tập từ vựng trong ngữ
                    cảnh
                  </p>
                </div>

                <div className="shrink-0">
                  <Image
                    src="/assets/practice-story.png"
                    alt="Kho truyện"
                    width={58}
                    height={58}
                    className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                  />
                </div>
              </Link>

              {/* On tap loi sai (anh 8) */}
              {mistakesCount > 0 ? (
                <Link
                  href="/lesson/practice?mode=mistakes"
                  prefetch
                  className="flex items-center justify-between gap-4 rounded-2xl border-2 border-b-4 border-amber-300 bg-amber-50/40 p-4 transition hover:bg-amber-50 active:translate-y-0.5 active:border-b-2 sm:p-5"
                >
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-black text-neutral-800 sm:text-lg">
                        Ôn tập lỗi sai ({mistakesCount})
                      </h3>
                      <Image
                        src="/assets/super-badge.png"
                        alt="Super"
                        width={68}
                        height={18}
                        className="h-4 w-auto object-contain"
                      />
                    </div>
                    <p className="text-xs font-medium text-neutral-600 sm:text-sm">
                      Luyện tập lại những câu bạn đã làm sai để ghi nhớ chắc chắn
                    </p>
                  </div>

                  <div className="shrink-0">
                    <Image
                      src="/assets/practice-mistakes.png"
                      alt="Lỗi sai"
                      width={58}
                      height={58}
                      className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                    />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center justify-between gap-4 rounded-2xl border-2 border-slate-200 bg-slate-50/60 p-4 sm:p-5">
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-black text-neutral-400 sm:text-lg">
                        Đã ôn tất cả lỗi sai
                      </h3>
                      <Image
                        src="/assets/super-badge.png"
                        alt="Super"
                        width={68}
                        height={18}
                        className="h-4 w-auto object-contain opacity-65"
                      />
                    </div>
                    <p className="text-xs font-medium text-neutral-400 sm:text-sm">
                      Hãy học tiếp và quay lại để luyện tập sau nhé
                    </p>
                  </div>

                  <div className="shrink-0 opacity-75">
                    <Image
                      src="/assets/practice-mistakes.png"
                      alt="Đã ôn lỗi sai"
                      width={58}
                      height={58}
                      className="h-12 w-12 object-contain sm:h-14 sm:w-14"
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default PracticePage;
