"use client";

import { type FC } from "react";
import { FormSection, ValidationMessage } from "@/components/form";
import { useStoreFormStore } from "@/stores/store";
import { useStoreValidation } from "../../../_hooks/useStoreValidation";
import { BusinessHourForm } from "../BusinessHourForm";
import type { BusinessHour } from "@/types/store";

/**
 * 営業時間設定セクション
 * @description 営業時間の設定とバリデーションを管理（7日分必須）
 */
export const BusinessHoursSection: FC = () => {
  const { businessHours, errors, setBusinessHours, setError } =
    useStoreFormStore();
  const { validateField } = useStoreValidation();

  const handleBusinessHoursChange = (newBusinessHours: BusinessHour[]) => {
    setBusinessHours(newBusinessHours);
    const validation = validateField("businessHours", newBusinessHours);
    setError("businessHours", validation.message);
  };

  return (
    <FormSection
      title="営業時間"
      description="各曜日の営業時間を設定してください"
      required
    >
      <div className="p-4 border rounded-lg bg-muted/50">
        <BusinessHourForm
          businessHours={businessHours}
          onChange={handleBusinessHoursChange}
          error={errors.businessHours}
        />
      </div>
    </FormSection>
  );
};
