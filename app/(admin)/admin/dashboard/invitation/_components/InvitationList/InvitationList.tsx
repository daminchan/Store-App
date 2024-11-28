"use client";

import { type FC } from "react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNotification } from "@/hooks/common";
import {
  listInvitationCodes,
  disableInvitationCode,
  deleteInvitationCode,
} from "../../_actions";
import type { InvitationCode } from "@prisma/client";
import { Ban, Trash2 } from "lucide-react";

export const InvitationList: FC = () => {
  const [invitationCodes, setInvitationCodes] = useState<InvitationCode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { showNotification } = useNotification();

  const fetchInvitationCodes = async () => {
    try {
      const result = await listInvitationCodes();

      if ("success" in result) {
        setInvitationCodes(result.data);
      } else {
        showNotification({
          title: "エラー",
          description: result.message,
          type: "error",
        });
      }
    } catch (error) {
      showNotification({
        title: "エラー",
        description: "招待コードの取得に失敗しました",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchInvitationCodes();
  }, []);

  /**
   * 招待コードの状態を表すバッジを返す
   */
  const getStatusBadge = (code: InvitationCode) => {
    if (code.isDisabled) {
      return <Badge variant="destructive">無効</Badge>;
    }
    if (code.isUsed) {
      return <Badge variant="secondary">使用済み</Badge>;
    }
    if (code.expiresAt < new Date()) {
      return <Badge variant="outline">期限切れ</Badge>;
    }
    return <Badge variant="default">有効</Badge>;
  };

  /**
   * 招待コードを無効化する
   */
  const handleDisable = async (codeId: string) => {
    try {
      const result = await disableInvitationCode(codeId);

      if ("success" in result) {
        showNotification({
          title: "成功",
          description: "招待コードを無効化しました",
          type: "success",
        });
        // 一覧を再取得
        void fetchInvitationCodes();
      } else {
        showNotification({
          title: "エラー",
          description: result.message,
          type: "error",
        });
      }
    } catch (error) {
      showNotification({
        title: "エラー",
        description: "招待コードの無効化に失敗しました",
        type: "error",
      });
    }
  };

  /**
   * 招待コードを削除する
   */
  const handleDelete = async (codeId: string) => {
    try {
      const result = await deleteInvitationCode(codeId);

      if ("success" in result) {
        showNotification({
          title: "成功",
          description: "招待コードを削除しました",
          type: "success",
        });
        // 一覧を再取得
        void fetchInvitationCodes();
      } else {
        showNotification({
          title: "エラー",
          description: result.message,
          type: "error",
        });
      }
    } catch (error) {
      showNotification({
        title: "エラー",
        description: "招待コードの削除に失敗しました",
        type: "error",
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-lg border">
      <div className="p-4">
        <h2 className="text-xl font-semibold">招待コード一覧</h2>
      </div>
      <div className="border-t">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>コード</TableHead>
              <TableHead>状態</TableHead>
              <TableHead>使用者</TableHead>
              <TableHead>使用日時</TableHead>
              <TableHead>有効期限</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invitationCodes.map((code) => (
              <TableRow key={code.id}>
                <TableCell className="font-mono">{code.code}</TableCell>
                <TableCell>{getStatusBadge(code)}</TableCell>
                <TableCell>{code.usedBy || "-"}</TableCell>
                <TableCell>
                  {code.usedAt
                    ? format(new Date(code.usedAt), "yyyy/MM/dd HH:mm")
                    : "-"}
                </TableCell>
                <TableCell>
                  {format(new Date(code.expiresAt), "yyyy/MM/dd HH:mm")}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      disabled={code.isDisabled || code.isUsed}
                      onClick={() => handleDisable(code.id)}
                    >
                      <Ban className="h-4 w-4" />
                      <span className="sr-only">無効化</span>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      disabled={code.isUsed}
                      onClick={() => handleDelete(code.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">削除</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {invitationCodes.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-4">
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
