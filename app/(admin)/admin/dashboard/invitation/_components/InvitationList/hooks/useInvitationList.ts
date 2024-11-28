import { useState, useEffect } from "react";
import { useNotification } from "@/hooks/common";
import {
  listInvitationCodes,
  disableInvitationCode,
  deleteInvitationCode,
} from "../../../_actions";
import type { InvitationCode } from "@prisma/client";

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

  useEffect(() => {
    void fetchInvitationCodes();
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
