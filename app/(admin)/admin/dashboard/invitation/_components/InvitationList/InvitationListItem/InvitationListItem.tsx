"use client";

import { type FC } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Ban, Trash2 } from "lucide-react";
import type { InvitationCode } from "@prisma/client";

type Props = {
  code: InvitationCode;
  onDisable: (codeId: string) => Promise<void>;
  onDelete: (codeId: string) => Promise<void>;
};

/**
 * 招待コードリストアイテムコンポーネント
 * @description 招待コードの詳細情報と操作ボタンを表示する
 */
export const InvitationListItem: FC<Props> = ({
  code,
  onDisable,
  onDelete,
}) => {
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

  return (
    <TableRow>
      <TableCell className="font-mono" role="cell" aria-label="招待コード">
        {code.code}
      </TableCell>
      <TableCell role="cell" aria-label="状態">
        {getStatusBadge(code)}
      </TableCell>
      <TableCell role="cell" aria-label="使用者">
        {code.usedBy || "-"}
      </TableCell>
      <TableCell role="cell" aria-label="使用日時">
        {code.usedAt ? format(new Date(code.usedAt), "yyyy/MM/dd HH:mm") : "-"}
      </TableCell>
      <TableCell role="cell" aria-label="有効期限">
        {format(new Date(code.expiresAt), "yyyy/MM/dd HH:mm")}
      </TableCell>
      <TableCell role="cell">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={code.isDisabled || code.isUsed}
            onClick={() => onDisable(code.id)}
            aria-label={`招待コード ${code.code} を無効化`}
          >
            <Ban className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            disabled={code.isUsed}
            onClick={() => onDelete(code.id)}
            aria-label={`招待コード ${code.code} を削除`}
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
