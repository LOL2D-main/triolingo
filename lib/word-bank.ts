/**
 * Tao ngan hang tu (word bank) kieu Duolingo cho cac bai "Nghe va dien"
 * va "Hoan thanh cau". Ket qua on dinh (khong doi giua cac lan render).
 */

const FUNCTION_WORDS = [
  "the", "and", "with", "very", "today", "always", "never", "her", "they",
  "where", "what", "can", "not", "is", "are", "for", "from", "some", "your",
  "his", "this", "that", "but", "or", "at", "on", "in", "we", "you", "my",
];

const CONTENT_WORDS = [
  "apple", "book", "water", "happy", "green", "school", "friend", "table",
  "morning", "music", "house", "street", "market", "winter", "orange",
  "window", "coffee", "family", "bridge", "garden", "pencil", "yellow",
  "doctor", "ticket", "dinner", "summer", "teacher", "city", "rain", "night",
  "plane", "country", "evening", "mouth", "kitchen", "pocket", "monday",
  "flower", "chicken", "bottle",
];

function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seededShuffle<T>(items: T[], seed: string): T[] {
  const rand = mulberry32(hashSeed(seed));
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const stripEdges = (w: string) => w.replace(/^[^\w']+|[^\w']+$/g, "");

/** Cac tu cua cau (bo dau cau o hai dau tu). */
export function sentenceWords(sentence: string): string[] {
  return sentence.split(/\s+/).map(stripEdges).filter(Boolean);
}

function pickExtras(pool: string[], exclude: Set<string>, count: number, seed: string) {
  return seededShuffle(
    pool.filter((w) => !exclude.has(w.toLowerCase())),
    seed + "#extras"
  ).slice(0, count);
}

/** Ngan hang tu cho bai Nghe va dien: cac tu cua cau + 3 tu gay nhieu. */
export function buildListenBank(sentence: string): string[] {
  const words = sentenceWords(sentence);
  const exclude = new Set(words.map((w) => w.toLowerCase()));
  const extras = pickExtras(FUNCTION_WORDS, exclude, 3, sentence);
  return seededShuffle([...words, ...extras], sentence);
}

/** 4 lua chon cho bai Hoan thanh cau: dap an + 3 tu gay nhieu. */
export function buildWordChoices(answer: string, sentence: string): string[] {
  const exclude = new Set([
    answer.toLowerCase(),
    ...sentenceWords(sentence).map((w) => w.toLowerCase()),
  ]);
  const extras = pickExtras(CONTENT_WORDS, exclude, 3, answer + sentence);
  return seededShuffle([answer, ...extras], answer + sentence);
}
