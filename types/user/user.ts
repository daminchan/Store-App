// src/types/user/user.ts

import { type UserRoleType } from "./role";

/**
 * アプリケーション内でのユーザー情報を表す型
 * Clerkから取得したユーザー情報を内部で扱いやすい形に変換したもの
 */
export type UserType = {
  /** Clerkが発行するユーザーID */
  readonly id: string;

  /** 認証済みのメールアドレス */
  readonly email: string;

  /** ユーザーの表示名（未設定の場合はメールアドレスの@前の部分） */
  readonly displayName: string;

  /** ユーザーの役割（store_owner または customer） */
  readonly role: UserRoleType;

  /** プロフィール画像のURL */
  readonly imageUrl?: string;

  /** アカウント作成日時（UTC） */
  readonly createdAt: Date;

  /** アカウント情報の最終更新日時（UTC） */
  readonly updatedAt: Date;
};
