"use server";

import { customAlphabet } from "nanoid";
import { addDays } from "date-fns";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  type GeneratedInvitationCodeResponse,
  ERROR_MESSAGES,
} from "@/types/invitation";

/**
 * 招待コードを生成・登録するServer Action
 * @description 8桁の数字からなる招待コードを生成し、データベースに登録します
 * @param validDays 有効期限（日数）
 */
export async function generateInvitationCode(
  validDays: number = 30
): Promise<GeneratedInvitationCodeResponse> {
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

    // 8桁の数字を生成（nanoidを使用）
    const generateCode = customAlphabet("0123456789", 8);
    const code = generateCode();
    const expiresAt = addDays(new Date(), validDays);

    // データベースに登録
    const invitationCode = await db.invitationCode.create({
      data: {
        code,
        expiresAt,
      },
    });

    // キャッシュを更新
    revalidatePath("/admin/dashboard/invitation");

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
