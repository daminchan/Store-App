// src/app/(auth)/role-select/_actions/updateUserRole.ts

"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { type UserRoleType } from "@/types/user";

/**
 * ユーザーの役割をClerkのpublicMetadataに保存
 * @see https://clerk.com/docs/users/metadata
 *
 * @remarks
 * Clerkの機能:
 * - auth(): 現在のユーザーIDを取得
 * - clerkClient.users.updateUserMetadata(): ユーザーのメタデータを更新
 * - publicMetadata: 公開メタデータ（8kb制限あり）
 */
type UpdateRoleResultType = Readonly<{
  /** 成功時のメッセージまたはメタデータ */
  message?: unknown;
  /** エラー発生時のメッセージ */
  error?: string;
}>;

/**
 * ユーザーの役割をClerkのpublicMetadataに保存
 */
export const updateUserRole = async (
  role: UserRoleType
): Promise<UpdateRoleResultType> => {
  // Clerk: 現在のユーザーIDを取得
  const { userId } = await auth();

  if (!userId) {
    return { error: "ログインが必要です" };
  }

  // Clerk: クライアントインスタンスを取得
  const client = await clerkClient();

  try {
    // Clerk: ユーザーのメタデータを更新
    // メタデータは8kb以下である必要があります
    const result = await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
      },
    });

    return { message: result.publicMetadata };
  } catch (err) {
    console.error("Failed to update user role:", err);
    return { error: "ユーザー情報の更新に失敗しました" };
  }
};
