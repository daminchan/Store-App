import { useState } from "react";
import { useNotification } from "@/hooks/common";
import { generateInvitationCode } from "../../../_actions";

import { INVITATION_EVENTS } from "../../../_events/invitation";

/**
 * 招待コード生成フォームのカスタムフック
 * @description フォームの状態管理とバリデーション、エラーハンドリングを行う
 *
 * 機能:
 * - 招待コードの生成処理
 * - バリデーション（1-365日の範囲チェック）
 * - 生成成功時にCODE_GENERATEDイベントを発火し、リスト側の自動更新をトリガー
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
        // 招待コード生成イベントを発火
        // このイベントをInvitationListコンポーネントが購読し、一覧を自動更新
        const event = new CustomEvent(INVITATION_EVENTS.CODE_GENERATED);
        window.dispatchEvent(event);
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
