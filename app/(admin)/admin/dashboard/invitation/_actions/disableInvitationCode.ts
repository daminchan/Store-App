"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  type InvitationCodeResponse,
  ERROR_MESSAGES,
} from "@/types/invitation";

/**
 * 招待コードを無効化するServer Action
 * @description 指定された招待コードを無効化します
 */
export async function disableInvitationCode(
  codeId: string
): Promise<InvitationCodeResponse> {
  try {
    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
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

    // 既に無効化されているかチェック
    if (invitationCode.isDisabled) {
      return {
        success: false,
        error: {
          type: "ALREADY_DISABLED",
          message: ERROR_MESSAGES.ALREADY_DISABLED,
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

    // 無効化を実行
    const disabledCode = await db.invitationCode.update({
      where: { id: codeId },
      data: { isDisabled: true },
    });

    // キャッシュを更新
    revalidatePath("/admin/dashboard/invitation");

    return {
      success: true,
      data: disabledCode,
    };
  } catch (error) {
    console.error("Failed to disable invitation code:", error);
    return {
      success: false,
      error: {
        type: "UNEXPECTED",
        message: ERROR_MESSAGES.UNEXPECTED,
      },
    };
  }
}
