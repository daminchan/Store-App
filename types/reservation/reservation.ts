import { ReservationStatus } from "./status";

/** 予約情報を表す型 */
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
  /** 予約者の電話番号 */
  phoneNumber: string;
  /** 予約したメニューの配列 */
  items: OrderItem[];
  /** 予約のステータス */
  status: ReservationStatus;
  /** 予約情報の作成日時 */
  createdAt: Date;
  /** 予約情報の最終更新日時 */
  updatedAt: Date;
};

/** 予約内の注文項目を表す型 */
export type OrderItem = {
  /** 注文するメニューのID */
  menuItemId: string;
  /** 注文数量 */
  quantity: number;
};
