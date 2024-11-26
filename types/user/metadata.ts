// src/types/user/metadata.ts

import { type UserRoleType } from "./role";

/**
 * Clerkのユーザーメタデータを表す型
 * Clerkのpublicmetadataとして保存される情報
 */
export type UserMetadataType = {
  /** store_owner または customer */
  readonly role: UserRoleType;

  /** 店舗オーナーが管理する店舗のID（店舗オーナーの場合のみ存在） */
  readonly storeId?: string;
};
