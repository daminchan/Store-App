"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import type { InvitationCode } from "@prisma/client";

/**
 * エラーメッセージの型定義
 */
export type ListInvitationCodesError = {
  message: string;
  errors?: Record<string, string>;
};

/** エラーメッセージ */
const ERROR_MESSAGES = {
  UNAUTHORIZED: "この操作を実行する権限がありません",
  FETCH_FAILED: "招待コードの取得に失敗しました",
  UNEXPECTED: "予期せぬエラーが発生しました",
} as const;

/**
 * 招待コード一覧を取得するServer Action
 * @description データベースから招待コードの一覧を取得します
 */
export async function listInvitationCodes(): Promise<
  { success: true; data: InvitationCode[] } | ListInvitationCodesError
> {
  try {
    console.log("=== 招待コード一覧取得開始 ===");

    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      console.log("認証エラー: ユーザーIDが見つかりません");
      return {
        message: ERROR_MESSAGES.UNAUTHORIZED,
      };
    }
    console.log("認証成功 - ユーザーID:", userId);

    // データベースから取得
    console.log("データベースから招待コード一覧を取得中...");
    const invitationCodes = await db.invitationCode.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log("取得完了 - 件数:", invitationCodes.length);

    console.log("=== 招待コード一覧取得完了 ===");
    return {
      success: true,
      data: invitationCodes,
    };
  } catch (error) {
    console.error("招待コード一覧取得エラー:", error);
    return {
      message: ERROR_MESSAGES.UNEXPECTED,
      errors: {
        submit: ERROR_MESSAGES.FETCH_FAILED,
      },
    };
  }
}
