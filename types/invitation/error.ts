/**
 * 招待コード管理のエラー型定義
 * @description 招待コードの生成、検証、管理に関するエラーの型定義
 */

/** エラーの種類を定義 */
export type InvitationErrorType =
  /** 認証エラー：未認証またはアクセス権限がない場合 */
  | "UNAUTHORIZED"
  /** 未検出エラー：指定された招待コードが存在しない場合 */
  | "NOT_FOUND"
  /** 使用済みエラー：既に使用された招待コードの場合 */
  | "ALREADY_USED"
  /** 無効化済みエラー：既に無効化された招待コードの場合 */
  | "ALREADY_DISABLED"
  /** 生成失敗エラー：招待コードの生成に失敗した場合 */
  | "GENERATION_FAILED"
  /** バリデーションエラー：入力値が不正な場合 */
  | "VALIDATION_ERROR"
  /** レート制限エラー：APIリクエストの制限を超えた場合 */
  | "RATE_LIMIT_EXCEEDED"
  /** 期限切れエラー：招待コードの有効期限が切れている場合 */
  | "EXPIRED"
  /** 予期せぬエラー：その他の予期せぬエラーが発生した場合 */
  | "UNEXPECTED";

/** エラーメッセージの定義 */
export const ERROR_MESSAGES = {
  UNAUTHORIZED: "この操作を実行する権限がありません",
  NOT_FOUND: "招待コードが見つかりません",
  ALREADY_USED: "この招待コードは既に使用されています",
  ALREADY_DISABLED: "この招待コードは既に無効化されています",
  GENERATION_FAILED: "招待コードの生成に失敗しました",
  VALIDATION_ERROR: "入力された招待コードの形式が正しくありません",
  RATE_LIMIT_EXCEEDED: "しばらく時間をおいてから再度お試しください",
  EXPIRED: "この招待コードは有効期限が切れています",
  UNEXPECTED: "予期せぬエラーが発生しました",
} as const;

/** エラーオブジェクトの型定義 */
export type InvitationError = {
  /** エラーの種類 */
  type: InvitationErrorType;
  /** エラーメッセージ */
  message: string;
  /** 詳細なエラー情報（フィールドごとのエラーメッセージなど） */
  errors?: Record<string, string>;
};

/** 招待コード検証のエラー型定義 */
export type ValidateInvitationError = {
  /** エラーメッセージ */
  message: string;
  /** フィールドごとのエラーメッセージ */
  errors?: Record<string, string>;
};
