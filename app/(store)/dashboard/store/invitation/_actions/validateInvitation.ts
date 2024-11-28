"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { type InvitationFormSchema } from "../_components/InvitationForm/_schemas/validation";

/**
 * エラーメッセージの型定義
 */
export type ValidateInvitationError = {
  message: string;
  errors?: Record<string, string>;
};

/** エラーメッセージ */
const ERROR_MESSAGES = {
  INVALID_FORMAT: "招待コードは8桁の数字で入力してください",
  NOT_FOUND: "無効な招待コードです",
  ALREADY_USED: "この招待コードは既に使用されています",
  EXPIRED: "この招待コードは有効期限が切れています",
  UNAUTHORIZED: "認証が必要です",
  UNEXPECTED: "予期せぬエラーが発生しました",
} as const;

/**
 * 招待コードの形式を検証
 * @param code 検証する招待コード
 * @returns 有効な形式かどうか
 */
const isValidFormat = (code: string): boolean => {
  return /^\d{8}$/.test(code);
};

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

    // 形式チェック
    if (!isValidFormat(code)) {
      return {
        message: ERROR_MESSAGES.INVALID_FORMAT,
        errors: { code: ERROR_MESSAGES.INVALID_FORMAT },
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

    return { success: true };
  } catch (error) {
    console.error("招待コードの検証に失敗しました:", error);
    return {
      message: ERROR_MESSAGES.UNEXPECTED,
      errors: { submit: ERROR_MESSAGES.UNEXPECTED },
    };
  }
}
