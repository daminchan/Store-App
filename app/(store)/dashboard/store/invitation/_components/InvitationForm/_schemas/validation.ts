import { z } from "zod";

/**
 * 招待コードフォームのバリデーションスキーマ
 */
export const invitationFormSchema = z.object({
  code: z
    .string()
    .min(6, "招待コードは6文字以上で入力してください")
    .max(20, "招待コードは20文字以下で入力してください"),
});

/** 招待コードフォームの型定義 */
export type InvitationFormSchema = z.infer<typeof invitationFormSchema>;
