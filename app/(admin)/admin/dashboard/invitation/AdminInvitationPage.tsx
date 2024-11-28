"use client";

import { type FC } from "react";
import { InvitationList, InvitationForm } from "./_components";

/**
 * 招待コード管理画面
 * @description 招待コードの生成、一覧表示、無効化、削除を行う管理画面
 */
export const AdminInvitationPage: FC = () => {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">招待コード管理</h1>
      <div className="grid gap-6">
        <InvitationForm />
        <InvitationList />
      </div>
    </div>
  );
};
