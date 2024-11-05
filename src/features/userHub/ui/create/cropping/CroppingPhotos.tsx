import { SelectedImages } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/Images'
import React, { ChangeEvent, forwardRef } from 'react'
import { Button, DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import { ImageUploader } from '@/common/components/imageUpLoader'
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'

type CroppingPhotosProps = {
  selectedImages: SelectedImages[]
  setSelectedImages: (selectedImages: SelectedImages[]) => void
  setImageCrop: (image: SelectedImages) => void
  callBack: () => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}
const CroppingPhotos = forwardRef<HTMLInputElement, CroppingPhotosProps>(
  ({ selectedImages, setImageCrop, callBack, handleFileChange, setSelectedImages }, ref) => {
    const handleDeletePhoto = (id: string) => {
      setSelectedImages(selectedImages.filter(img => img.id !== id))
      // Теперь setSelectedImages обновит состояние, и картинка будет удалена
    }
    return (
      <div
        className={'absolute flex items-start bottom-[60px] right-3 bg-dark-500/40'}
        onClick={e => e.stopPropagation()}
      >
        <div className={'flex flex-wrap'}>
          {selectedImages.map(img => (
            <div key={img.id} className={'flex max-w-[82px] max-h-[82px] overflow-hidden m-1.5'}>
              {/*<Image*/}
              {/*  className={'max-w-20 object-contain'}*/}
              {/*  src={img.image}*/}
              {/*  alt={'img'}*/}
              {/*  width={82}*/}
              {/*  height={82}*/}
              {/*  onClick={() => setImageCrop({ image: img.image, id: img.id })}*/}
              {/*/>*/}
              {/*<div>X</div>*/}
              <PhotoPreview
                image={img.image}
                size={82}
                className={'w-full h-full object-cover object-center cursor-pointer'}
                styleBackground={'max-w-20 max-h-20'}
                styleImage={'max-w-20 max-h-20 rounded-none'}
                styleClose={'top-1 right-1 rounded-none bg-dark-100'}
                onClick={() => setImageCrop({ image: img.image, id: img.id })}
                callback={() => handleDeletePhoto(img.id)}
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
