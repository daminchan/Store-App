"use client";

import { type FC } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/hooks/common";
import { generateInvitationCode } from "../../_actions";
import type { GenerateInvitationError } from "../../_actions";

export const InvitationForm: FC = () => {
  const [validDays, setValidDays] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("招待コード生成開始 - 有効期限:", validDays, "日");

    try {
      const result = await generateInvitationCode(validDays);
      console.log("生成結果:", result);

      if ("success" in result) {
        const { code, expiresAt } = result.data;
        console.log("生成成功:", {
          code,
          expiresAt,
          validDays,
        });

        showNotification({
          title: "成功",
          description: `招待コード: ${code}を生成しました`,
          type: "success",
        });
      } else {
        const error = result as GenerateInvitationError;
        console.error("生成エラー:", error);
        showNotification({
          title: "エラー",
          description: error.message,
          type: "error",
        });
      }
    } catch (error) {
      console.error("予期せぬエラー:", error);
      showNotification({
        title: "エラー",
        description: "予期せぬエラーが発生しました",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border">
      <div className="p-4">
        <h2 className="text-xl font-semibold">招待コード生成</h2>
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="validDays">有効期限（日数）</Label>
            <Input
              id="validDays"
              type="number"
              min={1}
              max={365}
              value={validDays}
              onChange={(e) => setValidDays(Number(e.target.value))}
              className="w-full"
              disabled={isLoading}
            />
            <p className="text-sm text-muted-foreground">
              1日から365日の間で設定してください
            </p>
          </div>
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "生成中..." : "招待コードを生成"}
          </Button>
        </form>
      </div>
    </div>
  );
};
