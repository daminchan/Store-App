import type { InvitationCode } from "./invitationCode";

/**
 * 招待コードストアの状態
 * @description Zustandストアで管理する状態の型定義
 */
export type InvitationStoreState = {
  /** 招待コードのリスト */
  invitationCodes: InvitationCode[];
  /** ローディング状態 */
  isLoading: boolean;
  /** エラーメッセージ */
  error: string | null;
};

/**
 * 招待コードストアのアクション
 * @description Zustandストアで提供するアクションの型定義
 */
export type InvitationStoreActions = {
  /** 招待コードリストを取得 */
  fetchInvitationCodes: () => Promise<void>;
  /** 招待コードを生成 */
  generateInvitationCode: (validDays: number) => Promise<void>;
  /** 招待コードを削除 */
  deleteInvitationCode: (id: string) => Promise<void>;
  /** 招待コードを無効化 */
  disableInvitationCode: (id: string) => Promise<void>;
};
