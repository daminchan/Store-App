/**
 * 予約ステータスの列挙型
 * @description 予約の状態を表す列挙型
 */
export enum ReservationStatus {
  /** 予約待ち */
  PENDING = "PENDING",
  /** 予約確定 */
  CONFIRMED = "CONFIRMED",
  /** 予約拒否 */
  REJECTED = "REJECTED",
  /** 予約キャンセル */
  CANCELLED = "CANCELLED",
}

/**
 * 予約の型定義
 * @description 店舗の予約情報を表す型
 */
export type Reservation = {
  /** 予約の一意のID */
  id: string;
  /** 予約対象の店舗ID */
  storeId: string;
  /** 予約したユーザーのID */
  userId: string;
  /** 予約日時 */
  reservationTime: Date;
  /** 予約者名 */
  customerName: string;
  /** 連絡先電話番号 */
  phoneNumber: string;
  /** 予約のステータス */
  status: ReservationStatus;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
};
