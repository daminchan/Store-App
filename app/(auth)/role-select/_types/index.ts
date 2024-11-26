// src/app/(auth)/role-select/_types/index.ts

import { UserRoleType } from "@/types/user";

/** フォームの状態 */
export type RoleSelectFormState = Readonly<{
  /** ローディング状態 */
  isLoading: boolean;
  /** エラーメッセージ */
  errorMessage: string;
}>;

/** 役割選択カードのプロパティ */
export type RoleCardProps = Readonly<{
  /** カードのタイトル */
  title: string;
  /** 役割の説明文 */
  description: string;
  /** クリック時のコールバック関数 */
  onSelect: () => Promise<void>;
  /** ボタンの無効化状態 */
  isDisabled: boolean;
  /** ユーザーの役割タイプ */
  role: UserRoleType;
}>;
