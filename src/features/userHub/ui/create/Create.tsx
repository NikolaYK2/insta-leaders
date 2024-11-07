import React, { useEffect, useState } from 'react'
import {
  Button,
  DynamicIcon,
  Modal,
  ModalClose,
  ModalContent,
  ModalContentItem,
  ModalDescription,
  ModalProps,
  ModalTitle,
  Typography,
  TypographyVariant,
  VisibilityToggle,
} from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'
import { Cropping } from '@/features/userHub/ui/create/cropping/Cropping'
import { AddPhoto } from '@/features/userHub/ui/create/addPhoto'
import { useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import { selectedImagesSelector } from '@/features/userHub/model/createSlice/createSelectors'
import { useModalAddPhoto } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/useModalAddPhoto'
import { ConfirmationModal } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/ConfirmationModal'

type Props = ModalProps & {
  className?: string
}
export const Create = ({ className, open, onOpenChange, ...props }: Props) => {
  const images = useAppSelector(selectedImagesSelector)
  const image = images.length
  const { reset } = useModalAddPhoto({})

  return (
    <Modal {...props} open={open} onOpenChange={onOpenChange}>
      <ModalContent className={'flex flex-col max-w-[492px] h-[564px]'}>
        <ModalTitle className={cn('flex', image && 'justify-center')} asChild>
          <Typography variant={TypographyVariant.h1} asChild>
            <h2>{image ? 'Cropping' : 'Add Photo'}</h2>
          </Typography>
        </ModalTitle>

        {image ? (
          <div>
            {/*BUTTON BACK*/}
            <Button className="absolute top-[16px] left-3.5 p-0" variant={'secondary'}>
              <ConfirmationModal
                className={'relative block inset-0 w-[30px] bg-transparent h-full rounded-none'}
                iconId={'ArrowIosBack'}
                confirmation={reset}
              />
            </Button>

            <Button className={'absolute top-[11px] right-1'} variant={'text'}>
              <Typography variant={TypographyVariant.h3}>Next</Typography>
            </Button>
          </div>
        ) : (
          <ModalClose
            className={'absolute top-[18px] right-4'}
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <DynamicIcon iconId={'Close'} width={28} height={28} />
          </ModalClose>
        )}

        <VisibilityToggle>
          <ModalDescription>image post</ModalDescription>
        </VisibilityToggle>

        <ModalContentItem
          className={cn('relative flex flex-col pt-[0px] pb-12 h-full z-50', image && 'p-3')}
        >
          {image ? <Cropping /> : <AddPhoto />}
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}
