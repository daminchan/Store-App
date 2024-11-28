"use client";

import { type FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const InvitationListSkeleton: FC = () => {
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
            {[...Array(3)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
