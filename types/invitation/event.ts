/**
 * 招待コード関連のイベント定義
 * @description コンポーネント間の通信を行うためのカスタムイベントを定義
 */

/** 招待コード関連のイベント名 */
export const INVITATION_EVENTS = {
  /** 招待コード生成成功時に発火するイベント */
  CODE_GENERATED: "invitation:code_generated",
  /** 招待コード検証成功時に発火するイベント */
  CODE_VALIDATED: "invitation:code_validated",
  /** 招待コード無効化時に発火するイベント */
  CODE_DISABLED: "invitation:code_disabled",
  /** 招待コード削除時に発火するイベント */
  CODE_DELETED: "invitation:code_deleted",
} as const;

/** イベントの型定義 */
export type InvitationEvent = {
  /** イベントの種類 */
  type: (typeof INVITATION_EVENTS)[keyof typeof INVITATION_EVENTS];
  /** イベントに関連するデータ */
  data?: {
    /** 招待コード */
    code?: string;
    /** メッセージ */
    message?: string;
  };
};
