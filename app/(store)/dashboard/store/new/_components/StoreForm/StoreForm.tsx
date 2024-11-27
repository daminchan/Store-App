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
import { Flex } from "@/components/layout";
import { useStoreFormStore } from "@/stores/store";
import { useStoreValidation } from "../../_hooks/useStoreValidation";
import { useNotification } from "@/hooks/common";
import { STORE_MESSAGES } from "@/constants/store";
import {
  NameSection,
  DescriptionSection,
  CategoriesSection,
  BusinessHoursSection,
} from "./sections";
import { CheckCircle2, AlertCircle, Info, Store } from "lucide-react";

/**
 * 店舗情報登録フォームコンポーネント
 * @description 店舗の基本情報、カテゴリ、営業時間を設定するフォーム
 */
export const StoreForm: FC = () => {
  const { reset } = useStoreFormStore();
  const { validateForm } = useStoreValidation();
  const { showNotification } = useNotification();

  /**
   * フォームの送信を処理する関数
   * バリデーションを行い、エラーがなければデータを送信する
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      showNotification(
        <Flex align="center" gap="2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span>入力内容に誤りがあります。</span>
        </Flex>,
        { type: "error" }
      );
      return;
    }

    try {
      // TODO: APIエンドポイントへのデータ送信処理
      console.log("TODO: Send data to API");
      showNotification(
        <Flex align="center" gap="2">
          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          <span>{STORE_MESSAGES.SUCCESS.CREATE}</span>
        </Flex>,
        { type: "success" }
      );
    } catch (error) {
      console.error("Failed to submit form:", error);
      showNotification(
        <Flex align="center" gap="2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <span>{STORE_MESSAGES.ERROR.CREATE}</span>
        </Flex>,
        { type: "error" }
      );
    }
  };

  /**
   * フォームのリセット処理
   */
  const handleReset = () => {
    reset();
    showNotification(
      <Flex align="center" gap="2">
        <Info className="h-5 w-5 text-blue-500" />
        <span>フォームをリセットしました</span>
      </Flex>,
      { type: "info" }
    );
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
        >
          リセット
        </Button>
        <Button type="submit" form="store-form" className="px-6">
          登録する
        </Button>
      </CardFooter>
    </Card>
  );
};
