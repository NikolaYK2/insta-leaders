import React, { ChangeEvent, forwardRef } from 'react'
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'
import { Button, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { ImageUploader } from '@/common/components/imageUpLoader'
import { ErrorMessage } from '@/common/components/ErrorMessage/ErrorMessage'

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
          {error && <ErrorMessage className={'absolute'}>{error}</ErrorMessage>}
          <PhotoPreview
            styleImage={'rounded-none w-[222px] h-[222px] mb-[60px] mt-[72px]'}
            image={image}
            size={20}
          />
        </div>
        <div className={'flex flex-col mx-auto'}>
          <Button className={'mb-6'} onClick={handleCLick}>
            Select from Computer
            <ImageUploader handleFileChange={handleFileChange} ref={ref} />
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
