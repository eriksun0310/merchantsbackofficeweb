import {
  Venue,
  BusinessCategory,
  BusinessStatus,
  PetGroundingRuleType,
  ReservationMethod,
} from '@/types/venue';

export const mockVenues: Venue[] = [
  {
    id: '1',
    name: '毛孩咖啡廳',
    categoryType: BusinessCategory.RESTAURANT,
    location: { latitude: 25.0339, longitude: 121.5619 },
    ratingSummary: { averageRating: 4.5, totalReviews: 128 },
    status: BusinessStatus.ACTIVE,
    address: '台北市大安區復興南路一段 123 號',
    phone: '02-1234-5678',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
      'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=400',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    ],
    actions: { canEdit: true, canDelete: true, canToggleStatus: true },
    openingHours: [
      { dayType: 1, periods: [{ openTime: '09:00', closeTime: '18:00' }] },
      { dayType: 2, periods: [{ openTime: '09:00', closeTime: '18:00' }] },
      { dayType: 3, periods: [{ openTime: '09:00', closeTime: '18:00' }] },
      { dayType: 4, periods: [{ openTime: '09:00', closeTime: '18:00' }] },
      { dayType: 5, periods: [{ openTime: '09:00', closeTime: '21:00' }] },
      { dayType: 6, periods: [{ openTime: '10:00', closeTime: '22:00' }] },
      { dayType: 7, periods: [{ openTime: '10:00', closeTime: '20:00' }] },
    ],
    googleMapsUrl: 'https://maps.google.com/?q=25.0339,121.5619',
    website: 'https://example.com/pet-cafe',
    description:
      '歡迎帶毛孩一起來享用美味咖啡！我們提供寬敞的戶外座位區，讓您的毛孩可以自由活動。店內也備有寵物餐點，讓毛孩也能享受美食時光。',
    petGroundingRuleType: PetGroundingRuleType.ALLOWED_WITH_LEASH,
    reservationMethods: [ReservationMethod.QUEUE, ReservationMethod.ONLINE],
    tags: [
      { id: 't1', name: '大型犬友善' },
      { id: 't2', name: '提供寵物餐' },
      { id: 't3', name: '有戶外座位' },
    ],
    createdAt: '2024-01-15T08:00:00Z',
    updatedAt: '2024-03-20T10:30:00Z',
  },
  {
    id: '2',
    name: '寵物美容坊',
    categoryType: BusinessCategory.SALON,
    location: { latitude: 25.0478, longitude: 121.5171 },
    ratingSummary: { averageRating: 4.8, totalReviews: 256 },
    status: BusinessStatus.ACTIVE,
    address: '新北市板橋區文化路二段 456 號',
    phone: '02-8765-4321',
    images: [
      'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400',
      'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=400',
    ],
    actions: { canEdit: true, canDelete: true, canToggleStatus: true },
    openingHours: [
      { dayType: 1, periods: [{ openTime: '10:00', closeTime: '19:00' }] },
      { dayType: 2, periods: [{ openTime: '10:00', closeTime: '19:00' }] },
      { dayType: 3, periods: [] }, // 公休
      { dayType: 4, periods: [{ openTime: '10:00', closeTime: '19:00' }] },
      { dayType: 5, periods: [{ openTime: '10:00', closeTime: '19:00' }] },
      { dayType: 6, periods: [{ openTime: '09:00', closeTime: '20:00' }] },
      { dayType: 7, periods: [{ openTime: '09:00', closeTime: '18:00' }] },
    ],
    googleMapsUrl: 'https://maps.google.com/?q=25.0478,121.5171',
    website: 'https://example.com/pet-salon',
    description:
      '專業寵物美容服務，提供洗澡、剪毛、造型設計等服務。我們使用天然無刺激的洗毛精，讓您的毛孩舒適又漂亮。',
    petGroundingRuleType: PetGroundingRuleType.CARRIER_REQUIRED,
    reservationMethods: [ReservationMethod.PHONE, ReservationMethod.ONLINE],
    tags: [
      { id: 't6', name: '寵物美容' },
      { id: 't13', name: '有冷氣空間' },
    ],
    createdAt: '2024-02-01T09:00:00Z',
    updatedAt: '2024-03-18T14:20:00Z',
  },
  {
    id: '3',
    name: '汪汪旅館',
    categoryType: BusinessCategory.HOTEL,
    location: { latitude: 24.1477, longitude: 120.6736 },
    ratingSummary: { averageRating: 4.6, totalReviews: 89 },
    status: BusinessStatus.ACTIVE,
    address: '台中市西區民生路 789 號',
    phone: '04-2222-3333',
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
    ],
    actions: { canEdit: true, canDelete: true, canToggleStatus: true },
    openingHours: [
      {
        dayType: 1,
        periods: [{ openTime: '00:00', closeTime: '23:59' }],
      },
      {
        dayType: 2,
        periods: [{ openTime: '00:00', closeTime: '23:59' }],
      },
      {
        dayType: 3,
        periods: [{ openTime: '00:00', closeTime: '23:59' }],
      },
      {
        dayType: 4,
        periods: [{ openTime: '00:00', closeTime: '23:59' }],
      },
      {
        dayType: 5,
        periods: [{ openTime: '00:00', closeTime: '23:59' }],
      },
      {
        dayType: 6,
        periods: [{ openTime: '00:00', closeTime: '23:59' }],
      },
      {
        dayType: 7,
        periods: [{ openTime: '00:00', closeTime: '23:59' }],
      },
    ],
    googleMapsUrl: 'https://maps.google.com/?q=24.1477,120.6736',
    website: 'https://example.com/pet-hotel',
    description:
      '提供舒適的寵物住宿環境，24小時專人照護。設有獨立房間、戶外活動區，讓您的毛孩在您外出時也能享受愉快的假期。',
    petGroundingRuleType: PetGroundingRuleType.ALLOWED_WITH_LEASH,
    reservationMethods: [ReservationMethod.ONLINE, ReservationMethod.PHONE],
    tags: [
      { id: 't7', name: '24小時營業' },
      { id: 't8', name: '可寄放寵物' },
      { id: 't9', name: '有寵物遊樂區' },
      { id: 't1', name: '大型犬友善' },
    ],
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-03-15T16:45:00Z',
  },
  {
    id: '4',
    name: '毛小孩動物醫院',
    categoryType: BusinessCategory.HOSPITAL,
    location: { latitude: 25.0329, longitude: 121.5654 },
    ratingSummary: { averageRating: 4.9, totalReviews: 412 },
    status: BusinessStatus.ACTIVE,
    address: '台北市信義區忠孝東路五段 100 號',
    phone: '02-2727-8888',
    images: [
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',
    ],
    actions: { canEdit: true, canDelete: true, canToggleStatus: true },
    openingHours: [
      {
        dayType: 1,
        periods: [
          { openTime: '09:00', closeTime: '12:00' },
          { openTime: '14:00', closeTime: '20:00' },
        ],
      },
      {
        dayType: 2,
        periods: [
          { openTime: '09:00', closeTime: '12:00' },
          { openTime: '14:00', closeTime: '20:00' },
        ],
      },
      {
        dayType: 3,
        periods: [
          { openTime: '09:00', closeTime: '12:00' },
          { openTime: '14:00', closeTime: '20:00' },
        ],
      },
      {
        dayType: 4,
        periods: [
          { openTime: '09:00', closeTime: '12:00' },
          { openTime: '14:00', closeTime: '20:00' },
        ],
      },
      {
        dayType: 5,
        periods: [
          { openTime: '09:00', closeTime: '12:00' },
          { openTime: '14:00', closeTime: '20:00' },
        ],
      },
      { dayType: 6, periods: [{ openTime: '09:00', closeTime: '17:00' }] },
      { dayType: 7, periods: [] }, // 公休
    ],
    googleMapsUrl: 'https://maps.google.com/?q=25.0329,121.5654',
    website: 'https://example.com/pet-hospital',
    description:
      '專業獸醫團隊，提供一般門診、預防注射、健康檢查、手術等服務。我們用心照護每一位毛孩的健康。',
    petGroundingRuleType: PetGroundingRuleType.CARRIER_REQUIRED,
    reservationMethods: [ReservationMethod.PHONE, ReservationMethod.QUEUE],
    tags: [
      { id: 't15', name: '專業獸醫駐點' },
      { id: 't4', name: '免費停車' },
      { id: 't5', name: '無障礙空間' },
    ],
    createdAt: '2023-12-01T08:00:00Z',
    updatedAt: '2024-03-22T11:00:00Z',
  },
  {
    id: '5',
    name: '喵星人餐廳',
    categoryType: BusinessCategory.RESTAURANT,
    location: { latitude: 25.0418, longitude: 121.5449 },
    ratingSummary: { averageRating: 4.3, totalReviews: 67 },
    status: BusinessStatus.INACTIVE,
    address: '台北市中山區南京東路二段 50 號',
    phone: '02-2567-1234',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400',
    ],
    actions: { canEdit: true, canDelete: true, canToggleStatus: true },
    openingHours: [
      { dayType: 1, periods: [{ openTime: '11:00', closeTime: '21:00' }] },
      { dayType: 2, periods: [{ openTime: '11:00', closeTime: '21:00' }] },
      { dayType: 3, periods: [{ openTime: '11:00', closeTime: '21:00' }] },
      { dayType: 4, periods: [{ openTime: '11:00', closeTime: '21:00' }] },
      { dayType: 5, periods: [{ openTime: '11:00', closeTime: '22:00' }] },
      { dayType: 6, periods: [{ openTime: '10:00', closeTime: '22:00' }] },
      { dayType: 7, periods: [{ openTime: '10:00', closeTime: '21:00' }] },
    ],
    googleMapsUrl: 'https://maps.google.com/?q=25.0418,121.5449',
    description: '貓咪主題餐廳，店內有多隻可愛店貓陪伴用餐。提供輕食、飲品，適合喜愛貓咪的朋友們。',
    petGroundingRuleType: PetGroundingRuleType.CARRIER_REQUIRED,
    reservationMethods: [ReservationMethod.ONLINE],
    tags: [
      { id: 't12', name: '貓咪友善' },
      { id: 't11', name: '小型犬專屬' },
    ],
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-03-10T08:30:00Z',
  },
];
