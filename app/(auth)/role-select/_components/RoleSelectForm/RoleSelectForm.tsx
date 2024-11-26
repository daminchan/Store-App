// src/app/(auth)/role-select/_components/RoleSelectForm/RoleSelectForm.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { type RoleSelectFormState } from "../../_types";

import { RoleCard } from "../RoleCard";
import { USER_ROLES, UserRoleType } from "@/types/user";
import { useRoleSelect } from "../../_hooks";

/** 初期のフォーム状態 */
const INITIAL_FORM_STATE: RoleSelectFormState = {
  isLoading: false,
  errorMessage: "",
} as const;

/**
 * 役割選択フォームコンポーネント
 * ユーザーが役割を選択し、選択結果を保存する
 */
export const RoleSelectForm = () => {
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
        role === USER_ROLES.STORE_OWNER ? "/dashboard/store/new" : "/";
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
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <RoleCard
          title="店舗オーナー"
          description="お店の予約管理や情報更新ができます"
          onSelect={() => handleSelect(USER_ROLES.STORE_OWNER)}
          isDisabled={formState.isLoading}
        />
        <RoleCard
          title="お客様"
          description="お店の予約や情報閲覧ができます"
          onSelect={() => handleSelect(USER_ROLES.CUSTOMER)}
          isDisabled={formState.isLoading}
        />
      </div>
      {formState.errorMessage && (
        <p className="text-sm text-red-600 text-center mt-4" role="alert">
          {formState.errorMessage}
        </p>
      )}
    </div>
  );
};
