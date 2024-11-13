import React, { useEffect } from 'react'
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
import { useAppDispatch, useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import { selectorSelectedImages } from '@/features/userHub/model/createSlice/createSelectors'
import { useModalAddPhoto } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/useModalAddPhoto'
import { deleteImages } from '@/features/userHub/model/createSlice'
import { ConfirmationModal } from '@/common/components/ConfirmationModal'
import { loadSavedImages } from '@/features/userHub/ui/create/lib/loadSavedImages'
import { Filters } from '@/features/userHub/ui/create/filters/Filters'

type Props = ModalProps & {
  className?: string
}
export const Create = ({ className, open, onOpenChange, ...props }: Props) => {
  const images = useAppSelector(selectorSelectedImages)
  const image = images.length
  const dispatch = useAppDispatch()
  const filter = true
  const { reset } = useModalAddPhoto({
    deleteActionForImages: deleteImages,
  })
  useEffect(() => {
    loadSavedImages(dispatch) //получаем фото из хранилища indexDB
  }, [])

  return (
    <Modal {...props} open={open} onOpenChange={onOpenChange}>
      <ModalContent
        className={cn('flex flex-col max-w-[492px] h-[564px]', filter && 'max-w-[972px] h-auto')}
      >
        {/*<ModalContent className={'flex flex-col max-w-[492px] h-[564px]'}>*/}
        <ModalTitle className={cn('flex', image && 'justify-center')} asChild>
          <Typography variant={TypographyVariant.h1} asChild>
            <h2>{image ? 'Cropping' : 'Add Photo'}</h2>
          </Typography>
        </ModalTitle>
        {image ? (
          <>
            {/*BUTTON BACK*/}
            <ConfirmationModal
              className={
                'absolute top-[16px] left-3.5 p-0 w-[30px] h-[30px] rounded-none bg-transparent'
              }
              iconId={'ArrowIosBack'}
              description={
                'Do you really want to close the creation of a publication? If you close everything will be deleted'
              }
              confirmation={reset}
            />

            <Button className={'absolute top-[11px] right-1'} variant={'text'}>
              <Typography variant={TypographyVariant.h3}>Next</Typography>
            </Button>
          </>
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
          {image ? <Filters /> : <AddPhoto />}
          {/*{image ? <Cropping /> : <AddPhoto />}*/}
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}
