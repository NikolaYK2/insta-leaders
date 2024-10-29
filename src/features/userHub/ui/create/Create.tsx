import React from 'react'
import { Modal, ModalContent, ModalTitle } from '@nikolajk2/lib-insta-leaders'
import { DialogProps } from '@radix-ui/react-dialog'

export const Create = ({ ...props }: DialogProps) => {
  return (
    <Modal {...props}>
      <ModalContent>
        <ModalTitle>Title</ModalTitle>
        123
      </ModalContent>
    </Modal>
  )
}
