import Cropper, { Area, MediaSize } from 'react-easy-crop'
import React, { useCallback, useState } from 'react'
import { getCroppedImg, indexDBUtils } from '@/common/utils'
import { useAppDispatch, useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import {
  selectorIndexCropImage,
  selectorSelectedImages,
} from '@/features/userHub/model/createSlice/createSelectors'
import { setCroppedImage } from '@/features/userHub/model/createSlice'
import { CarouselBtn } from '@/features/userHub/ui/create/ui/carouselBtn'

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
  const images = useAppSelector(selectorSelectedImages)
  const indexCropImage = useAppSelector(selectorIndexCropImage)
  const dispatch = useAppDispatch()
  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const handleGenerateCroppedImage = async () => {
    if (images.length === 0) return

    try {
      const blob = await getCroppedImg(images[indexCropImage]?.image ?? '', croppedArea)
      if (blob) {
        // Обновляем текущее изображение в `selectedImages` на обрезанное
        dispatch(setCroppedImage({ url: URL.createObjectURL(blob) })) // URL для отображения в интерфейсе
        await indexDBUtils.updateImageById({ id: images[indexCropImage].id, updatedImage: blob })
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
      {/*/!*КНОПКИ СЛАЙДА*!/*/}
      <CarouselBtn arrayItems={images} indexItems={indexCropImage} />
    </>
  )
}
