// src/app/(auth)/role-select/_components/RoleCard/RoleCard.tsx

import { type FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { type RoleCardProps } from "../../_types";
import { ArrowRight, Store, User } from "lucide-react";
import { Flex } from "@/components/layout";

/**
 * 役割選択カードコンポーネント
 * リッチなビジュアルとインタラクションを提供するカードUI
 */
export const RoleCard: FC<RoleCardProps> = ({
  title,
  description,
  onSelect,
  isDisabled,
  role,
}) => {
  const Icon = role === "store_owner" ? Store : User;

  return (
    <Card
      onClick={!isDisabled ? onSelect : undefined}
      className={cn(
        "group relative overflow-hidden border-2",
        "transition-all duration-300 ease-in-out",
        "hover:border-primary/50 hover:shadow-lg",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isDisabled && "opacity-50 cursor-not-allowed",
        !isDisabled && "cursor-pointer"
      )}
      role="radio"
      aria-checked="false"
    >
      <div className="absolute right-4 top-4">
        <Badge
          variant={role === "store_owner" ? "default" : "secondary"}
          className="font-medium"
        >
          {role === "store_owner" ? "ビジネス" : "個人"}
        </Badge>
      </div>
      <CardContent className="pt-8 pb-6">
        <Flex direction="column" gap="4">
          <Flex direction="row" gap="3" align="center">
            <div
              className={cn(
                "p-2 rounded-full",
                "bg-primary/10 text-primary",
                "group-hover:bg-primary group-hover:text-white",
                "transition-colors duration-300"
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          </Flex>

          <p className="text-sm text-muted-foreground pl-[52px]">
            {description}
          </p>

          <Flex
            direction="row"
            align="center"
            className={cn(
              "pl-[52px] text-sm font-medium",
              "text-primary/80 group-hover:text-primary",
              "transition-colors duration-300"
            )}
          >
            選択する
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Flex>
        </Flex>
      </CardContent>

      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "bg-gradient-to-r from-primary/5 to-transparent opacity-0",
          "group-hover:opacity-100 transition-opacity duration-300"
        )}
      />
    </Card>
  );
};
