import { type Metadata } from "next";
import { AdminInvitationPage } from "./AdminInvitationPage";

export const metadata: Metadata = {
  title: "招待コード管理",
  description: "招待コードの管理を行います",
};

/**
 * 招待コード管理ページ
 * @description Server ComponentとしてMetadataを設定し、Client Componentをラップする
 */
export default function Page() {
  return <AdminInvitationPage />;
}
