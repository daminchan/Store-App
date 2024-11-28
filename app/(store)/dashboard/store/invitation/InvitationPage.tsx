"use client";

import { type FC } from "react";
import { StoreInvitationForm } from "./_components/InvitationForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Store } from "lucide-react";
import { Flex } from "@/components/layout";

export const InvitationPage: FC = () => {
  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto shadow-lg">
        <CardHeader className="space-y-2">
          <Flex align="center" gap="2">
            <Store className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl">店舗登録</CardTitle>
          </Flex>
          <CardDescription className="text-base">
            店舗を登録するには、招待コードが必要です。
            発行された招待コードを入力してください。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StoreInvitationForm />
        </CardContent>
      </Card>
    </div>
  );
};
