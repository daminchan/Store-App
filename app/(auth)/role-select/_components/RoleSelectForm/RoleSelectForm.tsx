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

/** リダイレクト先のパス */
const REDIRECT_PATHS = {
  STORE_OWNER: "/dashboard/store/new",
  CUSTOMER: "/",
} as const;

/** フォームの状態を表す型 */
type RoleSelectFormState = Readonly<{
  /** ローディング状態 */
  isLoading: boolean;
  /** エラーメッセージ */
  errorMessage: string;
}>;

/** 初期のフォーム状態 */
const INITIAL_FORM_STATE: RoleSelectFormState = {
  isLoading: false,
  errorMessage: "",
} as const;

/**
 * 役割選択フォームコンポーネント
 * ユーザーが役割を選択し、選択結果を保存する
 */
export const RoleSelectForm: FC = () => {
  const [formState, setFormState] =
    useState<RoleSelectFormState>(INITIAL_FORM_STATE);
  const { handleRoleSelect } = useRoleSelect();
  const router = useRouter();

  /** 役割選択時の処理 */
  const handleSelect = async (role: UserRoleType): Promise<void> => {
    setFormState({ ...INITIAL_FORM_STATE, isLoading: true });

    try {
      await handleRoleSelect(role);
      const redirectPath =
        role === USER_ROLES.STORE_OWNER
          ? REDIRECT_PATHS.STORE_OWNER
          : REDIRECT_PATHS.CUSTOMER;
      router.push(redirectPath);
    } catch (err) {
      setFormState({
        isLoading: false,
        errorMessage: "役割の設定に失敗しました。もう一度お試しください。",
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
          isDisabled={formState.isLoading}
          role={USER_ROLES.STORE_OWNER}
        />
        <RoleCard
          title="お客様"
          description="お店の予約や情報閲覧ができます。個人のお客様向けの機能が利用できます。"
          onSelect={() => handleSelect(USER_ROLES.CUSTOMER)}
          isDisabled={formState.isLoading}
          role={USER_ROLES.CUSTOMER}
        />
      </Flex>

      {formState.errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{formState.errorMessage}</AlertDescription>
        </Alert>
      )}
    </Flex>
  );
};
