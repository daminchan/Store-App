"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * エラーメッセージの型定義
 */
export type DisableInvitationError = {
  message: string;
  errors?: Record<string, string>;
};

/** エラーメッセージ */
const ERROR_MESSAGES = {
  UNAUTHORIZED: "この操作を実行する権限がありません",
  NOT_FOUND: "招待コードが見つかりません",
  ALREADY_DISABLED: "この招待コードは既に無効化されています",
  ALREADY_USED: "使用済みの招待コードは無効化できません",
  UNEXPECTED: "予期せぬエラーが発生しました",
} as const;

/**
 * 招待コードを無効化するServer Action
 * @description 指定された招待コードを無効化します
 */
export async function disableInvitationCode(
  codeId: string
): Promise<{ success: true } | DisableInvitationError> {
  try {
    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      return {
        message: ERROR_MESSAGES.UNAUTHORIZED,
      };
    }

    // 招待コードの存在確認
    const invitationCode = await db.invitationCode.findUnique({
      where: { id: codeId },
    });

    if (!invitationCode) {
      return {
        message: ERROR_MESSAGES.NOT_FOUND,
      };
    }

    // 既に無効化されているかチェック
    if (invitationCode.isDisabled) {
      return {
        message: ERROR_MESSAGES.ALREADY_DISABLED,
      };
    }

    // 使用済みかチェック
    if (invitationCode.isUsed) {
      return {
        message: ERROR_MESSAGES.ALREADY_USED,
      };
    }

    // 無効化を実行
    await db.invitationCode.update({
      where: { id: codeId },
      data: { isDisabled: true },
    });

    // キャッシュを更新
    revalidatePath("/admin/dashboard/invitation");

    return { success: true };
  } catch (error) {
    console.error("Failed to disable invitation code:", error);
    return {
      message: ERROR_MESSAGES.UNEXPECTED,
    };
  }
}
