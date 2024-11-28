import type { InvitationCode } from "./invitationCode";

/**
 * Server Actionの基本結果型
 * @description 成功時はデータを、失敗時はエラーメッセージを返す
 */
export type InvitationActionResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

/**
 * 招待コード生成アクションの結果型
 */
export type GenerateInvitationResult = InvitationActionResult<InvitationCode>;

/**
 * 招待コード削除アクションの結果型
 */
export type DeleteInvitationResult = InvitationActionResult<void>;

/**
 * 招待コード無効化アクションの結果型
 */
export type DisableInvitationResult = InvitationActionResult<void>;
