import React from "react";
import {
  Button,
  DynamicIcon,
  Modal,
  ModalClose,
  ModalContent,
  ModalContentItem,
  ModalDescription,
  ModalTitle,
  Typography,
  TypographyVariant,
} from "@nikolajk2/lib-insta-leaders";

import { cn } from "@/common/utils/cn";
import { DialogProps } from "@radix-ui/react-dialog";

type EmailSentProps = DialogProps & {
  className?: string;
  callback?: () => void;
};
export const EmailSent = ({
  children,
  className = "",
  callback,
  ...props
}: EmailSentProps) => {
  const handlerClick = () => {
    callback?.() && callback();
  };
  return (
    <Modal {...props}>
      <ModalContent className={cn("max-w-[378px]", className)}>
        <ModalTitle className={"flex justify-between"}>
          <Typography variant={TypographyVariant.h1}>Email sent</Typography>
          <ModalClose asChild>
            <DynamicIcon iconId={"Close"} width={28} height={28} />
          </ModalClose>
        </ModalTitle>
        <ModalContentItem>
          <ModalDescription asChild>
            <Typography variant={TypographyVariant.regular_text_16}>
              We have sent a link to confirm your email to {children ?? "@mail"}
            </Typography>
          </ModalDescription>
          <ModalClose className={cn("flex !ml-auto")} asChild>
            <Button
              variant={"primary"}
              className={"bg-accent-500 mt-[18px] w-[96px]"}
              onClick={handlerClick}
            >
              <Typography variant={TypographyVariant.h3}>OK</Typography>
            </Button>
          </ModalClose>
        </ModalContentItem>
      </ModalContent>
    </Modal>
  );
};
