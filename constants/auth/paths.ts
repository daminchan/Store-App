import { USER_ROLES } from "@/types/user";

/**
 * ユーザーロール別のリダイレクト先パス
 * TODO: 正式なパスが決定次第、更新が必要
 */
export const ROLE_REDIRECT_PATHS = {
  [USER_ROLES.STORE_OWNER]: "/dashboard/store/new", // 仮のパス
  [USER_ROLES.CUSTOMER]: "/", // 仮のパス
} as const;
