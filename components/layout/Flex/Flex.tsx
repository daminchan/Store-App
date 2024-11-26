// src/components/ui/layout/Flex/Flex.tsx

import { type FC, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Flexコンテナのプロパティ */
type FlexProps = {
  /** 子要素 */
  children: ReactNode;
  /** 方向 */
  direction?: "row" | "column";
  /** 水平方向の配置 */
  justify?: "start" | "end" | "center" | "between" | "around";
  /** 垂直方向の配置 */
  align?: "start" | "end" | "center" | "stretch";
  /** ラップ設定 */
  wrap?: "wrap" | "nowrap";
  /** 要素間の間隔 */
  gap?: "1" | "2" | "3" | "4" | "6" | "8";
  /** 追加のクラス名 */
  className?: string;
};

/**
 * 汎用的なFlexboxレイアウトコンポーネント
 * @example
 * ```tsx
 * <Flex direction="column" justify="between" align="center" gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Flex>
 * ```
 */
export const Flex: FC<FlexProps> = ({
  children,
  direction = "row",
  justify = "start",
  align = "stretch",
  wrap = "nowrap",
  gap,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex",
        {
          "flex-row": direction === "row",
          "flex-col": direction === "column",
          "justify-start": justify === "start",
          "justify-end": justify === "end",
          "justify-center": justify === "center",
          "justify-between": justify === "between",
          "justify-around": justify === "around",
          "items-start": align === "start",
          "items-end": align === "end",
          "items-center": align === "center",
          "items-stretch": align === "stretch",
          "flex-wrap": wrap === "wrap",
          "flex-nowrap": wrap === "nowrap",
          "gap-1": gap === "1",
          "gap-2": gap === "2",
          "gap-3": gap === "3",
          "gap-4": gap === "4",
          "gap-6": gap === "6",
          "gap-8": gap === "8",
        },
        className
      )}
    >
      {children}
    </div>
  );
};
