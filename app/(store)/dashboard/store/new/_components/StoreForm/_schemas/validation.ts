import { z } from "zod";
import { STORE_VALIDATION } from "@/constants/store";
import { STORE_CATEGORIES } from "@/constants/store";
import type { StoreCategory } from "@/constants/store/categories";

/**
 * @rule 厳密な型付け - Zodスキーマから型を自動生成
 * @rule nullの使用禁止 - undefinedを使用
 */

/**
 * 営業時間のスキーマ
 *
 * バリデーションルール：
 * 1. dayOfWeek: 0-6の数値（日曜日から土曜日）
 * 2. openTime: HH:mm形式（00:00-23:59）
 * 3. closeTime: HH:mm形式（00:00-23:59）
 * 4. カスタムルール: 閉店時間は開店時間より後である必要がある
 */
export const businessHourSchema = z
  .object({
    // 曜日の検証（0: 日曜日 - 6: 土曜日）
    dayOfWeek: z.number().min(0).max(6),
    // 開店時間の検証（HH:mm形式）
    openTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
      message: STORE_VALIDATION.BUSINESS_HOURS.TIME_FORMAT,
    }),
    // 閉店時間の検証（HH:mm形式）
    closeTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
      message: STORE_VALIDATION.BUSINESS_HOURS.TIME_FORMAT,
    }),
    // 休業日フラグ
    isHoliday: z.boolean().default(false),
  })
  // 開店時間と閉店時間の整合性チェック
  .refine(
    ({ openTime, closeTime }) => {
      const [openHour] = openTime.split(":");
      const [closeHour] = closeTime.split(":");
      return Number(openHour) < Number(closeHour);
    },
    {
      message: "閉店時間は開店時間より後である必要があります",
    }
  );

// 有効なカテゴリーIDの配列
const validCategoryIds = STORE_CATEGORIES.map((c) => c.id);

/**
 * 店舗フォームのスキーマ
 *
 * バリデーションルール：
 * 1. name: 必須、1-50文字、使用可能文字（英数字、ひらがな、カタカナ、漢字、スペース）
 * 2. description: 任意、最大500文字
 * 3. categories: 1-5個のカテゴリー、有効なカテゴリーIDのみ
 * 4. businessHours: 最低1つの営業時間、営業時間ごとに個別のバリデーション
 */
export const storeFormSchema = z.object({
  // 店舗名の検証
  name: z
    .string()
    .min(1, { message: STORE_VALIDATION.NAME.REQUIRED })
    .max(50, { message: STORE_VALIDATION.NAME.MAX_LENGTH })
    .regex(/^[a-zA-Z0-9ぁ-んァ-ンー一-龯々〆ヵヶ\s　・]+$/, {
      message: STORE_VALIDATION.NAME.PATTERN,
    })
    .transform((str) => str.trim()),
  // 店舗説明の検証
  description: z
    .string()
    .max(500, { message: STORE_VALIDATION.DESCRIPTION.MAX_LENGTH }) // 最大500文字
    .optional(), // 任意項目
  // カテゴリーの検証
  categories: z
    .array(z.enum(validCategoryIds as [StoreCategory, ...StoreCategory[]])) // 有効なカテゴリーのみ
    .min(1, { message: STORE_VALIDATION.CATEGORIES.REQUIRED }) // 最低1つ
    .max(5, { message: STORE_VALIDATION.CATEGORIES.MAX_LENGTH }), // 最大5つ
  // 営業時間の検証
  businessHours: z
    .array(businessHourSchema) // 営業時間ごとに個別のバリデーション
    .min(1, { message: STORE_VALIDATION.BUSINESS_HOURS.REQUIRED }), // 最低1つ
});

/** 店舗フォームの型（Zodスキーマから自動生成） */
export type StoreFormSchema = z.infer<typeof storeFormSchema>;

/** 営業時間の型（Zodスキーマから自動生成） */
export type BusinessHourSchema = z.infer<typeof businessHourSchema>;

/**
 * フォームデータのバリデーション関数
 * @param data バリデーション対象のデータ
 * @returns バリデーション結果（成功時はデータ、失敗時はエラー情報を含む）
 */
export const validateStoreForm = (data: unknown) => {
  return storeFormSchema.safeParse(data);
};
