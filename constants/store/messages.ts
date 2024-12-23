export const STORE_MESSAGES = {
  SUCCESS: {
    CREATE: "店舗を登録しました",
    UPDATE: "店舗情報を更新しました",
  },
  ERROR: {
    CREATE: "店舗の登録に失敗しました",
    UPDATE: "店舗情報の更新に失敗しました",
    AUTHENTICATION_REQUIRED: "認証が必要です",
    UNEXPECTED: "予期せぬエラーが発生しました",
  },
} as const;
