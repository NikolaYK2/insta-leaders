import React, { ComponentPropsWithoutRef } from 'react'
import { DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import Image from 'next/image'
import { ConfirmationModal, ModalAddPhoto } from './modalAddPhoto'
import { usePhotoPreview, useProfilePhoto } from './AddPhotoHooks'

export type GeneralInfoProps = ComponentPropsWithoutRef<'div'>

export const AddProfilePhoto = () => {
  const { handleDeletePhoto, image, isLoading, isOpen, isSubmitting, handleOpenModal, setImage } =
    useProfilePhoto()

  return (
    <div className={'flex flex-col items-center gap-6 w-full max-w-xs pt-6'}>
      <PhotoPreview
        image={image}
        size={96}
        onDeletePhoto={handleDeletePhoto}
        preview={'h-192 w-192 object-cover rounded-full'}
      />
      <ModalAddPhoto isOpen={isOpen} setImage={setImage} />
    </div>
  )
}

type PhotoPreviewProps = {
  image: null | string
  onDeletePhoto: () => void
  preview: string
  size: number
}

export const PhotoPreview = ({ image, onDeletePhoto, preview, size }: PhotoPreviewProps) => {
  const { handleConfirmation } = usePhotoPreview(onDeletePhoto)

  return (
    <div className={'relative'}>
      <div
        className={
          'relative overflow-hidden flex items-center justify-center w-[192px] h-[192px] m-0 p-0 bg-dark-500 rounded-full'
        }
      >
        {image && !image.indexOf('null') ? (
          <div
            className={'absolute overflow-hidden flex items-center justify-center w-full h-full'}
          >
            <Image
              className={'w-full h-full object-cover object-center'}
              alt={'Uploaded'}
              height={size}
              src={image}
              // src={'https://storage.yandexcloud.net/sociable-people/users/100/avatar.png'}
              width={size}
            />
          </div>
        ) : (
          <span className={'flex items-center justify-center w-full h-full'}>
            <DynamicIcon iconId="ImageOutline" height={48} width={48} />
          </span>
        )}
      </div>
      {image && !image.indexOf('null') && <ConfirmationModal confirmation={handleConfirmation} />}
    </div>
  )
}
