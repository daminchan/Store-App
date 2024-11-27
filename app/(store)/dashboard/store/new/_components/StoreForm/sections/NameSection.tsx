"use client";

import { type FC, type ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { FormSection, ValidationMessage } from "@/components/form";
import { useStoreFormStore } from "@/stores/store";
import { useStoreValidation } from "../../../_hooks/useStoreValidation";

/**
 * 店舗名入力セクション
 * @description 店舗名の入力とバリデーションを管理
 */
export const NameSection: FC = () => {
  const { name, errors, setName, setError } = useStoreFormStore();
  const { validateField } = useStoreValidation();

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setName(newValue);

    // 値が空の場合はエラーメッセージをクリア
    if (!newValue.trim()) {
      setError("name", "店舗名を入力してください");
      return;
    }

    const validation = validateField("name", newValue);
    setError("name", validation.message);
  };

  return (
    <FormSection
      title="店舗名"
      description="店舗の正式名称を入力してください"
      required
    >
      <Input
        value={name}
        onChange={handleNameChange}
        placeholder="例: カフェ Cursor"
        aria-describedby="name-error"
        className="max-w-xl"
      />
      {errors.name && (
        <ValidationMessage
          message={errors.name}
          status={validateField("name").status}
        />
      )}
    </FormSection>
  );
};
