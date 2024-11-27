"use client";

import { type FC, useCallback } from "react";
import type { BusinessHour } from "@/types/store";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Flex } from "@/components/layout";
import { cn } from "@/lib/utils";

interface BusinessHourFormProps {
  businessHours: BusinessHour[];
  onChange: (hours: BusinessHour[]) => void;
  error?: string;
}

const DAYS_OF_WEEK = ["日", "月", "火", "水", "木", "金", "土"] as const;
type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

// 初期値として全曜日分のデータを用意
const INITIAL_BUSINESS_HOURS: Readonly<BusinessHour[]> = DAYS_OF_WEEK.map(
  (_, index) => ({
    dayOfWeek: index,
    openTime: "09:00",
    closeTime: "17:00",
    isHoliday: false,
  })
);

/**
 * 営業時間設定フォームコンポーネント
 */
export const BusinessHourForm: FC<BusinessHourFormProps> = ({
  businessHours,
  onChange,
  error,
}) => {
  // 初期表示時に全曜日分のデータがない場合は初期値を設定
  const hours =
    businessHours.length === 7 ? businessHours : INITIAL_BUSINESS_HOURS;

  /**
   * 休業日の切り替え処理
   */
  const handleHolidayChange = useCallback(
    (dayOfWeek: number, checked: boolean) => {
      const newHours = hours.map((hour) =>
        hour.dayOfWeek === dayOfWeek ? { ...hour, isHoliday: checked } : hour
      );
      onChange(newHours);
    },
    [hours, onChange]
  );

  /**
   * 営業時間の変更処理
   */
  const handleTimeChange = useCallback(
    (dayOfWeek: number, field: "openTime" | "closeTime", value: string) => {
      const newHours = hours.map((hour) =>
        hour.dayOfWeek === dayOfWeek ? { ...hour, [field]: value } : hour
      );
      onChange(newHours);
    },
    [hours, onChange]
  );

  return (
    <Flex direction="column" gap="4">
      {DAYS_OF_WEEK.map((day, index) => {
        const hour = hours[index];

        return (
          <Flex key={day} align="center" gap="6">
            {/* 曜日と休業日チェックボックス */}
            <Flex className="w-32" align="center" justify="between">
              <Label
                className={cn("w-6 text-center", {
                  "text-red-500": index === 0, // 日曜日
                  "text-blue-500": index === 6, // 土曜日
                })}
              >
                {day}
              </Label>
              <Flex align="center" gap="2">
                <Checkbox
                  id={`holiday-${index}`}
                  checked={hour.isHoliday}
                  onCheckedChange={(checked) =>
                    handleHolidayChange(index, checked as boolean)
                  }
                />
                <Label htmlFor={`holiday-${index}`} className="text-sm">
                  休業日
                </Label>
              </Flex>
            </Flex>

            {/* 時間入力 */}
            {!hour.isHoliday && (
              <Flex align="center" gap="2">
                <input
                  type="time"
                  value={hour.openTime}
                  onChange={(e) =>
                    handleTimeChange(index, "openTime", e.target.value)
                  }
                  className="px-2 py-1 border rounded w-32"
                />
                <span className="text-sm text-muted-foreground">〜</span>
                <input
                  type="time"
                  value={hour.closeTime}
                  onChange={(e) =>
                    handleTimeChange(index, "closeTime", e.target.value)
                  }
                  className="px-2 py-1 border rounded w-32"
                />
              </Flex>
            )}
          </Flex>
        );
      })}
      {error && (
        <p
          className={cn("text-sm", {
            "text-emerald-500": error.startsWith("✓"),
            "text-red-500": !error.startsWith("✓"),
          })}
        >
          {error}
        </p>
      )}
    </Flex>
  );
};
