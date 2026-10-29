/**
 * Mo hinh bai tap dung chung cho du lieu seed, may chu va giao dien lam bai.
 * Moi bai tap duoc luu duoi dang JSON trong cot challenges.payload.
 */

export type SpeakerId =
  | "mascot"
  | "boy"
  | "girl"
  | "man"
  | "woman"
  | "robot"
  | "zombie";

export type VocabItem = {
  en: string;
  vi: string;
  /** Cau vi du ngan */
  example?: { en: string; vi: string };
  /** Hinh minh hoa (duong dan trong /public) */
  image?: string;
};

export type ChoiceOption = {
  text: string;
  correct: boolean;
  imageSrc?: string | null;
};

export type Exercise =
  /** Chon dap an (dung cho chon nghia, nghe chon tu, bai cu cu). */
  | {
      kind: "choice";
      title: string;
      /** Noi dung tieng Anh hien thi ben trong bong thoai (neu co) */
      prompt?: string;
      /** Chuoi tieng Anh se duoc doc khi bam nut loa */
      audio?: string;
      /** Giu kin chu, chi cho nghe */
      hideText?: boolean;
      speaker?: SpeakerId;
      options: ChoiceOption[];
      /** Nghia tieng Viet hien o phan phan hoi */
      meaning?: string;
    }
  /** Nghe va go lai cau (Listen and Type). */
  | {
      kind: "listen-type";
      audio: string;
      speaker: SpeakerId;
      meaning: string;
    }
  /** Tu nay co phai tu tieng Anh that khong? (Read and Select). */
  | {
      kind: "real-word";
      word: string;
      isReal: boolean;
      meaning?: string;
    }
  /** Go tu con thieu trong cau. */
  | {
      kind: "type-missing";
      /** Cau co dau ___ o cho trong */
      sentence: string;
      answer: string;
      speaker: SpeakerId;
      meaning: string;
    }
  /** Dien not cac chu cai con thieu (Fill in the Blanks cua DET). */
  | {
      kind: "fill-letters";
      /** Phan dau cua cau */
      before: string;
      /** Cac chu cai da cho san cua tu */
      prefix: string;
      /** Tu day du */
      answer: string;
      /** Phan sau cua cau */
      after: string;
      meaning: string;
    }
  /** Sap xep tu thanh cau tieng Anh. */
  | {
      kind: "build";
      /** Cau tieng Viet can dich */
      promptVi: string;
      answer: string;
      /** Cac tu trong ngan hang tu (da gom ca tu gay nhieu) */
      bank: string[];
      speaker: SpeakerId;
    }
  /** Viet cau tra loi tu do (Write about the photo / dich tu). */
  | {
      kind: "write";
      title: string;
      image?: string;
      promptVi?: string;
      /** Cac cau tra loi duoc chap nhan (khong phan biet hoa thuong) */
      accepted: string[];
      meaning: string;
    }
  /** Doc to cau (Read Aloud / Listen then Speak). */
  | {
      kind: "speak";
      text: string;
      meaning: string;
      speaker: SpeakerId;
      /** An chu, chi nghe roi noi lai */
      hideText?: boolean;
    };

export type ExerciseKind = Exercise["kind"];

export type ExerciseResult = {
  /** Da san sang bam Kiem tra */
  ready: boolean;
  correct: boolean;
  /** Dap an dung de hien thi khi tra loi sai */
  correctText?: string;
};

export type LessonVocab = VocabItem[];
