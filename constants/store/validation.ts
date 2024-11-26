export const STORE_VALIDATION = {
  NAME: {
    REQUIRED: "店舗名は必須です",
    MAX_LENGTH: "店舗名は50文字以内で入力してください",
    PATTERN: "店舗名に使用できない文字が含まれています",
  },
  DESCRIPTION: {
    MAX_LENGTH: "説明は500文字以内で入力してください",
  },
  CATEGORIES: {
    REQUIRED: "1つ以上のカテゴリを選択してください",
    MAX_LENGTH: "カテゴリは5つまで選択できます",
  },
  BUSINESS_HOURS: {
    REQUIRED: "営業時間を設定してください",
    TIME_FORMAT: "時間形式が正しくありません",
  },
} as const;
