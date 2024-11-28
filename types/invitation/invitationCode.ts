/**
 * 招待コードの状態を表す型
 * @description 招待コードの現在の状態を表す列挙型
 */
export type InvitationCodeStatus = "active" | "used" | "disabled" | "expired";

/**
 * 招待コードのドメインモデル
 * @description Prismaスキーマの InvitationCode モデルに対応する型定義
 */
export type InvitationCode = {
  /** 招待コードの一意のID */
  id: string;
  /** 実際の招待コード文字列 */
  code: string;
  /** 使用済みフラグ */
  isUsed: boolean;
  /** 無効化フラグ */
  isDisabled: boolean;
  /** 使用したユーザーのID */
  usedBy: string | null;
  /** 使用日時 */
  usedAt: Date | null;
  /** 有効期限 */
  expiresAt: Date;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
};
