"use server";

import { customAlphabet } from "nanoid";
import { addDays } from "date-fns";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * 生成された招待コードの型
 */
export type GeneratedInvitationCode = {
  code: string;
  expiresAt: Date;
};

/**
 * エラーメッセージの型定義
 */
export type GenerateInvitationError = {
  message: string;
  errors?: Record<string, string>;
};

/** エラーメッセージ */
const ERROR_MESSAGES = {
  UNAUTHORIZED: "この操作を実行する権限がありません",
  GENERATION_FAILED: "招待コードの生成に失敗しました",
  UNEXPECTED: "予期せぬエラーが発生しました",
} as const;

/**
 * 招待コードを生成・登録するServer Action
 * @description 8桁の数字からなる招待コードを生成し、データベースに登録します
 * @param validDays 有効期限（日数）
 */
export async function generateInvitationCode(
  validDays: number = 30
): Promise<
  { success: true; data: GeneratedInvitationCode } | GenerateInvitationError
> {
  try {
    console.log("=== 招待コード生成開始 ===");

    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      console.log("認証エラー: ユーザーIDが見つかりません");
      return {
        message: ERROR_MESSAGES.UNAUTHORIZED,
      };
    }
    console.log("認証成功 - ユーザーID:", userId);

    // 8桁の数字を生成（nanoidを使用）
    const generateCode = customAlphabet("0123456789", 8);
    const code = generateCode();
    console.log("生成された招待コード:", code);

    const expiresAt = addDays(new Date(), validDays);
    console.log("有効期限:", expiresAt);

    // データベースに登録
    console.log("データベースに登録中...");
    const invitationCode = await db.invitationCode.create({
      data: {
        code,
        expiresAt,
      },
    });
    console.log("データベース登録完了:", invitationCode);

    // キャッシュを更新
    revalidatePath("/admin/dashboard/invitation");

    console.log("=== 招待コード生成完了 ===");
    return {
      success: true,
      data: {
        code: invitationCode.code,
        expiresAt: invitationCode.expiresAt,
      },
    };
  } catch (error) {
    console.error("招待コード生成エラー:", error);
    return {
      message: ERROR_MESSAGES.UNEXPECTED,
      errors: {
        submit: ERROR_MESSAGES.GENERATION_FAILED,
      },
    };
  }
}
