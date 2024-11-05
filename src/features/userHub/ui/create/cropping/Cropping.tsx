import React, { ChangeEvent, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Slider } from '@nikolajk2/lib-insta-leaders'
import Cropper, { Area, MediaSize } from 'react-easy-crop'
import { CroppingSettingSize, MemoizedCroppingPhotos } from '@/features/userHub/ui/create'
import { CroppingSettingBtn } from '@/features/userHub/ui/create/cropping/CroppingSettingBtn'
import { SelectedImages } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/Images'
import { getCroppedImg } from '@/common/utils'
import { ErrorMessage } from '@/common/components/ErrorMessage'

export type IconBtnCropping = 'ExpandOutline' | 'MaximizeOutline' | 'Image'

type Props = {
  callBack: () => void
  selectedImages: SelectedImages[]
  setSelectedImages: (images: SelectedImages[]) => void
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
  error: string | null
}
export const Cropping = forwardRef<HTMLInputElement, Props>(
  ({ callBack, selectedImages, handleFileChange, setSelectedImages, error }, ref) => {
    const [activeButton, setActiveButton] = useState<IconBtnCropping | null>(null)
    const [imageCrop, setImageCrop] = useState<SelectedImages | null>({ ...selectedImages[0] })
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedArea, setCroppedArea] = useState<Area>()
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState<number | undefined>(undefined)
    const [aspectOriginal, setAspectOriginal] = useState<number | undefined>(undefined)
    const [lastTap, setLastTap] = useState<number>(0) //обрезка для двойного нажатия на мобилках

    const previousImagesLength = useRef(selectedImages.length) //сохраняем значение первоначального размера массива
    // для отслеживания добавлений новый фото

    const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels)
    }

    const handleAspectChange = (newAspect: number | undefined) => {
      setAspect(newAspect)
    }

    //открывает dropdown menu for size, zoom, add photos
    const handleGetImage = (icon: IconBtnCropping) => {
      setActiveButton(prev => (prev === icon ? null : icon))
    }

    const handleCloseSettingBtn = () => {
      setActiveButton(null)
    }

    const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
      const { naturalWidth, naturalHeight } = mediaSize
      const originalAspect = naturalWidth / naturalHeight
      setAspect(originalAspect) // Устанавливаем оригинальное соотношение сторон
      setAspectOriginal(originalAspect)
    }, [])

    //Обрезка photo
    const handleGenerateCroppedImage = async () => {
      if (selectedImages.length === 0) return

      try {
        const url = await getCroppedImg(imageCrop?.image ?? '', croppedArea)
        if (url) {
          if (imageCrop) {
            setImageCrop({ id: imageCrop.id ?? '', image: url as string }) //обновляем кроппер когда обрезаои фото

            setSelectedImages(
              selectedImages.map(img =>
                img.id === imageCrop.id ? { ...img, image: url as string } : img
              )
            )
          }
          //обрезанное фото пересохраняем в общий state
        }
      } catch (error) {
        console.error('Error generating cropped image:', error)
      }
    }

    //двойное касание для мобилак
    const handleTouch = async () => {
      const currentTime = Date.now()
      const tapLength = currentTime - lastTap
      if (tapLength < 300 && tapLength > 0) {
        // Два касания в течение 300 мс
        await handleGenerateCroppedImage()
      }
      setLastTap(currentTime)
    }

    //при добавлении фото, сетается сразу в cropper
    useEffect(() => {
      if (
        selectedImages.length > previousImagesLength.current ||
        selectedImages.length < previousImagesLength.current
      ) {
        if (selectedImages.length > 0) {
          // Если массив не пуст, устанавливаем последнее изображение
          setImageCrop(selectedImages[selectedImages.length - 1])
        } else {
          // Если массив пуст, очищаем imageCrop
          setImageCrop(null)
        }
      }
      previousImagesLength.current = selectedImages.length // Обновляем текущую длину массива
    }, [selectedImages])
    return (
      <>
        <div
          className={'flex justify-center items-center overflow-hidden'}
          onClick={handleCloseSettingBtn}
        >
          {error && (
            <ErrorMessage className={'absolute inset-0 z-[10000000]'}>{error}</ErrorMessage>
          )}

          {imageCrop && (
            <div onDoubleClick={handleGenerateCroppedImage} onTouchEnd={handleTouch}>
              <Cropper
                image={imageCrop?.image ?? ''}
                aspect={aspect}
                crop={crop}
                onCropChange={setCrop}
                zoom={zoom}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                onMediaLoaded={onMediaLoaded}
              />
            </div>
          )}

          {activeButton === 'ExpandOutline' && ( //size
            <CroppingSettingSize
              callBack={handleAspectChange}
              aspect={aspect}
              aspectOriginal={aspectOriginal}
            />
          )}
          {activeButton === 'MaximizeOutline' && ( //zoom
            <div
              className={
                'absolute flex flex-col justify-between h-[36px] bg-dark-500 bottom-[60px] left-[16.9%] rounded-[2px] p-3'
              }
            >
              <Slider
                className={'flex items-center max-w-[100px]'}
                min={1}
                max={3}
                value={[zoom]}
                step={0.1}
                aria-label={'Zoom'}
                onValueChange={value => setZoom(value[0])}
                onClick={e => e.stopPropagation()}
              />
            </div>
          )}
          {activeButton === 'Image' && (
            <MemoizedCroppingPhotos
              selectedImages={selectedImages}
              setImageCrop={setImageCrop}
              ref={ref}
              callBack={callBack}
              handleFileChange={handleFileChange}
              setSelectedImages={setSelectedImages}
            />
          )}
        </div>

        {/*//КНОПКИ*/}
        <CroppingSettingBtn handleGetImage={handleGetImage} />
      </>
    )
  }
)
Cropping.displayName = 'Cropping'
