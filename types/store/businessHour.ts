/**
 * 営業時間の型定義
 */
export type BusinessHour = {
  /** 曜日（0: 日曜日 - 6: 土曜日） */
  dayOfWeek: number;
  /** 開店時間（HH:mm形式） */
  openTime: string;
  /** 閉店時間（HH:mm形式） */
  closeTime: string;
  /** 休業日フラグ */
  isHoliday: boolean;
};
