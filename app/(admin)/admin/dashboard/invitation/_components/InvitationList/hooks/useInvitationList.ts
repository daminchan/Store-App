import { useState, useEffect } from "react";
import type { InvitationCode } from "@prisma/client";
import { useNotification } from "@/hooks/common";
import {
  listInvitationCodes,
  disableInvitationCode,
  deleteInvitationCode,
} from "../../../_actions";
import { INVITATION_EVENTS } from "../../../_events/invitation";

/**
 * 招待コード一覧のカスタムフック
 * @description 招待コードの一覧表示、無効化、削除の機能を提供
 *
 * 機能:
 * - 招待コード一覧の取得と表示
 * - 招待コードの無効化と削除
 * - InvitationFormからのCODE_GENERATEDイベントを購読し、一覧を自動更新
 *
 * イベント連携:
 * 1. InvitationFormで招待コード生成成功
 * 2. CODE_GENERATEDイベントが発火
 * 3. このフックでイベントを検知
 * 4. 一覧を自動的に再取得して最新状態を表示
 */
export const useInvitationList = () => {
  const [invitationCodes, setInvitationCodes] = useState<InvitationCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();

  const fetchInvitationCodes = async () => {
    try {
      const result = await listInvitationCodes();

      if (result.success) {
        setInvitationCodes(result.data);
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
        description: "招待コードの取得に失敗しました",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 初回読み込み
  useEffect(() => {
    void fetchInvitationCodes();
  }, []);

  // 招待コード生成イベントのリスナーを設定
  // InvitationFormで発火されたイベントを購読し、一覧を自動更新
  useEffect(() => {
    const handleCodeGenerated = () => {
      void fetchInvitationCodes();
    };

    window.addEventListener(
      INVITATION_EVENTS.CODE_GENERATED,
      handleCodeGenerated
    );

    // コンポーネントのアンマウント時にイベントリスナーを解除
    return () => {
      window.removeEventListener(
        INVITATION_EVENTS.CODE_GENERATED,
        handleCodeGenerated
      );
    };
  }, []);

  const handleDisable = async (codeId: string) => {
    try {
      const result = await disableInvitationCode(codeId);

      if (result.success) {
        showNotification({
          title: "成功",
          description: "招待コードを無効化しました",
          type: "success",
        });
        // 一覧を再取得
        void fetchInvitationCodes();
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
        description: "招待コードの無効化に失敗しました",
        type: "error",
      });
    }
  };

  const handleDelete = async (codeId: string) => {
    try {
      const result = await deleteInvitationCode(codeId);

      if (result.success) {
        showNotification({
          title: "成功",
          description: "招待コードを削除しました",
          type: "success",
        });
        // 一覧を再取得
        void fetchInvitationCodes();
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
        description: "招待コードの削除に失敗しました",
        type: "error",
      });
    }
  };

  return {
    invitationCodes,
    isLoading,
    handleDisable,
    handleDelete,
  };
};
