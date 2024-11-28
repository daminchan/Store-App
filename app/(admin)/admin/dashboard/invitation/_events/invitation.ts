/**
 * 招待コード関連のイベント定義
 * @description コンポーネント間の通信を行うためのカスタムイベントを定義
 *
 * 使用例:
 * - InvitationFormで招待コード生成成功時にCODE_GENERATEDイベントを発火
 * - InvitationListでイベントをリッスンし、一覧を自動更新
 */

/** 招待コード関連のイベント名 */
export const INVITATION_EVENTS = {
  /** 招待コード生成成功時に発火するイベント */
  CODE_GENERATED: "invitation:code_generated",
} as const;

/** イベントの型定義 */
export type InvitationEvent = {
  type: (typeof INVITATION_EVENTS)[keyof typeof INVITATION_EVENTS];
};
