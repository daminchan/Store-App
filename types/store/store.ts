/**
 * @fileoverview 店舗情報のドメインモデルを定義
 * このファイルは、アプリケーション全体で使用される店舗のドメインモデルを定義します。
 * データベースやAPIのインターフェースの基準となります。
 *
 * バリデーションルールは以下で定義：
 * - 店舗名: 1-50文字、使用可能文字（英数字、ひらがな、カタカナ、漢字、スペース）
 * - カテゴリ: 1-5個まで選択可能
 * - 営業時間: 各曜日ごとに必須、休業日設定可能
 *
 * @see {@link STORE_VALIDATION} in @/constants/store/validation.ts
 */

import type { BusinessHour } from "./businessHour";
import type { StoreCategory } from "@/constants/store/categories";

/**
 * 店舗IDを表す型
 * @description UUIDv4形式を想定
 */
type StoreId = string;

/**
 * オーナーIDを表す型
 * @description Clerk User IDを想定
 */
type OwnerId = string;

/**
 * 店舗情報を表す型
 * @example
 * // 必須項目のみの最小構成
 * const minimumStore: Store = {
 *   id: "store_123",
 *   name: "カフェ Cursor",
 *   businessHours: [
 *     { dayOfWeek: 0, openTime: "09:00", closeTime: "18:00", isHoliday: false }
 *   ],
 *   ownerId: "user_123",
 *   categories: ["カフェ"],
 *   createdAt: new Date(),
 *   updatedAt: new Date()
 * };
 *
 * // 全項目を含む構成
 * const fullStore: Store = {
 *   ...minimumStore,
 *   description: "プログラマーに人気のカフェ"
 * };
 */
export type Store = {
  // 必須項目
  /** 店舗の一意のID */
  id: StoreId;
  /** 店舗名（1-50文字） */
  name: string;
  /** 営業時間の配列（7日分必須） */
  businessHours: BusinessHour[];
  /** 店舗オーナーのClerk User ID */
  ownerId: OwnerId;
  /** 店舗のカテゴリー配列（1-5個） */
  categories: StoreCategory[];
  /** 店舗情報の作成日時 */
  createdAt: Date;
  /** 店舗情報の最終更新日時 */
  updatedAt: Date;

  // オプショナル項目
  /** 店舗の説明文（任意、最大500文字） */
  description?: string;
};
