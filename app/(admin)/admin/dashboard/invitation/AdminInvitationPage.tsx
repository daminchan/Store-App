"use client";
import { InvitationList, InvitationForm } from "./_components";

export function AdminInvitationPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">招待コード管理</h1>
      <div className="grid gap-6">
        <InvitationForm />
        <InvitationList />
      </div>
    </div>
  );
}
