import React, { ChangeEvent, forwardRef } from 'react'
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
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'
import { cn } from '@/common/utils/cn'
import { Cropping } from '@/features/userHub/ui/create/cropping/Cropping'
import { useModalAddPhoto } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/Images'

type Props = ModalProps & {
  className?: string
}
export const Create = ({ className, ...props }: Props) => {
  const { handleFileChange, selectedImage, handleClick, fileInputRef, reset, error } =
    useModalAddPhoto({
      isOpen: true,
      setImage: () => {},
    })

  // const [image, setImage] = useState<string | null>(selectedImage)
  return (
    <Modal {...props}>
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
          <ModalClose className={'absolute top-[18px] right-4'}>
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
            <Cropping callBack={handleClick} selectedImage={selectedImage} />
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

type PropsAddPhoto = {
  handleFileChange?: (event: ChangeEvent<HTMLInputElement>) => void
  handleCLick: () => void
  image: string | null
  error: string | null
}
export const AddPhoto = forwardRef<HTMLInputElement, PropsAddPhoto>(
  ({ handleFileChange, handleCLick, image, error }, ref) => {
    return (
      <>
        <div className={'flex flex-col justify-between items-center h-full'}>
          <div
            className={cn(
              'flex justify-center items-center my-1.5 w-full h-[60px]',
              error && 'bg-danger-900 border-[1px] border-danger-500'
            )}
          >
            {error && error}
          </div>
          <PhotoPreview
            styleImage={'rounded-none w-[222px] h-[222px] mb-[60px]'}
            image={image}
            size={20}
          />
        </div>
        <div className={'flex flex-col mx-auto'}>
          <Button className={'mb-6'} onClick={handleCLick}>
            Select from Computer
            <input
              ref={ref}
              hidden
              accept={'image/*'}
              onChange={handleFileChange}
              type="file"
              onClick={e => e.stopPropagation()}
            />
          </Button>
          <Button variant={'outline'}>
            <Typography variant={TypographyVariant.h3}>Open Draft</Typography>
          </Button>
        </div>
      </>
    )
  }
)
AddPhoto.displayName = 'AddPhoto'
