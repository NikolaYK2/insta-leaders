import React from "react";
import { HeadersMeta } from "@/common/components";
import { cn } from "@/common/utils/cn";

type PageProps = {
  titleMeta: string;
  descriptionMeta?: string;
  className?: string;
  children: React.ReactNode;
};
export const Page = ({
  titleMeta,
  descriptionMeta,
  className,
  children,
}: PageProps) => {
  return (
    <section className={cn("flex flex-col pt-[36px] w-full", className)}>
      <HeadersMeta title={titleMeta} description={descriptionMeta} />
      {children}
    </section>
  );
};
