"use client";

import { type FC } from "react";
import { FormSection } from "@/components/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useNotification } from "@/hooks/common";
import { validateInvitation } from "../../_actions";
import { useInvitationValidation } from "../../_hooks";
import { Flex } from "@/components/layout";
import { AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * 通知メッセージのコンポーネントを生成する関数
 */
const createNotificationMessage = (
  icon: React.ReactNode,
  message: string
): React.ReactNode => (
  <Flex align="center" gap="2">
    {icon}
    <span>{message}</span>
  </Flex>
);

/**
 * エラー通知のメッセージを生成する関数
 */
const createErrorNotification = (message: string): React.ReactNode =>
  createNotificationMessage(
    <AlertCircle className="h-5 w-5 text-red-500" />,
    message
  );

/**
 * 成功通知のメッセージを生成する関数
 */
const createSuccessNotification = (message: string): React.ReactNode =>
  createNotificationMessage(
    <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    message
  );

/** 招待コード入力フォームのエラーメッセージ */
const ERROR_MESSAGES = {
  VALIDATION: "入力内容に誤りがあります。",
  UNEXPECTED: "予期せぬエラーが発生しました。",
} as const;

/** 招待コード入力フォームの成功メッセージ */
const SUCCESS_MESSAGES = {
  VALIDATED: "招待コードが確認できました。",
} as const;

/**
 * 招待コード入力フォーム
 * @description 店舗登録のための招待コードを入力し、検証を行うフォームコンポーネント
 */
export const StoreInvitationForm: FC = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { showNotification } = useNotification();
  const { validateForm, code, setCode } = useInvitationValidation();

  /** フォームのバリデーションエラー時の処理 */
  const handleValidationError = () => {
    showNotification({
      title: "エラー",
      description: ERROR_MESSAGES.VALIDATION,
      type: "error",
    });
  };

  /** 招待コードの検証成功時の処理 */
  const handleValidationSuccess = () => {
    showNotification({
      title: "成功",
      description: SUCCESS_MESSAGES.VALIDATED,
      type: "success",
    });
    router.push("/dashboard/store/new");
  };

  /** 予期せぬエラー発生時の処理 */
  const handleUnexpectedError = (error: unknown) => {
    console.error("Failed to validate invitation code:", error);
    showNotification({
      title: "エラー",
      description: ERROR_MESSAGES.UNEXPECTED,
      type: "error",
    });
  };

  /** フォーム送信時の処理 */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      handleValidationError();
      return;
    }

    startTransition(async () => {
      try {
        const result = await validateInvitation({ code });

        if ("success" in result) {
          handleValidationSuccess();
        } else {
          showNotification({
            title: "エラー",
            description: result.message,
            type: "error",
          });
        }
      } catch (error) {
        handleUnexpectedError(error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormSection
        title="招待コード"
        description="発行された招待コードを入力してください"
        required
      >
        <Input
          type="text"
          placeholder="XXXX-XXXX-XXXX"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isPending}
        />
      </FormSection>

      <div className="mt-6">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "確認中..." : "確認する"}
        </Button>
      </div>
    </form>
  );
};
