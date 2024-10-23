import Image from 'next/image'
import {
  ModalTrigger,
  TypographyVariant,
  ModalTitle,
  ModalContentItem,
  Button,
  Modal,
  ModalClose,
  ModalContent,
  Typography,
  DynamicIcon,
  ModalDescription,
} from '@nikolajk2/lib-insta-leaders'
import { useModalAddPhoto } from './Images'
import { Alert } from '@/common/components/Alert'

type ModalAddPhotoProps = {
  isOpen: boolean
  setImage: (image: null | string) => void
}

export const ModalAddPhoto = ({ isOpen, setImage }: ModalAddPhotoProps) => {
  const { error, fileInputRef, handleClick, handleFileChange, handleSave, isSaved, selectedImage } =
    useModalAddPhoto({ isOpen, setImage })

  return (
    <Modal>
      <ModalTrigger asChild>
        <Button variant={'outline'}>
          <Typography variant={TypographyVariant.h3}>Add a Profile Photo</Typography>
        </Button>
      </ModalTrigger>
      <ModalContent className={'w-full max-w-[492px]'}>
        <ModalTitle className={'text-light-100'}>
          <Typography variant={TypographyVariant.h2}>Add a Profile Photo</Typography>
        </ModalTitle>
        <ModalContentItem className={'flex flex-col gap-6 items-center w-full p-6 pb-24'}>
          <div
            className={`w-full max-w-xs max-h-fit p-1.25 px-10.25 text-center invisible opacity-0 bg-danger-500 ${
              error ? 'visible opacity-100' : ''
            }`}
          >
            <Typography variant={TypographyVariant.bold_text_16}>Error!{error}</Typography>
          </div>

          <div>
            <PhotoPreview
              image={selectedImage}
              preview={'h-296 w-296 object-cover rounded-full'}
              size={228}
            />
            <input
              accept={'image/*'}
              hidden
              onChange={handleFileChange}
              ref={fileInputRef}
              type={'file'}
            />
          </div>

          {!selectedImage && !isSaved && (
            <Button variant={'primary'} onClick={handleClick}>
              <Typography variant={TypographyVariant.h3}> Select from Computer</Typography>
            </Button>
          )}
          {selectedImage && !error && !isSaved && (
            <ModalClose asChild>
              <Button variant={'primary'} onClick={handleSave}>
                <Typography variant={TypographyVariant.h3}> Save</Typography>
              </Button>
            </ModalClose>
          )}
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}

type PhotoPreviewProps = {
  image: null | string
  preview: string
  size: number
}

const PhotoPreview = ({ image, preview, size }: PhotoPreviewProps) => {
  return (
    <div
      className={
        'relative overflow-hidden flex items-center justify-center w-[228px] h-[228px] m-0 p-0 bg-dark-500 rounded-full'
      }
    >
      {image ? (
        <div className={'overflow-hidden flex items-center justify-center w-full h-full'}>
          <Image
            className={'w-full h-full object-cover object-center'}
            alt={'Uploaded'}
            height={size}
            src={image}
            width={size}
          />
        </div>
      ) : (
        <span className={'flex items-center justify-items-center'}>
          <DynamicIcon iconId="ImageOutline" height={48} width={48} />
        </span>
      )}
    </div>
  )
}

type ModalProps = {
  confirmation: () => void
}

export const ConfirmationModal = ({ confirmation }: ModalProps) => {
  return (
    <Modal>
      <ModalTrigger
        className={
          'cursor-pointer absolute top-[19px] right-2.5 flex items-center justify-center w-4 h-4 bg-danger-500 rounded-full hover:bg-danger-300"'
        }
      >
        <DynamicIcon iconId="CloseOutline" />
      </ModalTrigger>
      <ModalContent className={'w-full max-w-[492px]'}>
        <ModalTitle className={'text-light-100'}>
          <Typography variant={TypographyVariant.h2}>Delete Photo</Typography>
        </ModalTitle>

        <ModalContentItem className={'flex flex-col gap-6 items-center w-full p-6 pb-24'}>
          <ModalDescription>
            <Typography className={'text-light-100'} variant={TypographyVariant.regular_text_16}>
              Are you sure you want to delete the photo?
            </Typography>
          </ModalDescription>
          <div>
            <ModalClose>
              <Button variant={'outline'}>No</Button>
            </ModalClose>
            <Button onClick={confirmation} variant={'primary'}>
              Yes
            </Button>
          </div>
        </ModalContentItem>
      </ModalContent>
    </Modal>
  )
}
