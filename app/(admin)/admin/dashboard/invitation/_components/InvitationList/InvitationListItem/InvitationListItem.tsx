"use client";

import { type FC } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import type { InvitationCode } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flex } from "@/components/layout/Flex/Flex";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type InvitationListItemProps = {
  code: InvitationCode;
  onDisable: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

/**
 * 招待コードの一覧アイテムコンポーネント
 * @description 招待コードの詳細情報と操作ボタンを表示
 */
export const InvitationListItem: FC<InvitationListItemProps> = ({
  code,
  onDisable,
  onDelete,
}) => {
  const isExpired = code.expiresAt < new Date();
  const canDisable = !code.isUsed && !code.isDisabled && !isExpired;
  const canDelete = !code.isUsed && !isExpired;

  return (
    <Card>
      <CardContent className="p-6">
        <Flex justify="between" align="center" wrap="wrap" gap="4">
          <Flex direction="column" gap="2">
            <Flex gap="2" align="center">
              <span className="text-lg font-semibold font-mono">
                {code.code}
              </span>
              <Flex gap="2">
                {code.isUsed && <Badge variant="default">使用済み</Badge>}
                {code.isDisabled && <Badge variant="secondary">無効</Badge>}
                {isExpired && <Badge variant="destructive">期限切れ</Badge>}
                {!code.isUsed && !code.isDisabled && !isExpired && (
                  <Badge className="bg-green-500 hover:bg-green-600">
                    有効
                  </Badge>
                )}
              </Flex>
            </Flex>
            <Flex gap="4" className="text-sm text-muted-foreground">
              <span>
                有効期限:{" "}
                {format(code.expiresAt, "yyyy年MM月dd日", { locale: ja })}
              </span>
              {code.isUsed && code.usedAt && (
                <span>
                  使用日時:{" "}
                  {format(code.usedAt, "yyyy年MM月dd日 HH:mm", { locale: ja })}
                </span>
              )}
            </Flex>
          </Flex>
          <Flex gap="2">
            {canDisable && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="secondary">無効化</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>招待コードを無効化</AlertDialogTitle>
                    <AlertDialogDescription>
                      この招待コードを無効化します。この操作は取り消せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction onClick={() => void onDisable(code.id)}>
                      無効化
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {canDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">削除</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>招待コードを削除</AlertDialogTitle>
                    <AlertDialogDescription>
                      この招待コードを削除します。この操作は取り消せません。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>キャンセル</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => void onDelete(code.id)}
                    >
                      削除
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  );
};
