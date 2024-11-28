import type { InvitationCode } from "@prisma/client";
import type { InvitationError } from "./error";

/**
 * Server Action のレスポンス型定義
 */

/** 共通のレスポンス型 */
export type ActionResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: InvitationError;
    };

/** 招待コード関連のレスポンス型 */
export type InvitationCodeResponse = ActionResponse<InvitationCode>;
export type InvitationCodesResponse = ActionResponse<InvitationCode[]>;
export type GeneratedInvitationCodeResponse = ActionResponse<{
  code: string;
  expiresAt: Date;
}>;
