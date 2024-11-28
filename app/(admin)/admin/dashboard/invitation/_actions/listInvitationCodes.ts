"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import {
  type InvitationCodesResponse,
  ERROR_MESSAGES,
} from "@/types/invitation";

/**
 * 招待コード一覧を取得するServer Action
 * @description データベースから招待コードの一覧を取得します
 */
export async function listInvitationCodes(): Promise<InvitationCodesResponse> {
  try {
    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      console.log("認証エラー: ユーザーIDが見つかりません");
      return {
        success: false,
        error: {
          type: "UNAUTHORIZED",
          message: ERROR_MESSAGES.UNAUTHORIZED,
        },
      };
    }

    // データベースから取得

    const invitationCodes = await db.invitationCode.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: invitationCodes,
    };
  } catch (error) {
    console.error("招待コード一覧取得エラー:", error);
    return {
      success: false,
      error: {
        type: "UNEXPECTED",
        message: ERROR_MESSAGES.UNEXPECTED,
        errors: {
          submit: ERROR_MESSAGES.GENERATION_FAILED,
        },
      },
    };
  }
}
