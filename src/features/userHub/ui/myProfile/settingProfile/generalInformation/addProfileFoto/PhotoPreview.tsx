import { DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import Image from 'next/image'
import { cn } from '@/common/utils/cn'
import { ConfirmationModal } from '@/common/components/ConfirmationModal'

type PhotoPreviewProps = {
  image: null | string
  onClick?: any
  callback?: any
  styleImage?: string
  styleContainerImage?: string
  styleClose?: string
  size: number
  className?: string
}

export const PhotoPreview = ({
  image,
  size,
  styleImage,
  styleContainerImage,
  styleClose,
  className,
  onClick,
  callback,
}: PhotoPreviewProps) => {
  return (
    <div className={'relative'} onClick={onClick}>
      <div
        className={cn(
          'relative overflow-hidden flex items-center justify-center w-[192px] h-[192px] m-0 p-0 bg-dark-500 rounded-full',
          styleContainerImage
        )}
      >
        {image && !image.includes('null') ? (
          <div
            className={cn(
              'absolute overflow-hidden flex items-center justify-center w-full h-full',
              styleImage
            )}
          >
            <Image
              className={cn('w-full h-full object-cover object-center', className)}
              alt={'Uploaded'}
              height={size}
              src={image}
              width={size}
            />
          </div>
        ) : (
          <span className={'flex items-center justify-center w-full h-full'}>
            <DynamicIcon iconId="ImageOutline" height={48} width={48} />
          </span>
        )}
      </div>
      {image && !image?.includes('null') && (
        <ConfirmationModal className={styleClose} confirmation={callback} />
      )}
    </div>
  )
}
