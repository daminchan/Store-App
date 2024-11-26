import { type FC, type ReactNode } from "react";

type FlexContainerProps = {
  children: ReactNode;
  direction?: "row" | "column";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between" | "around";
  gap?: number;
  className?: string;
};

export const FlexContainer: FC<FlexContainerProps> = ({
  children,
  direction = "row",
  align = "start",
  justify = "start",
  gap = 0,
  className = "",
}) => {
  // alignItemsとjustifyContentのマッピング
  const alignItems = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
    stretch: "items-stretch",
  };

  const justifyContent = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
  };

  return (
    <div
      className={`
        flex
        ${direction === "column" ? "flex-col" : "flex-row"}
        ${alignItems[align]}
        ${justifyContent[justify]}
        gap-${gap}
        ${className}
      `}
    >
      {children}
    </div>
  );
};
