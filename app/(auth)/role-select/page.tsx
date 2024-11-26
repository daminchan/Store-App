// src/app/(auth)/role-select/page.tsx

import { type Metadata } from "next";
import { RoleSelectPage } from "./RoleSelectPage";

export const metadata: Metadata = {
  title: "アカウントの種類を選択 | 予約管理システム",
  description: "店舗オーナーまたはお客様としてアカウントを設定します",
};

export default function Page() {
  return <RoleSelectPage />;
}
