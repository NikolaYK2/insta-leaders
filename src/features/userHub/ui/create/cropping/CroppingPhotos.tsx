import { SelectedImages } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/Images'
import React, { ChangeEvent, forwardRef } from 'react'
import Image from 'next/image'
import { Button, DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import { ImageUploader } from '@/common/components/imageUpLoader'

type CroppingPhotosProps = {
  selectedImages: SelectedImages[]
  error: string | null
  setImageCrop: (image: SelectedImages) => void
  callBack: () => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}
const CroppingPhotos = forwardRef<HTMLInputElement, CroppingPhotosProps>(
  ({ error, selectedImages, setImageCrop, callBack, handleFileChange }, ref) => {
    return (
      <div className={'absolute flex items-start bottom-[60px] right-3 bg-dark-500/40'}>
        <span>{error}</span>
        <div className={'flex flex-wrap'}>
          {selectedImages.map(img => (
            <div key={img.id} className={'flex max-w-[82px] max-h-[82px] overflow-hidden m-1.5'}>
              <Image
                className={'max-w-20 object-contain'}
                src={img.image}
                alt={'img'}
                width={82}
                height={82}
                onClick={() => setImageCrop({ image: img.image, id: img.id })}
              />
            </div>
          ))}
        </div>
        {/*BUTTON ADD PHOTO*/}
        <Button className={'p-0 m-1.5 text-light-100'} variant={'text'} onClick={callBack}>
          <DynamicIcon iconId={'PlusCircleOutline'} width={30} height={30} />
          <ImageUploader handleFileChange={handleFileChange} ref={ref} />
        </Button>
      </div>
    )
  }
)
CroppingPhotos.displayName = 'PostsPhotos'

export const MemoizedCroppingPhotos = React.memo(CroppingPhotos)
