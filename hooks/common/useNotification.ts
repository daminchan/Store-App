"use client";

import { useCallback } from "react";
import { useToast } from "../use-toast";

/** 通知の種類 */
type NotificationType = "success" | "error" | "warning" | "info";

/** 通知オプションの型 */
type NotificationOptions = {
  /** タイトル */
  title: string;
  /** 説明 */
  description: string;
  /** 通知の種類 */
  type?: NotificationType;
  /** 通知の表示時間（ミリ秒） */
  duration?: number;
};

/**
 * @file useNotification.ts
 * @description 通知機能を管理するカスタムフック
 */
export const useNotification = () => {
  const { toast } = useToast();

  /**
   * 通知を表示する
   * @param options - 通知のオプション
   */
  const showNotification = useCallback(
    (options: NotificationOptions) => {
      const { title, description, type = "info", duration = 3000 } = options;

      // 通知の種類に応じてバリアントを設定
      const getVariant = (type: NotificationType) => {
        switch (type) {
          case "success":
            return "default";
          case "error":
            return "destructive";
          case "warning":
          case "info":
          default:
            return "default";
        }
      };

      toast({
        title,
        description,
        variant: getVariant(type),
        duration,
      });
    },
    [toast]
  );

  return {
    showNotification,
  };
};
