// src/types/user/role.ts

/**
 * ユーザーの役割を表す定数
 * STORE_OWNER: 店舗オーナー - 店舗の管理や予約の承認が可能
 * CUSTOMER: 一般ユーザー - 店舗の予約が可能
 */
export const USER_ROLES = {
  STORE_OWNER: "store_owner",
  CUSTOMER: "customer",
} as const;

/**
 * ユーザーの役割を表す型
 * USER_ROLESから生成された Union型 ('store_owner' | 'customer')
 */
export type UserRoleType = (typeof USER_ROLES)[keyof typeof USER_ROLES];
