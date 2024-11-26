// src/app/(auth)/role-select/_hooks/useRoleSelect.ts

import { useState } from "react";
import { useRouter } from "next/navigation";

import { USER_ROLES, UserRoleType } from "@/types/user";
import { updateUserRole } from "../_api/updateUserRole";

/** フックの戻り値の型 */
type UseRoleSelectReturnType = Readonly<{
  /** 役割選択の処理中かどうか */
  isLoading: boolean;
  /** エラーメッセージ */
  error: string;
  /** 役割選択を処理する関数 */
  handleRoleSelect: (role: UserRoleType) => Promise<void>;
}>;

/**
 * 役割選択のカスタムフック
 */
export const useRoleSelect = (): UseRoleSelectReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRoleSelect = async (role: UserRoleType): Promise<void> => {
    setIsLoading(true);
    setError("");

    try {
      const result = await updateUserRole(role);

      if (result.error) {
        setError(result.error);
        return;
      }

      // 役割に応じてリダイレクト
      const redirectPath =
        role === USER_ROLES.STORE_OWNER ? "/dashboard/store/new" : "/";
      router.push(redirectPath);
    } catch (err) {
      setError("予期せぬエラーが発生しました");
      console.error("Role selection failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    handleRoleSelect,
  } as const;
};
