import { cn } from '@/common/utils/cn'
import { DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import React from 'react'
import { Icon } from 'next/dist/lib/metadata/types/metadata-types'

type Items = {
  title: string
  aspect?: number
  icon?: Icon
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
export const CroppingSettingSize = ({ callBack, aspect, aspectOriginal }: SizeProps) => {
  return (
    <div
      className={
        'absolute flex flex-col justify-between max-w-[156px] w-full h-[152px] bg-dark-500/40 bottom-[60px] left-[11px] rounded-[2px] p-3'
      }
      onClick={e => e.stopPropagation()}
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
                    'border-light-100', //оригинальный размер картинки

                  'group-hover:border-light-100 transition ease-in-out duration-300'
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
