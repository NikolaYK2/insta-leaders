import React from "react";
import {
  Button,
  DynamicIcon,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";
import { cn } from "@/common/utils/cn";
import { useRouter } from "next/router";

export type GoBackProps = {
  backToTitle?: string;
  backToRedirect?: string;
  className?: string;
};
export const GoBack = ({
  backToRedirect,
  backToTitle,
  className,
}: GoBackProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    backToRedirect ? router.push(backToRedirect) : router.back();
  };

  return (
    <Button
      variant={"text"}
      className={cn("p-0 text-light-100", className)}
      onClick={handleGoBack}
    >
      <DynamicIcon iconId={"ArrowBackOutline"} width={24} height={24} />
      <Typography variant={TypographyVariant.regular_text_14}>
        Back to <span className={"capitalize"}>{backToTitle}</span>
      </Typography>
    </Button>
  );
};
