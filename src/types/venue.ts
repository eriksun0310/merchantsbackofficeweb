/** 店家類型 */
export enum BusinessCategory {
  RESTAURANT = 1, // 餐廳
  HOSPITAL = 2, // 醫院
  SALON = 3, // 美容院
  HOTEL = 4, // 飯店
}

/** 店家類型中文名稱 */
export const BusinessCategoryLabels: Record<BusinessCategory, string> = {
  [BusinessCategory.RESTAURANT]: '餐廳',
  [BusinessCategory.HOSPITAL]: '醫院',
  [BusinessCategory.SALON]: '美容院',
  [BusinessCategory.HOTEL]: '飯店',
};

/** 店家狀態 */
export enum BusinessStatus {
  PENDING = 0, // 待審核
  ACTIVE = 1, // 營業中
  INACTIVE = 2, // 暫停營業
  CLOSED = 3, // 已關閉
}

/** 店家狀態中文名稱 */
export const BusinessStatusLabels: Record<BusinessStatus, string> = {
  [BusinessStatus.PENDING]: '待審核',
  [BusinessStatus.ACTIVE]: '營業中',
  [BusinessStatus.INACTIVE]: '暫停營業',
  [BusinessStatus.CLOSED]: '已關閉',
};

/** 寵物落地規定 */
export enum PetGroundingRuleType {
  UNKNOWN = 0, // 不確定
  ALLOWED_WITH_LEASH = 1, // 可落地需牽繩
  CARRIER_REQUIRED = 2, // 需推車/籠子
}

/** 寵物落地規定中文名稱 */
export const PetGroundingRuleTypeLabels: Record<PetGroundingRuleType, string> = {
  [PetGroundingRuleType.UNKNOWN]: '不確定',
  [PetGroundingRuleType.ALLOWED_WITH_LEASH]: '可落地，需牽繩',
  [PetGroundingRuleType.CARRIER_REQUIRED]: '需使用推車或籠子',
};

/** 預約方式 */
export enum ReservationMethod {
  QUEUE = 1, // 排隊
  ONLINE = 2, // 線上
  PHONE = 3, // 電話
}

/** 預約方式中文名稱 */
export const ReservationMethodLabels: Record<ReservationMethod, string> = {
  [ReservationMethod.QUEUE]: '現場排隊',
  [ReservationMethod.ONLINE]: '線上預約',
  [ReservationMethod.PHONE]: '電話預約',
};

/** 位置座標 */
export type Location = {
  latitude: number;
  longitude: number;
};

/** 評分摘要 */
export type RatingSummary = {
  averageRating: number;
  totalReviews: number;
};

/** 營業動作權限 */
export type BusinessActions = {
  canEdit: boolean;
  canDelete: boolean;
  canToggleStatus: boolean;
};

/** 營業時段 */
export type OpeningPeriod = {
  openTime: string; // "09:00"
  closeTime: string; // "18:00"
};

/** 每日營業時間 */
export type DailyOpeningHours = {
  dayType: number; // 1-7 (週一到週日)
  periods: OpeningPeriod[]; // 可多時段
};

/** 星期幾中文名稱 */
export const DayTypeLabels: Record<number, string> = {
  1: '週一',
  2: '週二',
  3: '週三',
  4: '週四',
  5: '週五',
  6: '週六',
  7: '週日',
};

/** 毛孩友善標籤 */
export type VenueTag = {
  id: string;
  name: string;
};

/** 完整店家資料 */
export type Venue = {
  id: string;
  name: string;
  categoryType: BusinessCategory;
  location: Location;
  ratingSummary: RatingSummary;
  status: BusinessStatus;
  address: string;
  phone?: string;
  images: string[];
  actions: BusinessActions;
  openingHours: DailyOpeningHours[];
  googleMapsUrl?: string;
  warningUrl?: string;
  website?: string;
  description?: string;
  petGroundingRuleType?: PetGroundingRuleType;
  reservationMethods?: ReservationMethod[];
  tags?: VenueTag[];
  createdAt: string;
  updatedAt: string;
};

/** 店家列表項目 (精簡版) */
export type VenueListItem = Pick<
  Venue,
  'id' | 'name' | 'categoryType' | 'address' | 'status' | 'images'
>;

/** 店家編輯表單資料 */
export type VenueEditFormData = {
  categoryType: BusinessCategory;
  location: Location;
  address: string;
  phone?: string;
  images: string[];
  openingHours: DailyOpeningHours[];
  googleMapsUrl?: string;
  website?: string;
  description?: string;
  petGroundingRuleType?: PetGroundingRuleType;
  reservationMethods?: ReservationMethod[];
  tagIds?: string[];
};
