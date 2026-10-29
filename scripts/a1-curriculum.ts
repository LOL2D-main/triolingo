import type { Exercise, VocabItem } from "../lib/exercise-types";

export type SeedChallenge = {
  type: "EXERCISE" | "SELECT" | "ASSIST";
  question: string;
  order: number;
  payload: Exercise;
  options: {
    text: string;
    correct: boolean;
    imageSrc?: string | null;
    audioSrc?: string | null;
  }[];
};

export type SeedLesson = {
  title: string;
  order: number;
  vocab: VocabItem[];
  challenges: SeedChallenge[];
};

export type SeedUnit = {
  title: string;
  description: string;
  order: number;
  lessons: SeedLesson[];
};

// Helper tao nhanh cau hoi Choice voi nhan vat
export function makeChoice(
  title: string,
  prompt: string,
  ans: string,
  wrong1: string,
  wrong2: string,
  wrong3?: string,
  extra?: {
    speaker?: "mascot" | "boy" | "girl" | "man" | "woman" | "robot" | "zombie";
    meaning?: string;
  }
): SeedChallenge {
  const options = [
    { text: ans, correct: true },
    { text: wrong1, correct: false },
    { text: wrong2, correct: false },
    ...(wrong3 ? [{ text: wrong3, correct: false }] : []),
  ];

  const payload: Exercise = {
    kind: "choice",
    title,
    prompt,
    audio: prompt,
    speaker: extra?.speaker || "mascot",
    options,
    meaning: extra?.meaning,
  };

  return {
    type: "EXERCISE",
    question: title,
    order: 0,
    payload,
    options,
  };
}

// Helper Listen and Type
export function makeListenType(
  sentence: string,
  meaning: string,
  speaker: "mascot" | "boy" | "girl" | "man" | "woman" | "robot" | "zombie" = "girl"
): SeedChallenge {
  const payload: Exercise = {
    kind: "listen-type",
    audio: sentence,
    speaker,
    meaning,
  };

  return {
    type: "EXERCISE",
    question: `Nghe và gõ lại câu tiếng Anh`,
    order: 0,
    payload,
    options: [{ text: sentence, correct: true }],
  };
}

// Helper Real vs Fake word (DET Read and Select)
export function makeRealWord(
  word: string,
  isReal: boolean,
  meaning?: string
): SeedChallenge {
  const payload: Exercise = {
    kind: "real-word",
    word,
    isReal,
    meaning,
  };

  return {
    type: "EXERCISE",
    question: `Từ "${word}" có phải là từ tiếng Anh có nghĩa?`,
    order: 0,
    payload,
    options: [
      { text: "Có", correct: isReal },
      { text: "Không", correct: !isReal },
    ],
  };
}

// Helper Fill in the Blanks / Letters (DET)
export function makeFillLetters(
  before: string,
  prefix: string,
  answer: string,
  after: string,
  meaning: string,
  speaker: "mascot" | "boy" | "girl" | "man" | "woman" | "robot" | "zombie" = "boy"
): SeedChallenge {
  const payload: Exercise = {
    kind: "fill-letters",
    before,
    prefix,
    answer,
    after,
    meaning,
  };

  return {
    type: "EXERCISE",
    question: `Điền các chữ cái còn thiếu để hoàn chỉnh từ`,
    order: 0,
    payload,
    options: [{ text: prefix + answer, correct: true }],
  };
}

// Helper Build Sentence (Ghep tu thanh cau)
export function makeBuild(
  promptVi: string,
  answer: string,
  bank: string[],
  speaker: "mascot" | "boy" | "girl" | "man" | "woman" | "robot" | "zombie" = "man"
): SeedChallenge {
  const payload: Exercise = {
    kind: "build",
    promptVi,
    answer,
    bank,
    speaker,
  };

  return {
    type: "EXERCISE",
    question: `Sắp xếp các từ để dịch câu: "${promptVi}"`,
    order: 0,
    payload,
    options: [{ text: answer, correct: true }],
  };
}

// Helper Type Missing word
export function makeTypeMissing(
  sentence: string,
  answer: string,
  meaning: string,
  speaker: "mascot" | "boy" | "girl" | "man" | "woman" | "robot" | "zombie" = "woman"
): SeedChallenge {
  const payload: Exercise = {
    kind: "type-missing",
    sentence,
    answer,
    meaning,
    speaker,
  };

  return {
    type: "EXERCISE",
    question: `Điền từ thích hợp vào chỗ trống`,
    order: 0,
    payload,
    options: [{ text: answer, correct: true }],
  };
}

// Moi bai hoc khoang 12 cau hoi
export const MAX_QUESTIONS_PER_LESSON = 12;

// Helper gan so thu tu order 1, 2, 3... cho cac cau hoi
export function packChallenges(...items: SeedChallenge[]): SeedChallenge[] {
  return items
    .slice(0, MAX_QUESTIONS_PER_LESSON)
    .map((c, i) => ({ ...c, order: i + 1 }));
}
