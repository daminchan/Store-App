// src/app/(auth)/role-select/_components/RoleSelectForm/RoleSelectForm.tsx
"use client";
import { type FC } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { RoleCard } from "../RoleCard";
import { useRoleSelect } from "../../_hooks";
import { USER_ROLES, UserRoleType } from "@/types/user";
import { Flex } from "@/components/layout";
import { ROLE_REDIRECT_PATHS } from "@/constants/auth/paths";
import { AUTH_ERROR_MESSAGES } from "@/constants/auth/messages";

/** フォームの状態を表す型 */
type FormState = {
  /** ローディング状態 */
  isLoading: boolean;
  /** エラーメッセージ */
  errorMessage: string;
};

/**
 * 役割選択フォームコンポーネント
 * ユーザーが役割を選択し、選択結果を保存する
 */
export const RoleSelectForm: FC = () => {
  const [{ isLoading, errorMessage }, setFormState] = useState<FormState>({
    isLoading: false,
    errorMessage: "",
  });
  const { handleRoleSelect } = useRoleSelect();
  const router = useRouter();

  /** 役割選択時の処理 */
  const handleSelect = async (role: UserRoleType): Promise<void> => {
    setFormState({ isLoading: true, errorMessage: "" });

    try {
      await handleRoleSelect(role);
      const redirectPath = ROLE_REDIRECT_PATHS[role];
      router.push(redirectPath);
    } catch (err) {
      setFormState({
        isLoading: false,
        errorMessage: AUTH_ERROR_MESSAGES.ROLE_SELECT_FAILED,
      });
      console.error("Role selection failed:", err);
    }
  };

  return (
    <Flex direction="column" gap="6">
      <h2 className="text-2xl font-semibold text-center text-foreground">
        アカウントタイプを選択
      </h2>
      <p className="text-center text-muted-foreground">
        あなたに最適な機能を提供するため、アカウントタイプをお選びください
      </p>

      <Flex direction="column" gap="4">
        <RoleCard
          title="店舗オーナー"
          description="お店の予約管理や情報更新ができます。ビジネスアカウントとして機能が利用できます。"
          onSelect={() => handleSelect(USER_ROLES.STORE_OWNER)}
          isDisabled={isLoading}
          role={USER_ROLES.STORE_OWNER}
        />
        <RoleCard
          title="お客様"
          description="お店の予約や情報閲覧ができます。個人のお客様向けの機能が利用できます。"
          onSelect={() => handleSelect(USER_ROLES.CUSTOMER)}
          isDisabled={isLoading}
          role={USER_ROLES.CUSTOMER}
        />
      </Flex>

      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};
