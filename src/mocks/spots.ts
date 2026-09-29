import type { Spot } from '@/features/spots/types.ts'

export const spots: Spot[] = [
  {
    id: 'shinjuku-gyoen',
    name: '新宿御苑',
    category: '公園',
    latitude: 35.6852,
    longitude: 139.71,
    description: '新宿にある広大な公園。次の地図表示でピン位置の基準に使う。',
  },
  {
    id: 'takashimaya',
    name: '新宿タカシマヤ',
    category: '買い物',
    latitude: 35.6895,
    longitude: 139.703,
    description: '新宿駅南口の百貨店。屋内スポットの表示例にする。',
  },
  {
    id: 'golden-gai',
    name: 'ゴールデン街',
    category: 'グルメ',
    latitude: 35.6938,
    longitude: 139.7081,
    description: '小さな飲食店が集まる横丁。密集ピンの表示例にする。',
  },
  {
    id: 'tocho',
    name: '東京都庁',
    category: '展望',
    latitude: 35.6895,
    longitude: 139.6917,
    description: '展望室がある高層ビル。3D建物表示の目印にする。',
  },
  {
    id: 'hanazono',
    name: '花園神社',
    category: '神社',
    latitude: 35.6936,
    longitude: 139.7057,
    description: '新宿の中心にある神社。徒歩ルート案内の経由地例にする。',
  },
]

export function findSpot(spotId: string | undefined): Spot | undefined {
  return spots.find((spot) => spot.id === spotId)
}
