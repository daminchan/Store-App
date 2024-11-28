/**
 * メニューカテゴリーの列挙型
 * @description メニューの分類を表す列挙型
 */
export enum MenuCategory {
  MAIN = "MAIN",
  SIDE = "SIDE",
  DRINK = "DRINK",
  DESSERT = "DESSERT",
  OTHER = "OTHER",
}

/**
 * メニュー項目の型定義
 * @description 店舗のメニュー項目を表す型
 */
export type MenuItem = {
  /** メニューの一意のID */
  id: string;
  /** メニューが属する店舗のID */
  storeId: string;
  /** メニュー名 */
  name: string;
  /** 価格（円） */
  price: number;
  /** メニューの説明 */
  description: string;
  /** メニューのカテゴリー */
  category: MenuCategory;
  /** 内部用タグ（検索・フィルタリング用） */
  internalTags: string[];
  /** 提供可能かどうか */
  isAvailable: boolean;
  /** メニュー画像のURL */
  imageUrl?: string;
  /** 作成日時 */
  createdAt: Date;
  /** 更新日時 */
  updatedAt: Date;
};
