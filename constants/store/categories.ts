export const STORE_CATEGORIES = [
  { id: "japanese", label: "和食" },
  { id: "chinese", label: "中華" },
  { id: "western", label: "洋食" },
  { id: "italian", label: "イタリアン" },
  { id: "french", label: "フレンチ" },
  { id: "korean", label: "韓国料理" },
  { id: "cafe", label: "カフェ" },
  { id: "other", label: "その他" },
] as const;

export type StoreCategory = (typeof STORE_CATEGORIES)[number]["id"];
