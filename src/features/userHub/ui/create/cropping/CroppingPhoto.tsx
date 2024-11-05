import Cropper, { Area, MediaSize } from 'react-easy-crop'
import { Button, DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { getCroppedImg } from '@/common/utils'
import { SelectedImages } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/Images'

type CarouselBtn = {
  id: number
  iconId: 'ArrowIosForward'
  classname: string
}
const carouselBtn: CarouselBtn[] = [
  {
    id: 1,
    iconId: 'ArrowIosForward',
    classname: 'left-3 rotate-180',
  },
  {
    id: 2,
    iconId: 'ArrowIosForward',
    classname: 'right-3',
  },
]

type Props = {
  selectedImages: SelectedImages[]
  setSelectedImages: (selectedImages: SelectedImages[]) => void
  indexCropImage: number
  setIndexCropImage: Dispatch<SetStateAction<number>>
  aspect: number | undefined
  setAspect: (aspect: number | undefined) => void
  setAspectOriginal: (aspect: number | undefined) => void
  zoom: number
  setZoom: (zoom: number) => void
}
export const CroppingPhoto = ({
  selectedImages,
  aspect,
  setAspect,
  setAspectOriginal,
  setZoom,
  zoom,
  indexCropImage,
  setIndexCropImage,
  setSelectedImages,
}: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 }) //координаты для cropper
  const [lastTap, setLastTap] = useState<number>(0) //обрезка для двойного нажатия на мобилках
  const [croppedArea, setCroppedArea] = useState<Area>() //координаты после обрезки фото

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const handleGenerateCroppedImage = async () => {
    if (selectedImages.length === 0) return

    try {
      const url = await getCroppedImg(selectedImages[indexCropImage]?.image ?? '', croppedArea)
      if (url) {
        // Обновляем текущее изображение в `selectedImages` на обрезанное
        setSelectedImages(
          selectedImages.map((img, index) =>
            index === indexCropImage ? { ...img, image: url as string } : img
          )
        )
      }
    } catch (error) {
      console.error('Error generating cropped image:', error)
    }
  }

  //при загрузке фото, по default делаем область выделения на весь размер картинки
  const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
    const { naturalWidth, naturalHeight } = mediaSize
    const originalAspect = naturalWidth / naturalHeight
    setAspect(originalAspect) // Устанавливаем оригинальное соотношение сторон
    setAspectOriginal(originalAspect)
  }, [])

  //двойное касание на мобильном для обрезки
  const handleTouch = async () => {
    const currentTime = Date.now()
    const tapLength = currentTime - lastTap
    if (tapLength < 300 && tapLength > 0) {
      // Два касания в течение 300 мс
      await handleGenerateCroppedImage()
    }
    setLastTap(currentTime)
  }

  // // для слайдов
  const handleGetCarousel = (idBtn: number) => {
    setIndexCropImage(prevIndex => {
      if (idBtn === 2 && prevIndex < selectedImages.length - 1) {
        // Переход к следующему изображению, если не достигнут конец
        return prevIndex + 1
      } else if (idBtn === 1 && prevIndex > 0) {
        // Переход к предыдущему изображению, если не достигнуто начало
        return prevIndex - 1
      }
      return prevIndex
    })
  }

  // Переменные для управления видимостью кнопок
  const isPreviousHidden = indexCropImage === 0
  const isNextHidden = indexCropImage === selectedImages.length - 1

  return (
    <>
      <div onDoubleClick={handleGenerateCroppedImage} onTouchEnd={handleTouch}>
        <Cropper
          image={selectedImages[indexCropImage]?.image ?? ''} // Показываем текущее изображение
          aspect={aspect}
          crop={crop}
          onCropChange={setCrop}
          zoom={zoom}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          onMediaLoaded={onMediaLoaded}
        />
      </div>
      {/*КНОПКИ СЛАЙДА*/}
      {carouselBtn.map(btn => {
        return (
          <Button
            key={btn.id}
            className={cn(
              'absolute top-[50%] p-2 bg-dark-500/80 text-light-100',
              selectedImages.length === 1 && 'hidden',
              btn.id === 1 && isPreviousHidden && 'hidden',
              btn.id === 2 && isNextHidden && 'hidden',
              btn.classname
            )}
            variant={'text'}
            onClick={() => handleGetCarousel(btn.id)}
          >
            <DynamicIcon iconId={btn.iconId} width={24} height={24} />
          </Button>
        )
      })}
    </>
  )
}
