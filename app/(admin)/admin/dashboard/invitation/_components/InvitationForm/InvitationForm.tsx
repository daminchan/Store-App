"use client";

import { type FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvitationForm } from "./hooks/useInvitationForm";

/**
 * 招待コード生成フォームコンポーネント
 * @description 招待コードの生成と有効期限の設定を行うフォーム
 */
export const InvitationForm: FC = () => {
  const { validDays, isLoading, handleSubmit, handleValidDaysChange } =
    useInvitationForm();

  return (
    <div className="rounded-lg border">
      <div className="p-4">
        <h2 className="text-xl font-semibold">招待コード生成</h2>
      </div>
      <div className="border-t p-4">
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-label="招待コード生成フォーム"
        >
          <div className="space-y-2">
            <Label htmlFor="validDays" className="block">
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
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            aria-busy={isLoading}
          >
            {isLoading ? "生成中..." : "招待コードを生成"}
          </Button>
        </form>
      </div>
    </div>
  );
};
