"use client";

import { type FC } from "react";
import { cn } from "@/lib/utils";

interface ValidationMessageProps {
  /** メッセージの内容 */
  message: string;
  /** メッセージの状態 */
  status: "initial" | "success" | "error";
  /** 追加のクラス名 */
  className?: string;
}

/**
 * バリデーションメッセージ表示コンポーネント
 * @example
 * <ValidationMessage
 *   message="✓ 入力OK"
 *   status="success"
 * />
 */
export const ValidationMessage: FC<ValidationMessageProps> = ({
  message,
  status,
  className,
}) => {
  return (
    <p
      className={cn(
        "text-sm flex items-center gap-1",
        {
          "text-muted-foreground": status === "initial",
          "text-emerald-500 font-medium": status === "success",
          "text-red-500": status === "error",
        },
        className
      )}
    >
      {message}
    </p>
  );
};
