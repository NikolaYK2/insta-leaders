import React, { useEffect, useState } from 'react'
import { Button, DynamicIcon, IconId } from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'
import 'react-image-crop/dist/ReactCrop.css'
import ReactCrop, { type Crop } from 'react-image-crop'
import Image from 'next/image'
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'

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
  const [aspect, setAspect] = useState<number>(1) // Храним aspect отдельно

  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 50,
    height: 50,
    x: 25,
    y: 25,
  })

  const handleAspectChange = (newAspect: number) => {
    setAspect(newAspect)
    console.log('Aspect set to:', newAspect)
  }
  const handleGetImage = (icon: string) => {
    if (icon === 'Image') {
      callBack()
    }
    if (icon === 'ExpandOutline') {
      setIsOpenSizeImage(!isOpenSizeImage)
    }
  }
  useEffect(() => {
    // Обновляем область обрезки при изменении аспекта
    setCrop(prevCrop => ({
      ...prevCrop,
      width: 50,
      height: 50 / aspect,
      x: 25,
      y: 25,
    }))
  }, [aspect])
  return (
    <>
      <div className={'absolute inset-0 flex justify-center items-center'}>
        {!isOpenSizeImage ? (
          <PhotoPreview
            styleBackground={'absolute inset-0 w-full h-full'}
            styleImage={'w-full h-full object-cover object-center rounded-none bg-amber-400'}
            image={selectedImage}
            size={100}
          />
        ) : (
          <ReactCrop
            className={'flex items-center justify-center max-w-full-[504[ max-h-[504px]'}
            crop={crop}
            keepSelection
            onChange={(pixelCrop, percentageCrop) => setCrop(pixelCrop)}
            aspect={aspect}
          >
            <Image
              className={'w-full h-full object-contain'}
              src={selectedImage ?? ''}
              width={300}
              height={300}
              alt={'post'}
            />
          </ReactCrop>
        )}
      </div>
      <div className={'flex mt-auto'}>
        {settingButton.map(btn => (
          <Button
            className={cn('p-1.5 bg-dark-500 z-10', btn.style)}
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

{
  /*<div className="flex flex-col items-start mr-4">*/
}
{
  /*  <button onClick={() => handleAspectChange(1)}>1:1</button>*/
}
{
  /*  <button onClick={() => handleAspectChange(4 / 5)}>4:5</button>*/
}
{
  /*  <button onClick={() => handleAspectChange(16 / 9)}>16:9</button>*/
}
{
  /*</div>*/
}
