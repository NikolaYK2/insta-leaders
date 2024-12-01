import React from 'react'
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
} from '@nikolajk2/lib-insta-leaders'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

export const DeletePost = (Props: Props) => {
  const { isOpen, setIsOpen } = Props
  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <ModalContent className={'max-w-96'}>
        <ModalTitle className={'flex justify-between'}>
          <Typography variant={TypographyVariant.h1}> Delete Post</Typography>
          <ModalClose asChild className={'cursor-pointer'}>
            <DynamicIcon iconId={'Close'} width={24} height={24} />
          </ModalClose>
        </ModalTitle>
        <ModalContentItem className={'pb-9'}>
          <ModalDescription className={'my-8'} asChild>
            <Typography variant={TypographyVariant.regular_text_16}>
              Are you sure you want to delete this post?
            </Typography>
          </ModalDescription>
          <div className={'text-right'}>
            <Button variant={'outline'} className={'mr-6'} onClick={() => alert('click')}>
              Yes
            </Button>
            <ModalClose asChild className={'bg-accent-500'}>
              <Button variant={'primary'}>No</Button>
            </ModalClose>
          </div>
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}
