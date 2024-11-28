/**
 * 招待コード管理のエラー型定義
 */

/** エラーの種類を定義 */
export type InvitationErrorType =
  | "UNAUTHORIZED"
  | "NOT_FOUND"
  | "ALREADY_USED"
  | "ALREADY_DISABLED"
  | "GENERATION_FAILED"
  | "UNEXPECTED";

/** エラーメッセージの定義 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "この操作を実行する権限がありません",
  NOT_FOUND: "招待コードが見つかりません",
  ALREADY_USED: "使用済みの招待コードは削除/無効化できません",
  ALREADY_DISABLED: "この招待コードは既に無効化されています",
  GENERATION_FAILED: "招待コードの生成に失敗しました",
  UNEXPECTED: "予期せぬエラーが発生しました",
} as const;

/** エラーオブジェクトの型定義 */
export type InvitationError = {
  type: InvitationErrorType;
  message: string;
  errors?: Record<string, string>;
};
