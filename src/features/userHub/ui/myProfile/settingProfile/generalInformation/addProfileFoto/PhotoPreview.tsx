import { DynamicIcon } from '@nikolajk2/lib-insta-leaders'
import { usePhotoPreview } from './usePhotoPreview'
import { ConfirmationModal } from './ConfirmationModal'
import Image from 'next/image'

type PhotoPreviewProps = {
  image: null | string
  onDeletePhoto?: () => void
  preview?: string
  size: number
}

export const PhotoPreview = ({ image, onDeletePhoto, size }: PhotoPreviewProps) => {
  const { handleConfirmation } = usePhotoPreview(onDeletePhoto)

  return (
    <div className={'relative'}>
      <div
        className={
          'relative overflow-hidden flex items-center justify-center w-[192px] h-[192px] m-0 p-0 bg-dark-500 rounded-full'
        }
      >
        {image && !image.includes('null') ? (
          <div
            className={'absolute overflow-hidden flex items-center justify-center w-full h-full'}
          >
            <Image
              className={'w-full h-full object-cover object-center'}
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
      {image && !image?.includes('null') && <ConfirmationModal confirmation={handleConfirmation} />}
    </div>
  )
}
