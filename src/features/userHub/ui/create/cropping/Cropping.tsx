import React from 'react'
import { Button, DynamicIcon, IconId } from '@nikolajk2/lib-insta-leaders'
import { PhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/AddProfilePhoto'
import { cn } from '@/common/utils/cn'

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
  const handleGetImage = (icon: string) => {
    if (icon === 'Image') {
      callBack()
    }
  }

  return (
    <>
      <div className={'flex justify-center'}>
        <PhotoPreview
          styleBackground={'absolute inset-0 w-full h-full z-0'}
          styleImage={'w-full h-full object-cover object-center rounded-none bg-amber-400'}
          image={selectedImage}
          size={100}
        />
      </div>
      <div className={'flex'}>
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
