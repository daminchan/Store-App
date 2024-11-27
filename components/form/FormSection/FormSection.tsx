"use client";

import { type FC, type ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Flex } from "@/components/layout";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface FormSectionProps {
  /** セクションのタイトル */
  title: string;
  /** 説明文（任意） */
  description?: string;
  /** 必須項目かどうか */
  required?: boolean;
  /** 子要素 */
  children: ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * フォームセクションの共通レイアウトコンポーネント
 */
export const FormSection: FC<FormSectionProps> = ({
  title,
  description,
  required = false,
  children,
  className,
}) => {
  return (
    <div className={cn("rounded-lg border p-6 bg-card", className)}>
      <Flex direction="column" gap="4">
        <Flex direction="column" gap="2">
          <Flex align="center" gap="2">
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
            <Label className="text-lg font-semibold tracking-tight">
              {title}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          </Flex>
          {description && (
            <p className="text-sm text-muted-foreground ml-7">{description}</p>
          )}
        </Flex>
        <div className="ml-7">{children}</div>
      </Flex>
    </div>
  );
};
