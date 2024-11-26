// src/app/(auth)/role-select/_types/index.ts

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
}>;

/** フォームの状態 */
export type RoleSelectFormState = Readonly<{
  /** ローディング状態 */
  isLoading: boolean;
  /** エラーメッセージ */
  errorMessage: string;
}>;
