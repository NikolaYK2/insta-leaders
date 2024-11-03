import React, { ChangeEvent, forwardRef, useCallback, useState } from 'react'
import { Button, DynamicIcon, Slider } from '@nikolajk2/lib-insta-leaders'
import Cropper, { Area, MediaSize } from 'react-easy-crop'
import { CroppingSettingSize } from '@/features/userHub/ui/create'
import { CroppingSettingBtn } from '@/features/userHub/ui/create/cropping/CroppingSettingBtn'
import { ImageUploader } from '@/common/components/imageUpLoader'
import { SelectedImages } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/Images'
import Image from 'next/image'

export type IconBtnCropping = 'ExpandOutline' | 'MaximizeOutline' | 'Image'

type Props = {
  callBack: () => void
  selectedImages: SelectedImages[]
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export const Cropping = forwardRef<HTMLInputElement, Props>(
  ({ callBack, selectedImages, handleFileChange }, ref) => {
    console.log('render!!!')
    const [activeButton, setActiveButton] = useState<IconBtnCropping | null>(null)
    const [imageCrop, setImageCrop] = useState(selectedImages[0].image)
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
    const handleGetImage = (icon: IconBtnCropping) => {
      if (icon === 'Image') {
        callBack()
      } else {
        setActiveButton(prev => (prev === icon ? null : icon))
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
            image={imageCrop ?? ''}
            aspect={aspect}
            crop={crop}
            onCropChange={setCrop}
            zoom={zoom}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            onMediaLoaded={onMediaLoaded}
          />
          {activeButton === 'ExpandOutline' && ( //size
            <CroppingSettingSize
              callBack={handleAspectChange}
              aspect={aspect}
              aspectOriginal={aspectOriginal}
            />
          )}
          {/*<button className="absolute top-0 right-0" onClick={onDownload}>*/}
          {/*  SAVE*/}
          {/*</button>*/}
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
                // onChange={e => setZoom(Number((e.target as HTMLInputElement).value))}
              />
            </div>
          )}

          <div className={'absolute bottom-[60px] right-3 bg-dark-500/40'}>
            {/*<span>{error}</span>*/}
            <div className={'flex flex-wrap'}>
              {selectedImages.map(img => (
                <Image
                  className={'max-w-20 object-contain m-2'}
                  key={img.id}
                  src={img.image}
                  alt={'img'}
                  width={82}
                  height={82}
                  onClick={e => {
                    setImageCrop(img.image)
                  }}
                />
              ))}
            </div>
            <Button className={'p-0 text-light-100'} variant={'text'} onClick={callBack}>
              <DynamicIcon iconId={'PlusCircleOutline'} width={30} height={30} />
              <ImageUploader handleFileChange={handleFileChange} ref={ref} />
            </Button>
          </div>
        </div>

        {/*//КНОПКИ*/}
        <CroppingSettingBtn handleGetImage={handleGetImage} />
      </>
    )
  }
)
Cropping.displayName = 'Cropping'
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
