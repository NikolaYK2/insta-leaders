import React, { useState } from 'react'
import { IconBtnCropping } from '@/features/userHub/ui/create'
import { Button, DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'

type SettingButton = {
  icon: IconBtnCropping
  style?: string
}
const settingButton: SettingButton[] = [
  { icon: 'ExpandOutline', style: 'mr-[30px]' },
  { icon: 'MaximizeOutline' },
  { icon: 'Image', style: 'flex ml-auto' },
]

type Props = {
  handleGetImage: (icon: IconBtnCropping) => void
  disabled: boolean
}
export const CroppingSettingBtn = ({ handleGetImage, disabled }: Props) => {
  const [isActiveBtn, setIsActiveBtn] = useState<IconBtnCropping | null>(null)

  const handleIsActive = (icon: IconBtnCropping) =>
    setIsActiveBtn(isActiveBtn === icon ? null : icon) //Это означает, что пользователь нажал на уже активную кнопку

  return (
    <div className={'flex mt-auto'}>
      {settingButton.map(btn => {
        const isActive = isActiveBtn === btn.icon
        const isButtonDisabled =
          disabled && (btn.icon === 'MaximizeOutline' || btn.icon === 'ExpandOutline')

        return (
          <Button
            disabled={isButtonDisabled}
            className={cn(
              'relative flex justify-center items-center max-w-full p-1.5 bg-dark-500 z-10',
              btn.style,
              isButtonDisabled && 'opacity-50' // Общее условие для прозрачности
            )}
            variant={'secondary'}
            key={btn.icon}
            onClick={() => {
              handleGetImage(btn.icon)
              handleIsActive(btn.icon)
            }}
          >
            <DynamicIcon
              className={cn(isActive ? 'text-accent-500' : 'text-light-100')}
              iconId={btn.icon}
              width={28}
              height={28}
            />
          </Button>
        )
      })}
    </div>
  )
}
