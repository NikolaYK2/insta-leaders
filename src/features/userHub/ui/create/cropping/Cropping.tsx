import React, { ChangeEvent, forwardRef, useEffect, useRef, useState } from 'react'
import { Slider } from '@nikolajk2/lib-insta-leaders'
import { CroppingSettingSize, MemoizedCroppingPhotos } from '@/features/userHub/ui/create'
import { CroppingSettingBtn } from '@/features/userHub/ui/create/cropping/CroppingSettingBtn'
import { SelectedImages } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/Images'
import { ErrorMessage } from '@/common/components/ErrorMessage'
import { CroppingPhoto } from '@/features/userHub/ui/create/cropping/CroppingPhoto'

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
    const [zoom, setZoom] = useState(1)
    const [aspect, setAspect] = useState<number | undefined>(undefined)
    const [aspectOriginal, setAspectOriginal] = useState<number | undefined>(undefined)
    const [indexCropImage, setIndexCropImage] = useState<number>(0) //для карусели

    const previousImagesLength = useRef(selectedImages.length) //сохраняем значение первоначального размера массива

    const handleAspectChange = (newAspect: number | undefined) => setAspect(newAspect)

    //открывает dropdown menu for size, zoom, add photos
    const handleGetImage = (icon: IconBtnCropping) =>
      setActiveButton(prev => (prev === icon ? null : icon))

    const handleCloseSettingBtn = () => setActiveButton(null)

    // //при добавлении фото, сетается сразу в cropper
    useEffect(() => {
      if (selectedImages.length > previousImagesLength.current) {
        // Если добавлено новое изображение, устанавливаем currentIndex на последнее изображение
        setIndexCropImage(selectedImages.length - 1)
      } else if (
        selectedImages.length < previousImagesLength.current &&
        selectedImages.length > 0
      ) {
        // Если изображение удалено, устанавливаем currentIndex на предыдущее изображение
        setIndexCropImage(Math.min(indexCropImage, selectedImages.length - 1))
      } else if (selectedImages.length === 0) {
        // Если массив пуст, сбрасываем currentIndex и imageCrop
        setIndexCropImage(0)
      }
      previousImagesLength.current = selectedImages.length // Обновляем текущую длину массива
    }, [selectedImages, indexCropImage])

    return (
      <>
        <div
          className={'flex justify-center items-center overflow-hidden'}
          onClick={handleCloseSettingBtn}
        >
          {error && (
            <ErrorMessage className={'absolute inset-0 z-[10000000]'}>{error}</ErrorMessage>
          )}

          {selectedImages.length > 0 && (
            <CroppingPhoto
              zoom={zoom}
              setZoom={setZoom}
              aspect={aspect}
              setAspect={setAspect}
              setAspectOriginal={setAspectOriginal}
              indexCropImage={indexCropImage}
              setIndexCropImage={setIndexCropImage}
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
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
              ref={ref}
              callBack={callBack}
              handleFileChange={handleFileChange}
              setSelectedImages={setSelectedImages}
              setIndexCropImage={setIndexCropImage}
            />
          )}
        </div>

        {/*//КНОПКИ*/}
        <CroppingSettingBtn handleGetImage={handleGetImage} disabled={selectedImages.length < 1} />
      </>
    )
  }
)
Cropping.displayName = 'Cropping'
