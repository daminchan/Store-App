/** 店舗情報を表す型 */
export type Store = {
  /** 店舗の一意のID */
  id: string;
  /** 店舗名 */
  name: string;
  /** 店舗の説明文 */
  description: string;
  /** 営業時間の配列 */
  businessHours: BusinessHours[];
  /** 店舗オーナーのClerk User ID */
  ownerId: string;
  /** 店舗のカテゴリー配列 (例: ["和食", "居酒屋"]) */
  categories: string[];
  /** 店舗情報の作成日時 */
  createdAt: Date;
  /** 店舗情報の最終更新日時 */
  updatedAt: Date;
};
/** 店舗の営業時間を表す型 */
export type BusinessHours = {
  /** 曜日 (0: 日曜日 - 6: 土曜日) */
  dayOfWeek: number;
  /** 開店時間 ("09:00" 形式) */
  openTime: string;
  /** 閉店時間 ("17:00" 形式) */
  closeTime: string;
};
