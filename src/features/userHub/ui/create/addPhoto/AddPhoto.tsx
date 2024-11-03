import React, { ChangeEvent, forwardRef } from 'react'
import { cn } from '@/common/utils/cn'
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'
import { Button, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { ImageUploader } from '@/common/components/imageUpLoader'

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
