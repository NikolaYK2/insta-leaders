import React from 'react'
import { Button, DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import { ImageUploader } from '@/common/components/imageUpLoader'
import { useAppDispatch, useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import { selectedImagesSelector } from '@/features/userHub/model/createSlice/createSelectors'
import { useModalAddPhoto } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/useModalAddPhoto'
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/PhotoPreview'
import {
  deleteImage,
  setIndexCropImage,
  setSelectedImages,
} from '@/features/userHub/model/createSlice'

/**
 * Здесь будут находиться все фото которые пользователь добавит перед тем как постить
 */
const CroppingPhotos = () => {
  const images = useAppSelector(selectedImagesSelector)
  const { handleFileChange, handleClick, fileInputRef } = useModalAddPhoto({
    setActionForImages: setSelectedImages,
    photosLength: images.length,
    photoLimit: 3,
    errorMessage: 'maximum 10 photos!',
  })
  const dispatch = useAppDispatch()

  const handleDeletePhoto = (id: string) => {
    // Теперь setSelectedImages обновит состояние, и картинка будет удалена
    dispatch(deleteImage({ id }))
  }

  //выбираем в кроппер картинку при клике
  const handleClickImage = (id: string) => {
    const newIndex = images.findIndex(selectImg => selectImg.id === id) // Находим индекс выбранного изображения
    if (newIndex !== -1) {
      dispatch(setIndexCropImage(newIndex)) // Устанавливаем currentIndex на выбранное изображение
    }
  }

  return (
    <div
      className={'absolute flex items-start bottom-[60px] right-3 bg-dark-500/40'}
      onClick={e => e.stopPropagation()}
    >
      <div className={'flex flex-wrap'}>
        {images.map(img => (
          <div key={img.id} className={'flex max-w-[82px] max-h-[82px] overflow-hidden m-1.5'}>
            <PhotoPreview
              image={img.image}
              size={82}
              className={'w-full h-full object-cover object-center cursor-pointer'}
              styleBackground={'max-w-20 max-h-20'}
              styleImage={'max-w-20 max-h-20 rounded-none'}
              styleClose={'top-1 right-1 rounded-none bg-dark-100'}
              onClick={() => handleClickImage(img.id)}
              callback={() => handleDeletePhoto(img.id)}
            />
          </div>
        ))}
      </div>
      {/*BUTTON ADD PHOTOS*/}
      <Button className={'p-0 m-1.5 text-light-100'} variant={'text'} onClick={handleClick}>
        <DynamicIcon iconId={'PlusCircleOutline'} width={30} height={30} />
        <ImageUploader handleFileChange={handleFileChange} ref={fileInputRef} />
      </Button>
    </div>
  )
}
CroppingPhotos.displayName = 'PostsPhotos'

export const MemoizedCroppingPhotos = React.memo(CroppingPhotos)
