import Cropper, { Area, MediaSize } from 'react-easy-crop'
import { Button, DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'
import React, { useCallback, useState } from 'react'
import { getCroppedImg } from '@/common/utils'
import { useAppDispatch, useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import {
  indexCropImageSelector,
  selectedImagesSelector,
} from '@/features/userHub/model/createSlice/createSelectors'
import { setCroppedImage, setIndexCropImage } from '@/features/userHub/model/createSlice'

type CarouselBtn = {
  id: string
  iconId: 'ArrowIosForward'
  classname: string
}
const carouselBtn: CarouselBtn[] = [
  {
    id: 'next',
    iconId: 'ArrowIosForward',
    classname: 'left-3 rotate-180',
  },
  {
    id: 'back',
    iconId: 'ArrowIosForward',
    classname: 'right-3',
  },
]

type Props = {
  aspect: number | undefined
  setAspect: (aspect: number | undefined) => void
  setAspectOriginal: (aspect: number | undefined) => void
  zoom: number
  setZoom: (zoom: number) => void
}
export const CroppingPhoto = ({ aspect, setAspect, setAspectOriginal, setZoom, zoom }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 }) //координаты для cropper
  const [lastTap, setLastTap] = useState<number>(0) //обрезка для двойного нажатия на мобилках
  const [croppedArea, setCroppedArea] = useState<Area>() //координаты после обрезки фото
  const images = useAppSelector(selectedImagesSelector)
  const indexCropImage = useAppSelector(indexCropImageSelector)
  const dispatch = useAppDispatch()
  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const handleGenerateCroppedImage = async () => {
    if (images.length === 0) return

    try {
      const url = await getCroppedImg(images[indexCropImage]?.image ?? '', croppedArea)
      if (url) {
        // Обновляем текущее изображение в `selectedImages` на обрезанное
        dispatch(setCroppedImage({ url }))
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

  // для слайдов
  const handleGetCarousel = (idBtn: string) => {
    const newIndex =
      idBtn === 'back'
        ? Math.min(indexCropImage + 1, images.length - 1) // Переход к следующему изображению
        : Math.max(indexCropImage - 1, 0) // Переход к предыдущему изображению

    dispatch(setIndexCropImage(newIndex))
  }

  const isPreviousHidden = indexCropImage === 0
  const isNextHidden = indexCropImage === images.length - 1

  return (
    <>
      <div onDoubleClick={handleGenerateCroppedImage} onTouchEnd={handleTouch}>
        <Cropper
          image={images[indexCropImage]?.image ?? ''} // Показываем текущее изображение
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
              images.length === 1 && 'hidden',
              btn.id === 'next' && isPreviousHidden && 'hidden',
              btn.id === 'back' && isNextHidden && 'hidden',
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
