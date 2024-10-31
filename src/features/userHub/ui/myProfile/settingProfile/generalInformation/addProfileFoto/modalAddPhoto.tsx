import Image from 'next/image'
import {
  Button,
  DynamicIcon,
  Modal,
  ModalClose,
  ModalContent,
  ModalContentItem,
  ModalDescription,
  ModalTitle,
  ModalTrigger,
  Typography,
  TypographyVariant,
} from '@nikolajk2/lib-insta-leaders'
import { useModalAddPhoto } from './Images'
import { useProfilePhoto } from './AddPhotoHooks'

type ModalAddPhotoProps = {
  setImage: (image: null | string) => void
}

export const ModalAddPhoto = ({ setImage }: ModalAddPhotoProps) => {
  const { handleSubmit } = useProfilePhoto()
  const {
    error,
    fileInputRef,
    reset,
    handleClick,
    handleFileChange,
    handleSave,
    isSaved,
    selectedImage,
  } = useModalAddPhoto({ setImage })

  const handleSubmitClick = async () => {
    try {
      // Call handleSave first to save the image and set the necessary state
      handleSave()

      // Call handleSubmit to submit the image
      await handleSubmit(selectedImage)

      // Optionally, you can add any additional logic here after both functions have been called
    } catch (error) {
      console.error('Error in handleClick:', error)
    }
  }

  return (
    <Modal>
      <ModalTrigger asChild className={'mobile:w-full'}>
        <Button variant={'outline'}>
          <Typography variant={TypographyVariant.h3}>Add a Profile Photo</Typography>
        </Button>
      </ModalTrigger>
      <ModalContent className={'w-full max-w-[492px]'}>
        <ModalTitle className={'text-light-100'}>
          <Typography className={'mobile: w-full'} variant={TypographyVariant.h2}>
            Add a Profile Photo
          </Typography>
          <ModalClose style={{ left: 0 }}>
            <DynamicIcon iconId={'CloseOutline'} width={24} onClick={reset} color={'white'} />
          </ModalClose>
        </ModalTitle>
        <ModalContentItem className={'flex flex-col gap-[60px] items-center pb-[78px]'}>
          <div
            className={`w-full max-w-xs max-h-fit p-1.25 px-10.25 text-center visible opacity-0 bg-danger-900 border-1 border-danger-500 ${
              error ? 'visible opacity-100' : 'invisible opacity-0'
            }`}
          >
            <Typography variant={TypographyVariant.bold_text_14}>
              Error!<Typography variant={TypographyVariant.regular_text_16}>{error}</Typography>
            </Typography>
          </div>

          <PhotoPreview image={selectedImage} preview={'h-296 w-296 object-cover'} size={228} />
          <input
            accept={'image/*'}
            hidden
            onChange={handleFileChange}
            ref={fileInputRef}
            type={'file'}
            name={'avatarFile'}
          />
          {selectedImage && !error && !isSaved && (
            <ModalClose asChild>
              <Button className={'bg-accent-500'} variant={'primary'} onClick={handleSubmitClick}>
                <Typography variant={TypographyVariant.h3}> Save</Typography>
              </Button>
            </ModalClose>
          )}
          {!selectedImage && !isSaved && (
            <Button
              variant={'primary'}
              className={'bg-accent-500'}
              onClick={handleClick}
              type="button"
            >
              <Typography variant={TypographyVariant.h3}> Select from Computer</Typography>
            </Button>
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

const PhotoPreview = ({ image, size }: PhotoPreviewProps) => {
  return (
    <div
      className={
        'relative overflow-hidden flex items-center justify-center w-[228px] h-[228px] m-0 p-0 bg-dark-500'
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
          'cursor-pointer absolute top-[19px] right-2.5 flex items-center justify-center w-6 h-6'
        }
      >
        <DynamicIcon
          className={'border-4 border-black rounded-full bg-danger-500 hover:bg-danger-300'}
          iconId="CloseOutline"
          width={24}
          color="white"
        />
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
