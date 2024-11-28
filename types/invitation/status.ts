/**
 * 招待コードのステータス関連の型定義
 * @description 招待コードの状態を表す型定義
 */

/** 招待コードの状態を表す列挙型 */
export const INVITATION_STATUS = {
  /** 有効：使用可能な状態 */
  VALID: "valid",
  /** 使用済み：既に使用された状態 */
  USED: "used",
  /** 無効：手動で無効化された状態 */
  DISABLED: "disabled",
  /** 期限切れ：有効期限が切れた状態 */
  EXPIRED: "expired",
} as const;

/** 招待コードの状態の型 */
export type InvitationStatus =
  (typeof INVITATION_STATUS)[keyof typeof INVITATION_STATUS];

/** 招待コードの状態に応じたメッセージ */
export const STATUS_MESSAGES = {
  [INVITATION_STATUS.VALID]: "有効",
  [INVITATION_STATUS.USED]: "使用済み",
  [INVITATION_STATUS.DISABLED]: "無効",
  [INVITATION_STATUS.EXPIRED]: "期限切れ",
} as const;

/** レート制限の設定 */
export const RATE_LIMIT = {
  /** 試行回数のウィンドウ（分） */
  WINDOW_MINUTES: 5,
  /** 最大試行回数 */
  MAX_ATTEMPTS: 5,
} as const;
