import React, { ComponentPropsWithoutRef } from 'react'
import { DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import Image from 'next/image'
import { ConfirmationModal, ModalAddPhoto } from './modalAddPhoto'
import { usePhotoPreview, useProfilePhoto } from './AddPhotoHooks'

export type GeneralInfoProps = ComponentPropsWithoutRef<'div'>

export const AddProfilePhoto = () => {
  const { handleDeletePhoto, image, isLoading, isOpen, isSubmitting, setImage } = useProfilePhoto()
  const formattedImageSrc = image && !image.startsWith('/') ? `/${image}` : image

  return (
    <div className={'flex flex-col items-center gap-6 w-full max-w-xs pt-6'}>
      <PhotoPreview
        image={formattedImageSrc}
        size={96}
        onDeletePhoto={handleDeletePhoto}
        preview={'h-192 w-192 object-cover rounded-full'}
      />
      <ModalAddPhoto setImage={setImage} />
    </div>
  )
}

type PhotoPreviewProps = {
  image: null | string
  onDeletePhoto?: () => void
  preview?: string
  size: number
}

export const PhotoPreview = ({ image, onDeletePhoto, size }: PhotoPreviewProps) => {
  const { handleConfirmation } = usePhotoPreview(onDeletePhoto)

  return (
    <div className={'relative'}>
      <div
        className={
          'relative overflow-hidden flex items-center justify-center w-[192px] h-[192px] m-0 p-0 bg-dark-500 rounded-full'
        }
      >
        {image && !image.includes('null') ? (
          <div
            className={'absolute overflow-hidden flex items-center justify-center w-full h-full'}
          >
            <Image
              className={'w-full h-full object-cover object-center'}
              alt={'Uploaded'}
              height={size}
              src={image}
              width={size}
            />
          </div>
        ) : (
          <span className={'flex items-center justify-center w-full h-full'}>
            <DynamicIcon iconId="ImageOutline" height={48} width={48} />
          </span>
        )}
      </div>
      {image && !image?.includes('null') && <ConfirmationModal confirmation={handleConfirmation} />}
    </div>
  )
}
