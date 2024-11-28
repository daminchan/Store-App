/**
 * 招待コード生成フォームの入力値
 * @description フォームで入力される値の型定義
 */
export type InvitationFormValues = {
  /** 有効期限（日数） */
  validDays: number;
};

/**
 * 招待コード生成フォームのエラー
 * @description フォームのバリデーションエラーの型定義
 */
export type InvitationFormErrors = {
  /** 有効期限のエラーメッセージ */
  validDays?: string;
  /** フォーム送信時のエラーメッセージ */
  submit?: string;
};

/**
 * 招待コード生成フォームの状態
 * @description フォーム全体の状態を管理する型定義
 */
export type InvitationFormState = {
  /** 送信中フラグ */
  isSubmitting: boolean;
  /** フォームの入力値 */
  values: InvitationFormValues;
  /** バリデーションエラー */
  errors: InvitationFormErrors;
};
