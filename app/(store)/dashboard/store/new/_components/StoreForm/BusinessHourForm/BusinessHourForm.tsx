"use client";

import { type FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { BusinessHour } from "@/types/store";
import { parse, format, isValid, isBefore } from "date-fns";
import { ja } from "date-fns/locale";

const DAYS_OF_WEEK = [
  { value: 0, label: "日曜日" },
  { value: 1, label: "月曜日" },
  { value: 2, label: "火曜日" },
  { value: 3, label: "水曜日" },
  { value: 4, label: "木曜日" },
  { value: 5, label: "金曜日" },
  { value: 6, label: "土曜日" },
] as const;

// 30分単位の時間選択肢を生成
const HOURS = Array.from({ length: 48 }, (_, i) => {
  const date = new Date();
  date.setHours(Math.floor(i / 2), (i % 2) * 30, 0);
  return {
    value: format(date, "HH:mm"),
    label: format(date, "HH:mm", { locale: ja }),
  };
});

interface Props {
  businessHours: BusinessHour[];
  onChange: (businessHours: BusinessHour[]) => void;
  error?: string;
}

/**
 * 営業時間設定フォームコンポーネント
 * 各曜日の営業時間を30分単位で設定できる
 */
export const BusinessHourForm: FC<Props> = ({
  businessHours,
  onChange,
  error,
}) => {
  /**
   * 営業時間の変更を処理する関数
   * @param dayOfWeek - 曜日（0-6: 日-土）
   * @param field - 変更する項目（開店時間または閉店時間）
   * @param value - 新しい時間値（HH:mm形式）
   * @returns void
   */
  const handleTimeChange = (
    dayOfWeek: number,
    field: "openTime" | "closeTime",
    value: string
  ) => {
    const newBusinessHours = businessHours.map((hour) => {
      if (hour.dayOfWeek === dayOfWeek) {
        const updatedHour = { ...hour, [field]: value };
        const { openTime, closeTime } = updatedHour;

        // 開店時間と閉店時間の妥当性チェック
        const parsedOpenTime = parse(openTime, "HH:mm", new Date());
        const parsedCloseTime = parse(closeTime, "HH:mm", new Date());

        if (!isValid(parsedOpenTime) || !isValid(parsedCloseTime)) {
          return hour;
        }

        // 閉店時間が開店時間より前の場合は更新しない
        if (isBefore(parsedCloseTime, parsedOpenTime)) {
          return hour;
        }

        return updatedHour;
      }
      return hour;
    });

    onChange(newBusinessHours);
  };

  /**
   * 営業日の切り替えを処理する関数
   * @param dayOfWeek - 曜日（0-6: 日-土）
   * @param isOpen - 営業/休業の状態
   * @returns void
   */
  const handleDayToggle = (dayOfWeek: number, isOpen: boolean) => {
    if (isOpen) {
      const newBusinessHour: BusinessHour = {
        dayOfWeek,
        openTime: "09:00",
        closeTime: "17:00",
      };
      onChange([...businessHours, newBusinessHour]);
    } else {
      onChange(businessHours.filter((hour) => hour.dayOfWeek !== dayOfWeek));
    }
  };

  return (
    <div className="space-y-4">
      {DAYS_OF_WEEK.map(({ value: dayOfWeek, label }) => {
        const businessHour = businessHours.find(
          (hour) => hour.dayOfWeek === dayOfWeek
        );
        const isOpen = !!businessHour;

        return (
          <div key={dayOfWeek} className="flex items-center gap-4">
            <div className="w-24">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isOpen}
                  onCheckedChange={(checked: boolean) =>
                    handleDayToggle(dayOfWeek, checked)
                  }
                />
                <span className="text-sm font-medium">{label}</span>
              </div>
            </div>
            {isOpen && businessHour && (
              <>
                <Select
                  value={businessHour.openTime}
                  onValueChange={(value: string) =>
                    handleTimeChange(dayOfWeek, "openTime", value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="開店時間" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOURS.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-sm">〜</span>
                <Select
                  value={businessHour.closeTime}
                  onValueChange={(value: string) =>
                    handleTimeChange(dayOfWeek, "closeTime", value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="閉店時間" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOURS.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        );
      })}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
