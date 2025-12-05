/** 評論者資訊 */
export type Reviewer = {
  id: string;
  name: string;
  avatarUrl?: string;
};

/** 店家簡易資訊 (評論中引用) */
export type CommentVenue = {
  id: string;
  name: string;
};

/** 寵物物種 */
export enum PetSpecies {
  DOG = 1,
  CAT = 2,
  OTHER = 3,
}

/** 寵物物種中文名稱 */
export const PetSpeciesLabels: Record<PetSpecies, string> = {
  [PetSpecies.DOG]: '狗',
  [PetSpecies.CAT]: '貓',
  [PetSpecies.OTHER]: '其他',
};

/** 寵物資訊 */
export type PetInfo = {
  id: string;
  name: string;
  species: PetSpecies;
  breed?: string; // 品種
};

/** 寵物友善程度 1=低, 2=中, 3=高 */
export type PetFriendlyLevel = 1 | 2 | 3;

/** 寵物友善程度中文名稱 */
export const PetFriendlyLevelLabels: Record<PetFriendlyLevel, string> = {
  1: '低',
  2: '中',
  3: '高',
};

/** 評價類型 */
export enum FeedbackType {
  PAW = 1, // 腳掌 (正評)
  POOP = 2, // 大便 (負評)
}

/** 評價類型中文名稱 */
export const FeedbackTypeLabels: Record<FeedbackType, string> = {
  [FeedbackType.PAW]: '腳掌',
  [FeedbackType.POOP]: '大便',
};

/** 評價 */
export type Feedback = {
  type: FeedbackType;
};

/** 附加檔案 */
export type CommentFile = {
  id: string;
  url: string;
  thumbnailUrl?: string;
};

/** 評論項目 */
export type CommentItem = {
  id: string;
  reviewer: Reviewer;
  venue: CommentVenue;
  petInfo: PetInfo | null;
  petFriendlyLevel: PetFriendlyLevel;
  feedback: Feedback;
  content: string;
  files: CommentFile[];
  updateTime: string; // ISO 格式
};
