/**
 * 共通の通知メッセージ定数
 * @description 通知の種類ごとにメッセージを定義
 */
export const NOTIFICATION_MESSAGES = {
  SUCCESS: {
    SAVE: "保存が完了しました",
    UPDATE: "更新が完了しました",
    DELETE: "削除が完了しました",
  },
  ERROR: {
    GENERAL: "予期せぬエラーが発生しました",
    VALIDATION: "入力内容に誤りがあります",
    NETWORK: "通信エラーが発生しました",
    UNAUTHORIZED: "権限がありません",
  },
  WARNING: {
    CONFIRM_DELETE: "削除してもよろしいですか？",
    SESSION_EXPIRATION: "セッションの有効期限が切れています",
  },
  INFO: {
    LOADING: "処理中です...",
    AUTO_SAVE: "自動保存されました",
  },
} as const;
