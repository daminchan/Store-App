"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  type InvitationCodeResponse,
  ERROR_MESSAGES,
} from "@/types/invitation";

/**
 * 招待コードを削除するServer Action
 * @description 指定された招待コードを削除します
 */
export async function deleteInvitationCode(
  codeId: string
): Promise<InvitationCodeResponse> {
  try {
    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      console.error("認証エラー: ユーザーIDが見つかりません");
      return {
        success: false,
        error: {
          type: "UNAUTHORIZED",
          message: ERROR_MESSAGES.UNAUTHORIZED,
        },
      };
    }

    // 招待コードの存在確認
    const invitationCode = await db.invitationCode.findUnique({
      where: { id: codeId },
    });

    if (!invitationCode) {
      return {
        success: false,
        error: {
          type: "NOT_FOUND",
          message: ERROR_MESSAGES.NOT_FOUND,
        },
      };
    }

    // 使用済みかチェック
    if (invitationCode.isUsed) {
      return {
        success: false,
        error: {
          type: "ALREADY_USED",
          message: ERROR_MESSAGES.ALREADY_USED,
        },
      };
    }

    // 削除を実行
    const deletedCode = await db.invitationCode.delete({
      where: { id: codeId },
    });

    // キャッシュを更新
    revalidatePath("/admin/dashboard/invitation");

    return {
      success: true,
      data: deletedCode,
    };
  } catch (error) {
    console.error("招待コードの削除に失敗しました:", error);
    return {
      success: false,
      error: {
        type: "UNEXPECTED",
        message: ERROR_MESSAGES.UNEXPECTED,
      },
    };
  }
}
