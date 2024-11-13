import React, { useState } from 'react'
import { Slider } from '@nikolajk2/lib-insta-leaders'
import { CroppingSettingSize, MemoizedCroppingPhotos } from '@/features/userHub/ui/create'
import { CroppingSettingBtn } from '@/features/userHub/ui/create/cropping/CroppingSettingBtn'
import { CroppingPhoto } from '@/features/userHub/ui/create/cropping/CroppingPhoto'
import { useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import { selectorSelectedImages } from '@/features/userHub/model/createSlice/createSelectors'

export type IconBtnCropping = 'ExpandOutline' | 'MaximizeOutline' | 'Image' | 'ColorPaletteOutline'

export const Cropping = () => {
  const [activeButton, setActiveButton] = useState<IconBtnCropping | null>(null)
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState<number | undefined>(undefined)
  const [aspectOriginal, setAspectOriginal] = useState<number | undefined>(undefined)
  const images = useAppSelector(selectorSelectedImages)

  const handleAspectChange = (newAspect: number | undefined) => setAspect(newAspect)

  //открывает dropdown menu for size, zoom, add photos
  const handleGetImage = (icon: IconBtnCropping) =>
    setActiveButton(prev => (prev === icon ? null : icon))

  const handleCloseSettingBtn = () => setActiveButton(null)

  return (
    <>
      <div
        className={'flex justify-center items-center overflow-hidden'}
        onClick={handleCloseSettingBtn}
      >
        {images.length > 0 && (
          <CroppingPhoto
            zoom={zoom}
            setZoom={setZoom}
            aspect={aspect}
            setAspect={setAspect}
            setAspectOriginal={setAspectOriginal}
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

        {activeButton === 'Image' && <MemoizedCroppingPhotos />}
      </div>

      {/*//КНОПКИ*/}
      <CroppingSettingBtn handleGetImage={handleGetImage} disabled={images.length < 1} />
    </>
  )
}
Cropping.displayName = 'Cropping'
