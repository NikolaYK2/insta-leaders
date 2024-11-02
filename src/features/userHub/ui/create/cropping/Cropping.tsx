import React, { useState } from 'react'
import { Button, DynamicIcon, IconId } from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'

import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'
import Cropper from 'react-easy-crop'

type SettingButton = {
  icon: IconId
  style?: string
}
const settingButton: SettingButton[] = [
  { icon: 'ExpandOutline', style: 'mr-[30px]' },
  { icon: 'MaximizeOutline' },
  { icon: 'Image', style: 'flex ml-auto' },
]

type Props = {
  callBack: () => void
  selectedImage: string | null
}
export const Cropping = ({ callBack, selectedImage }: Props) => {
  const [isOpenSizeImage, setIsOpenSizeImage] = useState(false)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const [aspect, setAspect] = useState<number | undefined>(undefined)
  const [aspectOriginal, setAspectOriginal] = useState<number | undefined>(undefined)

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect)
  }
  const handleGetImage = (icon: string) => {
    if (icon === 'Image') {
      callBack()
    }
    if (icon === 'ExpandOutline') {
      setIsOpenSizeImage(!isOpenSizeImage)
    }
  }

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget
    const originalAspect = naturalWidth / naturalHeight
    setAspect(originalAspect) // Устанавливаем оригинальное соотношение сторон
    setAspectOriginal(originalAspect)
  }
  return (
    <>
      <div className={'flex justify-center items-center overflow-hidden'}>
        {!isOpenSizeImage ? (
          <PhotoPreview
            styleBackground={'absolute inset-0 w-full h-full'}
            styleImage={'w-full h-full object-cover object-center rounded-none'}
            image={selectedImage}
            size={100}
            onLoad={handleImageLoad}
          />
        ) : (
          <>
            <Cropper
              image={selectedImage ?? ''}
              aspect={aspect}
              crop={crop}
              onCropChange={setCrop}
              zoom={zoom}
              onZoomChange={setZoom}
            />
            <Size callBack={handleAspectChange} aspect={aspect} aspectOriginal={aspectOriginal} />
          </>
        )}
      </div>
      <div className={'flex mt-auto'}>
        {settingButton.map(btn => (
          <Button
            className={cn(
              'relative flex justify-center items-center max-w-full p-1.5 bg-dark-500 z-10',
              btn.style
            )}
            variant={'secondary'}
            key={btn.icon}
            onClick={() => handleGetImage(btn.icon)}
          >
            <DynamicIcon iconId={btn.icon} width={28} height={28} />
          </Button>
        ))}
      </div>
    </>
  )
}

type Items = {
  title: string
  aspect?: number
  icon?: IconId
}
const items: Items[] = [
  { title: 'Original' },
  { title: '1:1', aspect: 1 },
  { title: '4:5', aspect: 4 / 5 },
  { title: '16:9', aspect: 16 / 9 },
]
type SizeProps = {
  callBack: (value?: number) => void
  aspect?: number
  aspectOriginal?: number
}
const Size = ({ callBack, aspect, aspectOriginal }: SizeProps) => {
  return (
    <div
      className={
        'absolute flex flex-col justify-between max-w-[156px] w-full h-[152px] bg-dark-500/40 bottom-[60px] left-[11px] rounded-[2px] p-3'
      }
    >
      {items.map(btn => (
        <button
          className={cn(
            'flex p-0 justify-start outline-2 rounded-[2px] focus:outline-none focus-visible:outline-accent-100'
          )}
          key={btn.title}
          onClick={() => callBack(btn.title === 'Original' ? aspectOriginal : btn.aspect)}
        >
          <div
            className={cn(
              'flex justify-between items-center text-light-900 w-full group',
              aspect === (btn.title === 'Original' ? aspectOriginal : btn.aspect) &&
                'text-light-100 border-light-100',
              'hover:text-light-100 transition ease-in-out duration-300'
            )}
          >
            {btn.title}
            {btn.title !== 'Original' ? (
              <div
                className={cn(
                  !btn.icon &&
                    'w-[18px] h-[18px] border-[2px] rounded-[3px] mr-[3px] border-light-900', //default
                  btn.title === '4:5' && 'h-8', //для каждой кнопки делаем свою картинку
                  btn.title === '16:9' && 'w-8', //для каждой кнопки делаем свою картинку
                  aspect === (btn.title === 'Original' ? aspectOriginal : btn.aspect) &&
                    'border-light-100',
                  'group-hover:border-light-100 transition ease-in-out duration-300'
                  //оригинальный размер картинки
                )}
              />
            ) : (
              <DynamicIcon iconId={'ImageOutline'} width={24} height={24} />
            )}
          </div>
        </button>
      ))}
    </div>
  )
}
