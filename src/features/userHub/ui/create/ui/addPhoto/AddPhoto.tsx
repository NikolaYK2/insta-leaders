import React from 'react'
import { Button, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { ImageUploader } from '@/common/components/imageUpLoader'
import { ErrorMessage } from '@/common/components/ErrorMessage/ErrorMessage'
import { useModalAddPhoto } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/useModalAddPhoto'
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/PhotoPreview'
import { deleteImages, setImage } from '@/features/userHub/model/createSlice'

export const AddPhoto = () => {
  const { handleFileChange, handleClick, fileInputRef, error } = useModalAddPhoto({
    setActionForImages: setImage,
    deleteActionForImages: deleteImages,
  })

  return (
    <>
      <div className={'flex flex-col justify-between items-center h-full'}>
        {error && <ErrorMessage className={'absolute'}>{error}</ErrorMessage>}
        <PhotoPreview
          styleContainerImage={'rounded-none w-[222px] h-[222px] mb-[60px] mt-[72px]'}
          image={''}
          size={20}
        />
      </div>
      <div className={'flex flex-col mx-auto'}>
        <Button className={'mb-6'} onClick={handleClick}>
          Select from Computer
          <ImageUploader handleFileChange={handleFileChange} ref={fileInputRef} />
        </Button>

        <Button variant={'outline'}>
          <Typography variant={TypographyVariant.h3}>Open Draft</Typography>
        </Button>
      </div>
    </>
  )
}
AddPhoto.displayName = 'AddPhoto'
