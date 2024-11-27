"use client";

import { type FC, type ChangeEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { FormSection, ValidationMessage } from "@/components/form";
import { useStoreFormStore } from "@/stores/store";
import { useStoreValidation } from "../../../_hooks/useStoreValidation";

/**
 * 店舗説明入力セクション
 * @description 店舗の説明文の入力とバリデーションを管理
 */
export const DescriptionSection: FC = () => {
  const { description, errors, setDescription, setError } = useStoreFormStore();
  const { validateField } = useStoreValidation();

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    const validation = validateField("description");
    setError("description", validation.message);
  };

  return (
    <FormSection
      title="店舗説明"
      description="店舗の特徴や雰囲気、提供するサービスなどを入力してください"
    >
      <Textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="店舗の特徴や雰囲気、提供するサービスなどを入力してください"
        rows={4}
        aria-describedby="description-error"
        className="max-w-xl"
      />
      {errors.description && (
        <ValidationMessage
          message={errors.description}
          status={validateField("description").status}
        />
      )}
    </FormSection>
  );
};
