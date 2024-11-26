/** メニュー項目を表す型 */
export type MenuItem = {
  /** メニューの一意のID */
  id: string;
  /** このメニューが属する店舗のID */
  storeId: string;
  /** メニュー名 */
  name: string;
  /** 価格 (円) */
  price: number;
  /** メニューの説明文 */
  description: string;
  /** 表示用カテゴリー (例: "前菜", "メイン", "デザート") */
  category: string;
  /** 内部用タグ配列 (例: ["和風", "魚", "野菜"]) - レコメンデーション用 */
  internalTags: string[];
  /** 提供可能状態 (true: 提供可能, false: 品切れ) */
  isAvailable: boolean;
  /** メニュー画像のURL */
  imageUrl?: string;
  /** メニュー情報の作成日時 */
  createdAt: Date;
  /** メニュー情報の最終更新日時 */
  updatedAt: Date;
};
