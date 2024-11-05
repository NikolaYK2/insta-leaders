import React, { ChangeEvent, forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { Slider } from '@nikolajk2/lib-insta-leaders'
import Cropper, { Area, MediaSize } from 'react-easy-crop'
import { CroppingSettingSize, MemoizedCroppingPhotos } from '@/features/userHub/ui/create'
import { CroppingSettingBtn } from '@/features/userHub/ui/create/cropping/CroppingSettingBtn'
import { SelectedImages } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/Images'
import { getCroppedImg } from '@/common/utils'

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
    console.log('render!!!')
    const [activeButton, setActiveButton] = useState<IconBtnCropping | null>(null)
    const [imageCrop, setImageCrop] = useState<SelectedImages>({
      id: selectedImages[0].id,
      image: selectedImages[0].image,
    })
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedArea, setCroppedArea] = useState<Area>()
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState<number | undefined>(undefined)
    const [aspectOriginal, setAspectOriginal] = useState<number | undefined>(undefined)

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
        const url = await getCroppedImg(imageCrop.image, croppedArea)
        if (url) {
          setImageCrop({ id: imageCrop.id, image: url as string }) //обновляем кроппер когда обрезаои фото

          //обрезанное фото пересохраняем в общий state
          setSelectedImages(
            selectedImages.map(img =>
              img.id === imageCrop.id ? { ...img, image: url as string } : img
            )
          )
        }
      } catch (error) {
        console.error('Error generating cropped image:', error)
      }
    }

    //при добавлении фото, сетается сразу в cropper
    useEffect(() => {
      if (selectedImages.length > previousImagesLength.current) {
        // Если массив увеличился, берем последнюю картинку и сетим её в imageCrop
        setImageCrop(selectedImages[selectedImages.length - 1])
      }
      previousImagesLength.current = selectedImages.length // Обновляем текущую длину массива
    }, [selectedImages])

    return (
      <>
        <div
          className={'flex justify-center items-center overflow-hidden'}
          onDoubleClick={handleGenerateCroppedImage}
        >
          <Cropper
            image={imageCrop.image ?? ''}
            aspect={aspect}
            crop={crop}
            onCropChange={setCrop}
            zoom={zoom}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            onMediaLoaded={onMediaLoaded}
          />
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
              error={error}
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
