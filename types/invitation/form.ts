import { z } from "zod";

/**
 * 招待コードのバリデーション関連の型定義
 * @description 招待コードの入力値のバリデーションスキーマと型定義
 */

/**
 * 招待コードの形式を定義
 * @description 8桁の数字のみを許可
 */
export const INVITATION_CODE_PATTERN = /^\d{8}$/;

/**
 * 招待コードフォームのバリデーションスキーマ
 * @description
 * - 8桁の数字のみを許可
 * - 空白文字は自動的にトリム
 * - カスタムエラーメッセージを提供
 */
export const invitationFormSchema = z.object({
  code: z
    .string()
    .trim()
    .min(1, "招待コードを入力してください")
    .regex(INVITATION_CODE_PATTERN, "招待コードは8桁の数字で入力してください"),
});

/** 招待コードフォームの型定義 */
export type InvitationFormSchema = z.infer<typeof invitationFormSchema>;

/** 招待コードの検証結果の型定義 */
export type InvitationValidationResult = {
  /** 検証が成功したかどうか */
  isValid: boolean;
  /** エラーメッセージ（検証失敗時のみ） */
  error?: string;
};
