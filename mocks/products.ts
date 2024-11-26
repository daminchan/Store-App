type CustomizeOption = {
  id: string;
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  code: string;
  price: number;
  imageUrl: string;
  customizeOptions?: {
    [key: string]: CustomizeOption[];
  };
};

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "プレミアムステーキセット",
    code: "A-1234",
    price: 3800,
    imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e",
    customizeOptions: {
      size: [
        { id: "size-1", name: "通常", price: 0 },
        { id: "size-2", name: "大盛り", price: 300 },
      ],
      side: [
        { id: "side-1", name: "サラダ付き（標準）", price: 0 },
        { id: "side-2", name: "ガーリックライス変更", price: 200 },
        { id: "side-3", name: "おかずのみ", price: -200 },
      ],
      sauce: [
        { id: "sauce-1", name: "和風ソース（標準）", price: 0 },
        { id: "sauce-2", name: "ガーリックソース", price: 100 },
      ],
    },
  },
  {
    id: "2",
    name: "シーフードパスタ",
    code: "B-5678",
    price: 1800,
    imageUrl: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8",
    customizeOptions: {
      size: [
        { id: "size-1", name: "通常", price: 0 },
        { id: "size-2", name: "大盛り", price: 300 },
      ],
      side: [
        { id: "side-1", name: "サラダ付き（標準）", price: 0 },
        { id: "side-2", name: "パン変更", price: 200 },
        { id: "side-3", name: "おかずのみ", price: -200 },
      ],
      sauce: [
        { id: "sauce-1", name: "トマトソース（標準）", price: 0 },
        { id: "sauce-2", name: "クリームソース", price: 100 },
      ],
    },
  },
  {
    id: "3",
    name: "アボカドサラダ",
    code: "C-9012",
    price: 1200,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    customizeOptions: {
      size: [
        { id: "size-1", name: "通常", price: 0 },
        { id: "size-2", name: "大盛り", price: 200 },
      ],
      topping: [
        { id: "topping-1", name: "なし（標準）", price: 0 },
        { id: "topping-2", name: "シュリンプ追加", price: 300 },
        { id: "topping-3", name: "チキン追加", price: 250 },
      ],
      dressing: [
        { id: "dressing-1", name: "和風ドレッシング（標準）", price: 0 },
        { id: "dressing-2", name: "シーザードレッシング", price: 0 },
      ],
    },
  },
  {
    id: "4",
    name: "ガーリックシュリンプ",
    code: "D-3456",
    price: 2200,
    imageUrl: "https://images.unsplash.com/photo-1559742811-822873691df8",
    customizeOptions: {
      size: [
        { id: "size-1", name: "通常", price: 0 },
        { id: "size-2", name: "大盛り", price: 300 },
      ],
      side: [
        { id: "side-1", name: "ライス付き（標準）", price: 0 },
        { id: "side-2", name: "パン変更", price: 100 },
        { id: "side-3", name: "おかずのみ", price: -200 },
      ],
      spice: [
        { id: "spice-1", name: "普通（標準）", price: 0 },
        { id: "spice-2", name: "辛め", price: 0 },
      ],
    },
  },
  {
    id: "5",
    name: "マルゲリータピザ",
    code: "E-7890",
    price: 1600,
    imageUrl: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143",
    customizeOptions: {
      size: [
        { id: "size-1", name: "レギュラー", price: 0 },
        { id: "size-2", name: "ラージ", price: 400 },
      ],
      crust: [
        { id: "crust-1", name: "通常（標準）", price: 0 },
        { id: "crust-2", name: "クリスピー", price: 100 },
        { id: "crust-3", name: "チーズクラスト", price: 300 },
      ],
      topping: [
        { id: "topping-1", name: "標準", price: 0 },
        { id: "topping-2", name: "チーズ増量", price: 200 },
        { id: "topping-3", name: "バジル追加", price: 100 },
      ],
    },
  },
  {
    id: "6",
    name: "デザートプレート",
    code: "F-1234",
    price: 980,
    imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814",
    customizeOptions: {
      size: [
        { id: "size-1", name: "通常", price: 0 },
        { id: "size-2", name: "ダブル", price: 500 },
      ],
      topping: [
        { id: "topping-1", name: "標準", price: 0 },
        { id: "topping-2", name: "フルーツ追加", price: 200 },
        { id: "topping-3", name: "アイス追加", price: 150 },
      ],
      sauce: [
        { id: "sauce-1", name: "チョコレート（標準）", price: 0 },
        { id: "sauce-2", name: "キャラメル", price: 0 },
        { id: "sauce-3", name: "ベリーソース", price: 100 },
      ],
    },
  },
];
