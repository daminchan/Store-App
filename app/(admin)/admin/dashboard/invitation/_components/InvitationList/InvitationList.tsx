"use client";

import { type FC } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useInvitationList } from "./hooks/useInvitationList";
import { InvitationListItem } from "./InvitationListItem";
import { InvitationListSkeleton } from "./components";

/**
 * 招待コード一覧コンポーネント
 * @description 招待コードの一覧を表示し、無効化・削除の操作を提供する
 */
export const InvitationList: FC = () => {
  const { invitationCodes, isLoading, handleDisable, handleDelete } =
    useInvitationList();

  if (isLoading) {
    return <InvitationListSkeleton />;
  }

  return (
    <div className="rounded-lg border">
      <div className="p-4">
        <h2 className="text-xl font-semibold">招待コード一覧</h2>
      </div>
      <div className="border-t">
        <Table aria-label="招待コード一覧">
          <TableHeader>
            <TableRow>
              <TableHead scope="col">コード</TableHead>
              <TableHead scope="col">状態</TableHead>
              <TableHead scope="col">使用者</TableHead>
              <TableHead scope="col">使用日時</TableHead>
              <TableHead scope="col">有効期限</TableHead>
              <TableHead scope="col">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitationCodes.map((code) => (
              <InvitationListItem
                key={code.id}
                code={code}
                onDisable={handleDisable}
                onDelete={handleDelete}
              />
            ))}
            {invitationCodes.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-4"
                  aria-label="データなし"
                >
                  招待コードがありません
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
