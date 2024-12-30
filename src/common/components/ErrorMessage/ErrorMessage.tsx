import React, { ReactNode } from "react";
import { cn } from "@/common/utils/cn";

type Props = {
  children: ReactNode;
  className?: string;
};
export const ErrorMessage = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        "flex justify-center items-center my-1.5 w-full h-[60px] bg-danger-900 border-[1px] border-danger-500",
        className,
      )}
    >
      {children}
    </div>
  );
};
