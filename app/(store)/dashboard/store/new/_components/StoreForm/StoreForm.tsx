"use client";

import { type FC, type ChangeEvent } from "react";
import { useStoreFormStore } from "@/stores/store";
import { STORE_VALIDATION, STORE_CATEGORIES } from "@/constants/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BusinessHourForm } from "./BusinessHourForm";

export const StoreForm: FC = () => {
  const { NAME, DESCRIPTION, CATEGORIES, BUSINESS_HOURS } = STORE_VALIDATION;
  const {
    name,
    description,
    categories,
    businessHours,
    errors,
    setName,
    setDescription,
    setCategories,
    setBusinessHours,
  } = useStoreFormStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: バリデーションと送信処理の実装
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...categories, categoryId]
      : categories.filter((id) => id !== categoryId);

    if (newCategories.length <= 5) {
      setCategories(newCategories);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            店舗名
            <span className="text-red-500 ml-1">*</span>
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            placeholder="店舗名を入力してください"
            aria-describedby="name-error"
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-red-500">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            店舗説明
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="店舗の説明を入力してください"
            rows={4}
            aria-describedby="description-error"
          />
          {errors.description && (
            <p id="description-error" className="text-sm text-red-500">
              {errors.description}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            カテゴリ
            <span className="text-red-500 ml-1">*</span>
            <span className="text-sm text-gray-500 ml-2">（最大5つまで）</span>
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STORE_CATEGORIES.map(({ id, label }) => (
              <div key={id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${id}`}
                  checked={categories.includes(id)}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(id, checked as boolean)
                  }
                  disabled={!categories.includes(id) && categories.length >= 5}
                />
                <label
                  htmlFor={`category-${id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {label}
                </label>
              </div>
            ))}
          </div>
          {errors.categories && (
            <p className="text-sm text-red-500">{errors.categories}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            営業時間
            <span className="text-red-500 ml-1">*</span>
          </label>
          <BusinessHourForm
            businessHours={businessHours}
            onChange={setBusinessHours}
            error={errors.businessHours}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => useStoreFormStore.getState().reset()}
          >
            リセット
          </Button>
          <Button type="submit">登録する</Button>
        </div>
      </form>
    </Card>
  );
};
