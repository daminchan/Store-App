/**
 * 予約のステータスを表す型
 * - pending: 予約申請中
 * - confirmed: 予約確定済み
 * - rejected: 予約拒否
 * - cancelled: キャンセル済み
 */
export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "rejected"
  | "cancelled";
