import {
  CommentItem,
  FeedbackType,
  PetSpecies,
} from '@/types/comment';

export const mockComments: CommentItem[] = [
  // 店家 1: 毛孩咖啡廳 的評論
  {
    id: 'c1',
    reviewer: {
      id: 'u1',
      name: '小明',
      avatarUrl: 'https://i.pravatar.cc/150?u=user1',
    },
    venue: {
      id: '1',
      name: '毛孩咖啡廳',
    },
    petInfo: {
      id: 'p1',
      name: '毛毛',
      species: PetSpecies.DOG,
      breed: '柴犬',
    },
    petFriendlyLevel: 3,
    feedback: { type: FeedbackType.PAW },
    content: '這間店超棒的！服務人員很親切，還特地幫我們準備了狗狗專用的水碗。戶外座位區很寬敞，毛毛可以自由走動，下次還會再來！',
    files: [
      {
        id: 'f1',
        url: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
        thumbnailUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100',
      },
      {
        id: 'f2',
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400',
        thumbnailUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100',
      },
    ],
    updateTime: '2024-03-20T10:30:00Z',
  },
  {
    id: 'c2',
    reviewer: {
      id: 'u2',
      name: '阿花',
      avatarUrl: 'https://i.pravatar.cc/150?u=user2',
    },
    venue: {
      id: '1',
      name: '毛孩咖啡廳',
    },
    petInfo: {
      id: 'p2',
      name: '咪咪',
      species: PetSpecies.CAT,
      breed: '英國短毛貓',
    },
    petFriendlyLevel: 2,
    feedback: { type: FeedbackType.PAW },
    content: '帶貓咪來用餐，店家有提供外出籠放置區，環境整潔舒適。不過假日人比較多，建議平日來會更放鬆。',
    files: [],
    updateTime: '2024-03-18T14:20:00Z',
  },
  {
    id: 'c3',
    reviewer: {
      id: 'u3',
      name: '王大哥',
      avatarUrl: 'https://i.pravatar.cc/150?u=user3',
    },
    venue: {
      id: '1',
      name: '毛孩咖啡廳',
    },
    petInfo: {
      id: 'p3',
      name: '黑皮',
      species: PetSpecies.DOG,
      breed: '拉布拉多',
    },
    petFriendlyLevel: 1,
    feedback: { type: FeedbackType.POOP },
    content: '大型犬進入有點限制，雖然說是大型犬友善，但實際座位空間不太夠，黑皮一直被要求待在固定位置。',
    files: [
      {
        id: 'f3',
        url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400',
        thumbnailUrl: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=100',
      },
    ],
    updateTime: '2024-03-15T09:00:00Z',
  },

  // 店家 2: 寵物美容坊 的評論
  {
    id: 'c4',
    reviewer: {
      id: 'u4',
      name: '小美',
      avatarUrl: 'https://i.pravatar.cc/150?u=user4',
    },
    venue: {
      id: '2',
      name: '寵物美容坊',
    },
    petInfo: {
      id: 'p4',
      name: '球球',
      species: PetSpecies.DOG,
      breed: '貴賓犬',
    },
    petFriendlyLevel: 3,
    feedback: { type: FeedbackType.PAW },
    content: '美容師技術超讚！球球剪完毛變得好可愛，而且全程都很溫柔，球球完全不緊張。價格也很合理，大推！',
    files: [
      {
        id: 'f4',
        url: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=400',
        thumbnailUrl: 'https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=100',
      },
      {
        id: 'f5',
        url: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=400',
        thumbnailUrl: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=100',
      },
    ],
    updateTime: '2024-03-19T16:45:00Z',
  },
  {
    id: 'c5',
    reviewer: {
      id: 'u5',
      name: '陳先生',
      avatarUrl: 'https://i.pravatar.cc/150?u=user5',
    },
    venue: {
      id: '2',
      name: '寵物美容坊',
    },
    petInfo: {
      id: 'p5',
      name: '小虎',
      species: PetSpecies.CAT,
      breed: '橘貓',
    },
    petFriendlyLevel: 3,
    feedback: { type: FeedbackType.PAW },
    content: '第一次帶貓來洗澡剪指甲，店員很有經驗，小虎雖然一開始有點緊張，但很快就被安撫下來了。',
    files: [],
    updateTime: '2024-03-17T11:30:00Z',
  },

  // 店家 3: 汪汪旅館 的評論
  {
    id: 'c6',
    reviewer: {
      id: 'u6',
      name: '林小姐',
      avatarUrl: 'https://i.pravatar.cc/150?u=user6',
    },
    venue: {
      id: '3',
      name: '汪汪旅館',
    },
    petInfo: {
      id: 'p6',
      name: '布丁',
      species: PetSpecies.DOG,
      breed: '法國鬥牛犬',
    },
    petFriendlyLevel: 3,
    feedback: { type: FeedbackType.PAW },
    content: '出國五天把布丁寄放在這裡，每天都會收到照片和影片更新，讓我很安心。回來接的時候布丁精神很好，看得出來有被好好照顧！',
    files: [
      {
        id: 'f6',
        url: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
        thumbnailUrl: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=100',
      },
    ],
    updateTime: '2024-03-22T08:00:00Z',
  },
  {
    id: 'c7',
    reviewer: {
      id: 'u7',
      name: '張太太',
      avatarUrl: 'https://i.pravatar.cc/150?u=user7',
    },
    venue: {
      id: '3',
      name: '汪汪旅館',
    },
    petInfo: {
      id: 'p7',
      name: '妞妞',
      species: PetSpecies.DOG,
      breed: '米克斯',
    },
    petFriendlyLevel: 2,
    feedback: { type: FeedbackType.PAW },
    content: '整體環境不錯，獨立房間很乾淨。唯一小缺點是戶外活動時間有點短，希望可以增加。',
    files: [],
    updateTime: '2024-03-10T15:20:00Z',
  },

  // 店家 4: 毛小孩動物醫院 的評論
  {
    id: 'c8',
    reviewer: {
      id: 'u8',
      name: '李媽媽',
      avatarUrl: 'https://i.pravatar.cc/150?u=user8',
    },
    venue: {
      id: '4',
      name: '毛小孩動物醫院',
    },
    petInfo: {
      id: 'p8',
      name: '豆豆',
      species: PetSpecies.DOG,
      breed: '馬爾濟斯',
    },
    petFriendlyLevel: 3,
    feedback: { type: FeedbackType.PAW },
    content: '王醫師超級細心！豆豆之前腸胃不好，經過治療後完全康復了。而且醫師會耐心解釋病情，讓我們很放心。',
    files: [],
    updateTime: '2024-03-21T10:00:00Z',
  },
  {
    id: 'c9',
    reviewer: {
      id: 'u9',
      name: '黃小弟',
      avatarUrl: 'https://i.pravatar.cc/150?u=user9',
    },
    venue: {
      id: '4',
      name: '毛小孩動物醫院',
    },
    petInfo: {
      id: 'p9',
      name: '肥肥',
      species: PetSpecies.CAT,
      breed: '波斯貓',
    },
    petFriendlyLevel: 3,
    feedback: { type: FeedbackType.PAW },
    content: '帶肥肥來打預防針，護士姊姊很溫柔，肥肥都沒有太緊張。等候區貓狗分開，這點很加分！',
    files: [
      {
        id: 'f7',
        url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
        thumbnailUrl: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=100',
      },
    ],
    updateTime: '2024-03-19T09:30:00Z',
  },
  {
    id: 'c10',
    reviewer: {
      id: 'u10',
      name: '趙先生',
    },
    venue: {
      id: '4',
      name: '毛小孩動物醫院',
    },
    petInfo: null,
    petFriendlyLevel: 2,
    feedback: { type: FeedbackType.POOP },
    content: '等待時間有點長，假日來的話要有心理準備。不過醫療品質還是值得信賴的。',
    files: [],
    updateTime: '2024-03-12T14:00:00Z',
  },

  // 店家 5: 喵星人餐廳 的評論
  {
    id: 'c11',
    reviewer: {
      id: 'u11',
      name: '周小妹',
      avatarUrl: 'https://i.pravatar.cc/150?u=user11',
    },
    venue: {
      id: '5',
      name: '喵星人餐廳',
    },
    petInfo: {
      id: 'p10',
      name: '花花',
      species: PetSpecies.CAT,
      breed: '美國短毛貓',
    },
    petFriendlyLevel: 2,
    feedback: { type: FeedbackType.PAW },
    content: '帶自己的貓來跟店貓玩，氣氛很歡樂！餐點普通但環境很療癒，適合貓奴來放鬆。',
    files: [
      {
        id: 'f8',
        url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400',
        thumbnailUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100',
      },
    ],
    updateTime: '2024-03-08T13:00:00Z',
  },
];

/** 根據店家 ID 取得評論列表 */
export function getCommentsByVenueId(venueId: string): CommentItem[] {
  return mockComments.filter((comment) => comment.venue.id === venueId);
}
