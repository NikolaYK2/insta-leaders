import React, { ComponentPropsWithoutRef } from "react";

type CreatePrimitiveProps = ComponentPropsWithoutRef<"div">;
export const CreatePrimitiveRoot = ({
  children,
  ...props
}: CreatePrimitiveProps) => {
  return (
    <div className="flex" {...props}>
      {children}
    </div>
  );
};

export const CreatePrimitiveContent = ({
  children,
  ...props
}: CreatePrimitiveProps) => {
  return (
    <div
      className="relative flex flex-[0_0_50%] max-w-[490px] max-h-[503px]"
      {...props}
    >
      {children}
    </div>
  );
};
