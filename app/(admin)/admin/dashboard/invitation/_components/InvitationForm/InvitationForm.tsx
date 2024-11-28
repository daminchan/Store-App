"use client";

import { type FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Flex } from "@/components/layout/Flex/Flex";
import { useInvitationForm } from "./hooks/useInvitationForm";

/**
 * 招待コード生成フォームコンポーネント
 * @description 招待コードの生成と有効期限の設定を行うフォーム
 */
export const InvitationForm: FC = () => {
  const { validDays, isLoading, handleSubmit, handleValidDaysChange } =
    useInvitationForm();

  return (
    <Card>
      <CardHeader>
        <CardTitle>招待コード生成</CardTitle>
        <CardDescription>
          新しい店舗オーナーを招待するための招待コードを生成します
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-label="招待コード生成フォーム"
        >
          <Flex direction="column" gap="2">
            <Label htmlFor="validDays" className="font-medium">
              有効期限（日数）
            </Label>
            <Input
              id="validDays"
              name="validDays"
              type="number"
              min={1}
              max={365}
              value={validDays}
              onChange={handleValidDaysChange}
              className="w-full"
              disabled={isLoading}
              aria-describedby="validDays-description"
              required
            />
            <p
              id="validDays-description"
              className="text-sm text-muted-foreground"
            >
              1日から365日の間で設定してください
            </p>
          </Flex>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <Flex align="center" gap="2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                生成中...
              </Flex>
            ) : (
              "招待コードを生成"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
