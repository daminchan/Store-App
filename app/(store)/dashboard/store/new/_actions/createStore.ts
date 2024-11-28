"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { type StoreFormSchema } from "../_components/StoreForm/_schemas/validation";
import { STORE_MESSAGES } from "@/constants/store/messages";
import { type StoreCategory } from "@prisma/client";

/**
 * エラーメッセージの型定義
 */
export type CreateStoreError = {
  message: string;
  errors?: Record<string, string>;
};

/**
 * カテゴリーの文字列を列挙型に変換
 */
const convertToStoreCategory = (category: string): StoreCategory => {
  return category.toUpperCase() as StoreCategory;
};

/**
 * 店舗を作成するServer Action
 * @description 店舗データと営業時間をトランザクションで保存
 */
export async function createStore({
  name,
  description,
  categories,
  businessHours,
}: StoreFormSchema): Promise<
  { success: true; storeId: string } | CreateStoreError
> {
  try {
    // 認証チェック
    const { userId } = await auth();
    if (!userId) {
      const { AUTHENTICATION_REQUIRED } = STORE_MESSAGES.ERROR;
      throw new Error(AUTHENTICATION_REQUIRED);
    }

    // トランザクションで店舗データと営業時間を保存
    const store = await db.$transaction(async (tx) => {
      const storeInput = {
        name,
        description: description ?? "",
        categories: categories.map(convertToStoreCategory),
        ownerId: userId,
        businessHours: {
          create: businessHours.map(
            ({ dayOfWeek, openTime, closeTime, isHoliday = false }) => ({
              dayOfWeek,
              openTime,
              closeTime,
              isHoliday,
            })
          ),
        },
      };
      return tx.store.create({ data: storeInput });
    });

    // キャッシュの更新
    revalidatePath("/dashboard/store");

    // 成功レスポンスを返す
    return {
      success: true,
      storeId: store.id,
    };
  } catch (error) {
    // エラーハンドリング
    const { CREATE: CREATE_ERROR, UNEXPECTED } = STORE_MESSAGES.ERROR;
    console.error("Failed to create store:", error);
    return {
      message: CREATE_ERROR,
      errors: {
        submit: UNEXPECTED,
      },
    };
  }
}
