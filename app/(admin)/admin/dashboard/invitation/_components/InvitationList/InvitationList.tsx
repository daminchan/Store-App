"use client";

import { type FC } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Flex } from "@/components/layout/Flex/Flex";
import { InvitationListItem } from "./InvitationListItem";
import { InvitationListSkeleton } from "./components";
import { useInvitationList } from "./hooks/useInvitationList";

/**
 * 招待コード一覧コンポーネント
 * @description 生成された招待コードの一覧を表示し、無効化や削除を行う
 */
export const InvitationList: FC = () => {
  const { invitationCodes, isLoading, handleDisable, handleDelete } =
    useInvitationList();

  return (
    <Card>
      <CardHeader>
        <CardTitle>招待コード一覧</CardTitle>
        <CardDescription>
          生成された招待コードの一覧です。使用済みまたは期限切れの招待コードは自動的に無効化されます
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <InvitationListSkeleton />
        ) : invitationCodes.length === 0 ? (
          <Flex
            direction="column"
            align="center"
            justify="center"
            className="min-h-[200px] rounded-lg border border-dashed"
          >
            <p className="text-lg font-medium text-muted-foreground">
              招待コードはまだ生成されていません
            </p>
            <p className="text-sm text-muted-foreground">
              上のフォームから新しい招待コードを生成してください
            </p>
          </Flex>
        ) : (
          <Flex direction="column" gap="4">
            {invitationCodes.map((code) => (
              <InvitationListItem
                key={code.id}
                code={code}
                onDisable={handleDisable}
                onDelete={handleDelete}
              />
            ))}
          </Flex>
        )}
      </CardContent>
    </Card>
  );
};
