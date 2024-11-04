import React from 'react'
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
import { useModalAddPhoto } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/Images'
import { AddPhoto } from '@/features/userHub/ui/create/addPhoto'

type Props = ModalProps & {
  className?: string
}
export const Create = ({ className, open, onOpenChange, ...props }: Props) => {
  const {
    handleFileChange,
    selectedImage,
    selectedImages,
    setSelectedImages,
    handleClick,
    fileInputRef,
    reset,
    error,
  } = useModalAddPhoto({
    isOpen: true,
    setImage: () => {},
  })

  return (
    <Modal {...props} open={open} onOpenChange={onOpenChange}>
      <ModalContent className={'flex flex-col max-w-[492px] h-[564px]'}>
        <ModalTitle className={cn('flex', selectedImage && 'justify-center')} asChild>
          <Typography variant={TypographyVariant.h1} asChild>
            <h2>{selectedImage ? 'Cropping' : 'Add Photo'}</h2>
          </Typography>
        </ModalTitle>

        {selectedImage ? (
          <div>
            {/*кнопка назад*/}
            <Button
              className="absolute top-[16px] left-3.5 p-0"
              variant={'secondary'}
              onClick={reset}
            >
              <DynamicIcon iconId={'ArrowIosBack'} width={28} height={28} />
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
          className={cn(
            'relative flex flex-col pt-[0px] pb-12 h-full z-50',
            selectedImage && 'p-3'
          )}
        >
          {selectedImage ? (
            <Cropping
              callBack={handleClick}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
              ref={fileInputRef}
              handleFileChange={handleFileChange}
              error={error}
            />
          ) : (
            <AddPhoto
              handleFileChange={handleFileChange}
              handleCLick={handleClick}
              ref={fileInputRef}
              image={selectedImage}
              error={error}
            />
          )}
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}
