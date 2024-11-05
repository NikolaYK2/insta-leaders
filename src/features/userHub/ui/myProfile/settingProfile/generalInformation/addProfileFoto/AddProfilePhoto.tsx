import React, { ComponentPropsWithoutRef } from 'react'
import { DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import Image from 'next/image'
import { ConfirmationModal, ModalAddPhoto } from './modalAddPhoto'
import { useProfilePhoto } from './AddPhotoHooks'
import { cn } from '@/common/utils/cn'

export type GeneralInfoProps = ComponentPropsWithoutRef<'div'>

export const AddProfilePhoto = () => {
  const { handleDeletePhoto, image, isLoading, isOpen, isSubmitting, handleOpenModal, setImage } =
    useProfilePhoto()

  return (
    <div className={'flex flex-col items-center gap-6 w-full max-w-xs pt-6'}>
      <PhotoPreview
        image={image}
        size={96}
        callback={handleDeletePhoto}
        // styleImage={'h-192 w-192 object-cover rounded-full'}
      />
      <ModalAddPhoto isOpen={isOpen} setImage={setImage} />
    </div>
  )
}

type PhotoPreviewProps = {
  image: null | string
  callback?: () => void
  styleBackground?: string
  styleImage?: string
  styleClose?: string
  size: number
} & Omit<ComponentPropsWithoutRef<'img'>, 'height' | 'width'>

export const PhotoPreview = ({
  image,
  callback,
  styleBackground,
  styleImage,
  size,
  styleClose,
  ...props
}: PhotoPreviewProps) => {
  const handleClick = () => {
    callback && callback()
  }
  return (
    <div className={cn('relative', styleBackground)}>
      <div
        className={cn(
          'relative overflow-hidden flex items-center justify-center w-[192px] h-[192px] m-0 p-0 bg-dark-500 rounded-full',
          styleImage
        )}
      >
        {image && !image.includes('null') ? (
          <div
            className={'absolute overflow-hidden flex items-center justify-center w-full h-full'}
          >
            <Image
              className={cn('w-full h-full object-cover object-center')}
              alt={'Uploaded'}
              height={size}
              src={image}
              width={size}
              {...props}
            />
          </div>
        ) : (
          <span className={'flex items-center justify-center w-full h-full'}>
            <DynamicIcon iconId="ImageOutline" height={48} width={48} />
          </span>
        )}
      </div>
      {callback && image && !image?.includes('null') && (
        <ConfirmationModal className={styleClose} confirmation={handleClick} />
      )}
    </div>
  )
}
