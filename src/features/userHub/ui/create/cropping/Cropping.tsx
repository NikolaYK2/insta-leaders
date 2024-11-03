import React, { useCallback, useState } from 'react'
import { Button, DynamicIcon, Slider } from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'
import Cropper, { Area, MediaSize } from 'react-easy-crop'

type Icon = 'ExpandOutline' | 'MaximizeOutline' | 'Image'
type SettingButton = {
  icon: Icon
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
  const [isOpenZoomImage, setIsOpenZoomImage] = useState(false)
  const [isActiveBtn, setIsActiveBtn] = useState<Icon | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [croppedArea, setCroppedArea] = useState<Area>()
  const [zoom, setZoom] = useState(1)

  const [aspect, setAspect] = useState<number | undefined>(undefined)
  const [aspectOriginal, setAspectOriginal] = useState<number | undefined>(undefined)

  const onCropComplete = (croppedAreaPercentage: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels)
  }

  const handleAspectChange = (newAspect: number | undefined) => {
    setAspect(newAspect)
  }
  const handleGetImage = (icon: Icon) => {
    if (icon === 'Image') {
      callBack()
    }
    if (icon === 'ExpandOutline') {
      setIsOpenSizeImage(!isOpenSizeImage)
      setIsOpenZoomImage(false)
    }
    if (icon === 'MaximizeOutline') {
      setIsOpenZoomImage(!isOpenZoomImage)
      setIsOpenSizeImage(false)
    }
    if (isActiveBtn === icon) {
      //Это означает, что пользователь нажал на уже активную кнопку
      setIsActiveBtn(null)
    } else {
      setIsActiveBtn(icon)
    }
  }

  const onMediaLoaded = useCallback((mediaSize: MediaSize) => {
    const { naturalWidth, naturalHeight } = mediaSize
    const originalAspect = naturalWidth / naturalHeight
    setAspect(originalAspect) // Устанавливаем оригинальное соотношение сторон
    setAspectOriginal(originalAspect)
  }, [])
  // const onDownload = () => {
  //   generateDownload(selectedImage, croppedArea)
  // }

  return (
    <>
      <div className={'flex justify-center items-center overflow-hidden'}>
        <Cropper
          image={selectedImage ?? ''}
          aspect={aspect}
          crop={crop}
          onCropChange={setCrop}
          zoom={zoom}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
          onMediaLoaded={onMediaLoaded}
        />
        {isOpenSizeImage && (
          <Size callBack={handleAspectChange} aspect={aspect} aspectOriginal={aspectOriginal} />
        )}
        {/*<button className="absolute top-0 right-0" onClick={onDownload}>*/}
        {/*  SAVE*/}
        {/*</button>*/}
        {isOpenZoomImage && (
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
              // onChange={e => setZoom(Number((e.target as HTMLInputElement).value))}
            />
          </div>
        )}
      </div>
      <div className={'flex mt-auto'}>
        {settingButton.map(btn => {
          const isActive = isActiveBtn === btn.icon
          return (
            <Button
              className={cn(
                'relative flex justify-center items-center max-w-full p-1.5 bg-dark-500 z-10',
                btn.style
              )}
              variant={'secondary'}
              key={btn.icon}
              onClick={() => handleGetImage(btn.icon)}
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
    </>
  )
}

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
// const createImage = url =>
//   new Promise((resolve, reject) => {
//     const image = new Image()
//     image.addEventListener('load', () => resolve(image))
//     image.addEventListener('error', error => reject(error))
//     image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
//     image.src = url
//   })
//
// function getRadianAngle(degreeValue) {
//   return (degreeValue * Math.PI) / 180
// }
//
// export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
//   const image = await createImage(imageSrc)
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')
//
//   const maxSize = Math.max(image.width, image.height)
//   const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))
//
//   // set each dimensions to double largest dimension to allow for a safe area for the
//   // image to rotate in without being clipped by canvas context
//   canvas.width = safeArea
//   canvas.height = safeArea
//
//   // translate canvas context to a central location on image to allow rotating around the center.
//   ctx.translate(safeArea / 2, safeArea / 2)
//   ctx.rotate(getRadianAngle(rotation))
//   ctx.translate(-safeArea / 2, -safeArea / 2)
//
//   // draw rotated image and store data.
//   ctx.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5)
//
//   const data = ctx.getImageData(0, 0, safeArea, safeArea)
//
//   // set canvas width to final desired crop size - this will clear existing context
//   canvas.width = pixelCrop.width
//   canvas.height = pixelCrop.height
//
//   // paste generated rotate image with correct offsets for x,y crop values.
//   ctx.putImageData(
//     data,
//     0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
//     0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
//   )
//
//   // As Base64 string
//   // return canvas.toDataURL("image/jpeg");
//   return canvas
// }
//
// export const generateDownload = async (imageSrc, crop) => {
//   if (!crop || !imageSrc) {
//     return
//   }
//
//   const canvas = await getCroppedImg(imageSrc, crop)
//
//   canvas.toBlob(
//     blob => {
//       const previewUrl = window.URL.createObjectURL(blob)
//
//       const anchor = document.createElement('a')
//       anchor.download = 'image.jpeg'
//       anchor.href = URL.createObjectURL(blob)
//       anchor.click()
//
//       window.URL.revokeObjectURL(previewUrl)
//     },
//     'image/jpeg',
//     0.66
//   )
// }

//-------------------------------------------------------------------------------------
// export const createImage = url =>
//   new Promise((resolve, reject) => {
//     const image = new Image()
//     image.addEventListener('load', () => resolve(image))
//     image.addEventListener('error', error => reject(error))
//     image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
//     image.src = url
//   })
//
// export function getRadianAngle(degreeValue) {
//   return (degreeValue * Math.PI) / 180
// }
//
// /**
//  * Returns the new bounding area of a rotated rectangle.
//  */
// export function rotateSize(width, height, rotation) {
//   const rotRad = getRadianAngle(rotation)
//
//   return {
//     width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
//     height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
//   }
// }
//
// /**
//  * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
//  */
// export default async function getCroppedImg(
//   imageSrc,
//   pixelCrop,
//   rotation = 0,
//   flip = { horizontal: false, vertical: false }
// ) {
//   const image = await createImage(imageSrc)
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')
//
//   if (!ctx) {
//     return null
//   }
//
//   const rotRad = getRadianAngle(rotation)
//
//   // calculate bounding box of the rotated image
//   const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)
//
//   // set canvas size to match the bounding box
//   canvas.width = bBoxWidth
//   canvas.height = bBoxHeight
//
//   // translate canvas context to a central location to allow rotating and flipping around the center
//   ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
//   ctx.rotate(rotRad)
//   ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
//   ctx.translate(-image.width / 2, -image.height / 2)
//
//   // draw rotated image
//   ctx.drawImage(image, 0, 0)
//
//   const croppedCanvas = document.createElement('canvas')
//
//   const croppedCtx = croppedCanvas.getContext('2d')
//
//   if (!croppedCtx) {
//     return null
//   }
//
//   // Set the size of the cropped canvas
//   croppedCanvas.width = pixelCrop.width
//   croppedCanvas.height = pixelCrop.height
//
//   // Draw the cropped image onto the new canvas
//   croppedCtx.drawImage(
//     canvas,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   )
//
//   // As Base64 string
//   // return croppedCanvas.toDataURL('image/jpeg');
//
//   // As a blob
//   return new Promise((resolve, reject) => {
//     croppedCanvas.toBlob(file => {
//       resolve(URL.createObjectURL(file))
//     }, 'image/jpeg')
//   })
// }
