"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * エラーメッセージの型定義
 */
export type DeleteInvitationError = {
  message: string;
  errors?: Record<string, string>;
};

/** エラーメッセージ */
const ERROR_MESSAGES = {
  UNAUTHORIZED: "この操作を実行する権限がありません",
  NOT_FOUND: "招待コードが見つかりません",
  ALREADY_USED: "使用済みの招待コードは削除できません",
  UNEXPECTED: "予期せぬエラーが発生しました",
} as const;

/**
 * 招待コードを削除するServer Action
 * @description 指定された招待コードを削除します
 */
export async function deleteInvitationCode(
  codeId: string
): Promise<{ success: true } | DeleteInvitationError> {
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

    // 使用済みかチェック
    if (invitationCode.isUsed) {
      return {
        message: ERROR_MESSAGES.ALREADY_USED,
      };
    }

    // 削除を実行
    await db.invitationCode.delete({
      where: { id: codeId },
    });

    // キャッシュを更新
    revalidatePath("/admin/dashboard/invitation");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete invitation code:", error);
    return {
      message: ERROR_MESSAGES.UNEXPECTED,
    };
  }
}
