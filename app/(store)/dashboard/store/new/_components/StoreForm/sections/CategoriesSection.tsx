"use client";

import { type FC } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormSection, ValidationMessage } from "@/components/form";
import { Flex } from "@/components/layout";
import { useStoreFormStore } from "@/stores/store";
import { useStoreValidation } from "../../../_hooks/useStoreValidation";
import { STORE_CATEGORIES } from "@/constants/store";

/**
 * 店舗カテゴリー選択セクション
 * @description カテゴリーの選択とバリデーションを管理（最大5つまで）
 */
export const CategoriesSection: FC = () => {
  const { categories, errors, setCategories, setError } = useStoreFormStore();
  const { validateField } = useStoreValidation();

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...categories, categoryId]
      : categories.filter((id) => id !== categoryId);

    if (newCategories.length <= 5) {
      setCategories(newCategories);
      const validation = validateField("categories", newCategories);
      setError("categories", validation.message);
    }
  };

  return (
    <FormSection
      title="カテゴリ"
      description="最大5つまでカテゴリを選択できます"
      required
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border rounded-lg bg-muted/50">
        {STORE_CATEGORIES.map(({ id, label }) => (
          <Flex key={id} align="center" gap="2">
            <Checkbox
              id={`category-${id}`}
              checked={categories.includes(id)}
              onCheckedChange={(checked) =>
                handleCategoryChange(id, checked as boolean)
              }
              disabled={!categories.includes(id) && categories.length >= 5}
            />
            <Label
              htmlFor={`category-${id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </Label>
          </Flex>
        ))}
      </div>
      {errors.categories && (
        <ValidationMessage
          message={errors.categories}
          status={validateField("categories").status}
        />
      )}
    </FormSection>
  );
};
