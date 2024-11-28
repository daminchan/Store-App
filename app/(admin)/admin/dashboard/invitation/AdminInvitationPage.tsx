"use client";

import { type FC } from "react";
import { Flex } from "@/components/layout/Flex/Flex";
import { InvitationList, InvitationForm } from "./_components";

/**
 * 招待コード管理画面
 * @description 招待コードの生成、一覧表示、無効化、削除を行う管理画面
 */
export const AdminInvitationPage: FC = () => {
  return (
    <Flex direction="column" gap="6" className="p-6">
      <h1 className="text-3xl font-bold tracking-tight">招待コード管理</h1>
      <Flex direction="column" gap="6">
        <InvitationForm />
        <InvitationList />
      </Flex>
    </Flex>
  );
};
