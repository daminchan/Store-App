"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { headers } from "next/headers";
import { checkRateLimit } from "../_middleware/rateLimit";
import {
  type InvitationFormSchema,
  type ValidateInvitationError,
  ERROR_MESSAGES,
  INVITATION_CODE_PATTERN,
} from "@/types/invitation";

/**
 * 招待コードを検証するServer Action
 * @description 招待コードの有効性を確認し、セッションに保存する
 */
export async function validateInvitation({
  code,
}: InvitationFormSchema): Promise<{ success: true } | ValidateInvitationError> {
  try {
    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      console.error("認証エラー: ユーザーIDが見つかりません");
      return {
        message: ERROR_MESSAGES.UNAUTHORIZED,
        errors: { code: ERROR_MESSAGES.UNAUTHORIZED },
      };
    }

    // レート制限のチェック
    // Upstash/Redis + Next.js Middlewareを使用したレート制限の実装
    // 1. next/headersからX-Forwarded-Forヘッダーを非同期で取得
    // 2. クライアントのIPアドレスを特定（プロキシ経由の場合は最初のIPを使用）
    // 3. Upstash/Redisを使用して指定時間内のリクエスト数を制限
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor?.split(",")[0] ?? "127.0.0.1";
    const isAllowed = await checkRateLimit({
      headers: new Headers({ "x-forwarded-for": ip }),
    } as any);
    if (!isAllowed) {
      return {
        message: ERROR_MESSAGES.RATE_LIMIT_EXCEEDED,
        errors: { code: ERROR_MESSAGES.RATE_LIMIT_EXCEEDED },
      };
    }

    // 形式チェック
    if (!INVITATION_CODE_PATTERN.test(code)) {
      return {
        message: ERROR_MESSAGES.VALIDATION_ERROR,
        errors: { code: ERROR_MESSAGES.VALIDATION_ERROR },
      };
    }

    // データベースで招待コードを検索
    const invitationCode = await db.invitationCode.findUnique({
      where: { code },
    });

    // 存在チェック
    if (!invitationCode) {
      return {
        message: ERROR_MESSAGES.NOT_FOUND,
        errors: { code: ERROR_MESSAGES.NOT_FOUND },
      };
    }

    // 使用済みチェック
    if (invitationCode.isUsed) {
      return {
        message: ERROR_MESSAGES.ALREADY_USED,
        errors: { code: ERROR_MESSAGES.ALREADY_USED },
      };
    }

    // 無効化チェック
    if (invitationCode.isDisabled) {
      return {
        message: ERROR_MESSAGES.ALREADY_DISABLED,
        errors: { code: ERROR_MESSAGES.ALREADY_DISABLED },
      };
    }

    // 有効期限チェック
    if (invitationCode.expiresAt < new Date()) {
      return {
        message: ERROR_MESSAGES.EXPIRED,
        errors: { code: ERROR_MESSAGES.EXPIRED },
      };
    }

    // 招待コードを使用済みに更新
    await db.invitationCode.update({
      where: { id: invitationCode.id },
      data: {
        isUsed: true,
        usedBy: userId,
        usedAt: new Date(),
      },
    });

    // TODO: ユーザーロールの更新処理を追加
    // await updateUserRole(userId, "STORE_OWNER");

    return { success: true };
  } catch (error) {
    console.error("招待コードの検証に失敗しました:", error);
    return {
      message: ERROR_MESSAGES.UNEXPECTED,
      errors: { submit: ERROR_MESSAGES.UNEXPECTED },
    };
  }
}
