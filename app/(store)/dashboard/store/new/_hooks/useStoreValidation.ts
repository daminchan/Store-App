"use client";

import { useCallback } from "react";
import { useStoreFormStore } from "@/stores/store";
import {
  storeFormSchema,
  type StoreFormSchema,
} from "../_components/StoreForm/_schemas/validation";
import type { BusinessHour } from "@/types/store";

/**
 * バリデーションの状態を表す型
 * - initial: 初期状態（未入力）
 * - success: 検証成功
 * - error: 検証失敗
 */
type ValidationStatus = "initial" | "success" | "error";

/**
 * バリデーション結果のメッセージを表す型
 */
interface ValidationMessage {
  status: ValidationStatus;
  message: string;
}

/**
 * 店舗登録フォームのバリデーションを管理するカスタムフック
 * 各フィールドの入力値を検証し、適切なメッセージを返します
 */
export const useStoreValidation = () => {
  const store = useStoreFormStore();

  /**
   * 店舗名のバリデーション
   * - 必須入力
   * - 1-50文字
   * - 使用可能文字（英数字、ひらがな、カタカナ、漢字、スペース）
   */
  const validateName = useCallback((value: string): ValidationMessage => {
    const nameValue = value.trim();
    // 空の場合
    if (nameValue === "") {
      return {
        status: "initial",
        message: "店舗名を入力してください",
      };
    }
    // 入力値の検証
    const result = storeFormSchema.shape.name.safeParse(nameValue);
    if (!result.success) {
      return {
        status: "error",
        message: "不正な文字列が使用されています",
      };
    }
    // 正常な入力
    return {
      status: "success",
      message: "✓ accept",
    };
  }, []);

  /**
   * カテゴリーのバリデーション
   * - 1つ以上5つまで選択可能
   * - 未選択の場合は初期状態として扱う
   */
  const validateCategories = useCallback(
    (categories: string[]): ValidationMessage => {
      return {
        status: categories.length === 0 ? "initial" : "success",
        message:
          categories.length === 0
            ? "1つ以上チェックしてください"
            : `✓ ${categories.length}個のカテゴリーを選択しました`,
      };
    },
    []
  );

  /**
   * 営業時間のバリデーション
   * - 7日分の設定が必要
   * - 各日で営業/休業を設定可能
   * - 営業日には開始・終了時間が必要
   */
  const validateBusinessHours = useCallback(
    (hours: BusinessHour[]): ValidationMessage => {
      if (hours.length === 0) {
        return {
          status: "initial",
          message: "営業時間を設定してください",
        };
      }

      // 設定済みの日数と休業日数を計算
      const totalDays = hours.length;
      const holidayCount = hours.filter((h) => h.isHoliday).length;
      const businessDays = totalDays - holidayCount;

      // メッセージを生成
      const message =
        totalDays === 7
          ? `✓ 営業日${businessDays}日、休業日${holidayCount}日で設定完了`
          : `✓ ${totalDays}日分の営業時間を設定中`;

      return {
        status: "success",
        message,
      };
    },
    []
  );

  /**
   * フィールドごとのバリデーションを実行
   * @param field - バリデーション対象のフィールド名
   * @param newValue - 新しい値（省略時は現在のストアの値を使用）
   */
  const validateField = useCallback(
    (field: keyof StoreFormSchema, newValue?: unknown): ValidationMessage => {
      const value = typeof newValue !== "undefined" ? newValue : store[field];

      switch (field) {
        case "name":
          return validateName(value as string);
        case "categories":
          return validateCategories(value as string[]);
        case "businessHours":
          return validateBusinessHours(value as BusinessHour[]);
        default:
          return {
            status: "success",
            message: "",
          };
      }
    },
    [store, validateName, validateCategories, validateBusinessHours]
  );

  /**
   * フォーム全体のバリデーションを実行
   * @returns バリデーション結果（true: 成功, false: 失敗）
   */
  const validateForm = useCallback(() => {
    if (!store.name.trim()) {
      store.setError("name", "店舗名を入力してください");
      return false;
    }

    if (store.categories.length === 0) {
      store.setError("categories", "1つ以上のカテゴリーを選択してください");
      return false;
    }

    return true;
  }, [store]);

  return {
    validateField,
    validateForm,
  };
};
