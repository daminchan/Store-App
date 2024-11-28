import { useState } from "react";
import { useNotification } from "@/hooks/common";
import { generateInvitationCode } from "../../../_actions";
import type { GeneratedInvitationCodeResponse } from "@/types/invitation";

/**
 * 招待コード生成フォームのカスタムフック
 * @description フォームの状態管理とバリデーション、エラーハンドリングを行う
 */
export const useInvitationForm = () => {
  const [validDays, setValidDays] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // バリデーション
    if (validDays < 1 || validDays > 365) {
      showNotification({
        title: "エラー",
        description: "有効期限は1日から365日の間で設定してください",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await generateInvitationCode(validDays);

      if (result.success) {
        showNotification({
          title: "成功",
          description: `招待コード: ${result.data.code}を生成しました`,
          type: "success",
        });
      } else {
        showNotification({
          title: "エラー",
          description: result.error.message,
          type: "error",
        });
      }
    } catch (error) {
      showNotification({
        title: "エラー",
        description: "予期せぬエラーが発生しました",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // 数値以外の入力は無視
    if (isNaN(value)) return;
    setValidDays(value);
  };

  return {
    validDays,
    isLoading,
    handleSubmit,
    handleValidDaysChange,
  };
};
