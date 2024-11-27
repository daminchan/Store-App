"use client";

import { useCallback } from "react";
import type { ReactNode } from "react";
import { type ToastProps } from "@/components/ui/toast";
import { useToast } from "../use-toast";

/** 通知の種類 */
type NotificationType = "success" | "error" | "warning" | "info";

/** 通知オプションの型 */
type NotificationOptions = {
  /** 通知の種類 */
  type?: NotificationType;
  /** 通知の表示時間（ミリ秒） */
  duration?: number;
};

/**
 * @file useNotification.ts
 * @description 通知機能を管理するカスタムフック
 *
 * このフックは以下の機能を提供します：
 * 1. 成功、エラー、警告、情報の4種類の通知表示
 * 2. 通知の表示時間のカスタマイズ
 * 3. 通知のスタイル（色）の自動設定
 *
 * @example
 * ```tsx
 * const { showNotification } = useNotification()
 *
 * // 成功通知
 * showNotification('保存が完了しました', { type: 'success' })
 *
 * // エラー通知
 * showNotification('エラーが発生しました', { type: 'error' })
 * ```
 */
export const useNotification = () => {
  const { toast } = useToast();

  /**
   * 通知を表示する
   * @param message - 表示するメッセージ（文字列またはJSX）
   * @param options - 通知のオプション
   */
  const showNotification = useCallback(
    (message: ReactNode, options: NotificationOptions = {}) => {
      const { type = "info", duration = 3000 } = options;

      // 通知の種類に応じてスタイルとクラスを設定
      const getVariantAndClass = (
        type: NotificationType
      ): {
        variant: ToastProps["variant"];
        className?: string;
      } => {
        switch (type) {
          case "success":
            return { variant: "default" };
          case "error":
            return { variant: "destructive" };
          case "warning":
            return { variant: "default" };
          case "info":
          default:
            return { variant: "default" };
        }
      };

      const { variant, className } = getVariantAndClass(type);

      toast({
        description: message,
        variant,
        className,
        duration,
      });
    },
    [toast]
  );

  return {
    showNotification,
  };
};
