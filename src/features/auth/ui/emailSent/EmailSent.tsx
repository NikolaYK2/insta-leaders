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

type EmailSentProps = {
  email: string
}
export const EmailSent = ({ email }: EmailSentProps) => {
  return (
    <dialog>
      <Modal open>
        <ModalContent>
          <ModalTitle>
            <H1Title>Email sent</H1Title>
          </ModalTitle>
          <ModalDescription>
            <Typography>We have sent a link to confirm your email to {email ?? '@mail'}</Typography>
            <Button className={cn('!flex !ml-auto')}>
              <Typography variant={TypographyVariant.h3}>OK</Typography>
            </Button>
          </ModalDescription>
        </ModalContent>
      </Modal>
    </dialog>
  )
}
