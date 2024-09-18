import React from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalDescription,
  ModalTitle,
  Typography,
  TypographyVariant,
} from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'
import { H1Title } from '@/common/components/H1Title/H1Title'
import { DialogProps } from '@radix-ui/react-dialog'

export const EmailSent = ({ children, ...props }: DialogProps) => {
  return (
    <Modal {...props}>
      <ModalContent>
        <ModalTitle>
          <H1Title>Email sent</H1Title>
        </ModalTitle>
        <ModalDescription>
          <Typography>
            We have sent a link to confirm your email to {children ?? '@mail'}
          </Typography>
          <Button className={cn('!flex !ml-auto')}>
            <Typography variant={TypographyVariant.h3}>OK</Typography>
          </Button>
        </ModalDescription>
      </ModalContent>
    </Modal>
  )
}
