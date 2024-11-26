// src/app/(auth)/role-select/_components/RoleCard/RoleCard.tsx

import { type FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { type RoleCardProps } from "../../_types";
import { Flex } from "@/components/layout";
import { ChevronRightIcon } from "lucide-react";

/**
 * 役割選択カードコンポーネント
 * 選択可能な役割を表示するカードUIを提供
 * @remarks shadcn/uiのCardコンポーネントをベースにした選択可能なカードUI
 */
export const RoleCard: FC<RoleCardProps> = ({
  title,
  description,
  onSelect,
  isDisabled,
}) => {
  return (
    <Card
      className={cn(
        "transition-all duration-200 hover:border-primary/50",
        "cursor-pointer relative overflow-hidden",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={!isDisabled ? onSelect : undefined}
      role="radio"
      aria-checked="false"
    >
      <CardHeader>
        <Flex direction="row" justify="between" align="center">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            disabled={isDisabled}
            className="rounded-full"
            aria-label={`${title}を選択`}
          >
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </Flex>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};
