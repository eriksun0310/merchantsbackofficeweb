import { z } from 'zod';
import {
  BusinessCategory,
  PetGroundingRuleType,
  ReservationMethod,
} from '@/types/venue';

/** 營業時段 Schema */
const openingPeriodSchema = z.object({
  openTime: z.string().regex(/^\d{2}:\d{2}$/, '時間格式不正確'),
  closeTime: z.string().regex(/^\d{2}:\d{2}$/, '時間格式不正確'),
});

/** 每日營業時間 Schema */
const dailyOpeningHoursSchema = z.object({
  dayType: z.number().min(1).max(7),
  periods: z.array(openingPeriodSchema),
});

/** 店家編輯表單 Schema */
export const venueFormSchema = z.object({
  categoryType: z.nativeEnum(BusinessCategory, {
    message: '請選擇店家類型',
  }),

  address: z
    .string()
    .min(1, '請輸入地址')
    .max(200, '地址不可超過 200 字'),

  phone: z
    .string()
    .regex(/^[\d\-\+\(\)\s]*$/, '電話格式不正確')
    .optional()
    .or(z.literal('')),

  location: z.object({
    latitude: z
      .number({ message: '請輸入有效的緯度' })
      .min(-90, '緯度範圍 -90 至 90')
      .max(90, '緯度範圍 -90 至 90'),
    longitude: z
      .number({ message: '請輸入有效的經度' })
      .min(-180, '經度範圍 -180 至 180')
      .max(180, '經度範圍 -180 至 180'),
  }),

  googleMapsUrl: z
    .string()
    .url('請輸入有效的網址')
    .optional()
    .or(z.literal('')),

  website: z
    .string()
    .url('請輸入有效的網址')
    .optional()
    .or(z.literal('')),

  description: z
    .string()
    .max(1000, '描述不可超過 1000 字')
    .optional()
    .or(z.literal('')),

  images: z.array(z.string()).max(10, '最多上傳 10 張圖片'),

  openingHours: z.array(dailyOpeningHoursSchema),

  petGroundingRuleType: z.nativeEnum(PetGroundingRuleType).optional(),

  reservationMethods: z.array(z.nativeEnum(ReservationMethod)).optional(),

  tagIds: z.array(z.string()).optional(),
});

export type VenueFormValues = z.infer<typeof venueFormSchema>;

/** 將 Venue 轉換為表單初始值 */
export function venueToFormValues(venue: {
  categoryType: BusinessCategory;
  address: string;
  phone?: string;
  location: { latitude: number; longitude: number };
  googleMapsUrl?: string;
  website?: string;
  description?: string;
  images: string[];
  openingHours: { dayType: number; periods: { openTime: string; closeTime: string }[] }[];
  petGroundingRuleType?: PetGroundingRuleType;
  reservationMethods?: ReservationMethod[];
  tags?: { id: string; name: string }[];
}): VenueFormValues {
  return {
    categoryType: venue.categoryType,
    address: venue.address,
    phone: venue.phone ?? '',
    location: venue.location,
    googleMapsUrl: venue.googleMapsUrl ?? '',
    website: venue.website ?? '',
    description: venue.description ?? '',
    images: venue.images,
    openingHours: venue.openingHours,
    petGroundingRuleType: venue.petGroundingRuleType,
    reservationMethods: venue.reservationMethods ?? [],
    tagIds: venue.tags?.map((t) => t.id) ?? [],
  };
}
