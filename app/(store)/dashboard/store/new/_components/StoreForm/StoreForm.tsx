"use client";

import { type FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useNotification } from "@/hooks/common";
import { useStoreFormStore } from "@/stores/store";
import { useStoreValidation } from "../../_hooks/useStoreValidation";
import { createStore } from "../../_actions/createStore";
import { STORE_MESSAGES } from "@/constants/store";
import type { StoreCategory } from "@/constants/store/categories";
import { Flex } from "@/components/layout/Flex";
import { Store } from "lucide-react";
import {
  NameSection,
  DescriptionSection,
  CategoriesSection,
  BusinessHoursSection,
} from "./sections";

export const StoreForm: FC = () => {
  const router = useRouter();
  const { name, description, categories, businessHours, reset } =
    useStoreFormStore();
  const { validateForm } = useStoreValidation();
  const { showNotification } = useNotification();
  const [isPending, startTransition] = useTransition();

  /**
   * フォームデータを作成する関数
   */
  const createFormData = () => ({
    name,
    description,
    categories: categories as StoreCategory[],
    businessHours,
  });

  /**
   * フォームの送信を処理する関数
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification({
        title: "エラー",
        description: "入力内容に誤りがあります。",
        type: "error",
      });
      return;
    }

    startTransition(async () => {
      try {
        const formData = createFormData();
        const result = await createStore(formData);

        if ("success" in result) {
          showNotification({
            title: "成功",
            description: STORE_MESSAGES.SUCCESS.CREATE,
            type: "success",
          });
          // 成功時は店舗詳細ページにリダイレクト
          router.push(`/dashboard/store/${result.storeId}`);
        } else {
          showNotification({
            title: "エラー",
            description: result.message,
            type: "error",
          });
        }
      } catch (error) {
        console.error("Failed to submit form:", error);
        showNotification({
          title: "エラー",
          description: STORE_MESSAGES.ERROR.CREATE,
          type: "error",
        });
      }
    });
  };

  /**
   * フォームのリセット処理
   */
  const handleReset = () => {
    reset();
    showNotification({
      title: "お知らせ",
      description: "フォームをリセットしました",
      type: "info",
    });
  };

  return (
    <Card className="max-w-4xl mx-auto shadow-lg">
      <CardHeader className="space-y-2 pb-6">
        <Flex align="center" gap="2">
          <Store className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl">店舗情報の登録</CardTitle>
        </Flex>
        <CardDescription className="text-base">
          店舗の基本情報、カテゴリ、営業時間を設定してください。
          すべての必須項目（<span className="text-red-500">*</span>
          ）を入力する必要があります。
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="store-form" onSubmit={handleSubmit}>
          <Flex direction="column" gap="6">
            <NameSection />
            <DescriptionSection />
            <CategoriesSection />
            <BusinessHoursSection />
          </Flex>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end space-x-4 bg-muted/50 p-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          className="px-6"
          disabled={isPending}
        >
          リセット
        </Button>
        <Button
          type="submit"
          form="store-form"
          className="px-6"
          disabled={isPending}
        >
          {isPending ? "登録中..." : "登録する"}
        </Button>
      </CardFooter>
    </Card>
  );
};
