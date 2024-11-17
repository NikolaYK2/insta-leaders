import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import {
  selectorIndexCropImage,
  selectorSelectedImages,
} from '@/features/userHub/model/createSlice/createSelectors'
import { setCroppedImage } from '@/features/userHub/model/createSlice'
import { Canvas } from 'fabric'
import { indexDBUtils } from '@/common/utils'
import { CarouselBtn } from '@/features/userHub/ui/create/ui/carouselBtn'
import { getFilteredThumbnail } from '@/features/userHub/ui/create/lib/getFilteredThumbnail'
import { Button } from '@nikolajk2/lib-insta-leaders'
import { useDebounce } from '@/common/hooks'
import { ImageForCreate } from '@/features/userHub/ui/create/ui/image/ImageForCreate'
import {
  CreatePrimitiveContent,
  CreatePrimitiveRoot,
} from '@/features/userHub/ui/create/ui/primitives'
import { showAlert } from '@/appRoot/app.slice'

const filterNames = [
  'normal',
  'grayscale',
  'sepia',
  'vintage',
  'polaroid',
  'blackwhite',
  'brightness',
  'contrast',
  'saturation',
]

export const Filters = () => {
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({})
  const [originalImageBlob, setOriginalImageBlob] = useState<Blob | null>(null) //оригинальное изображения для сброса фильтров
  const [isLoading, setIsLoading] = useState<boolean>(true) // Состояние загрузки миниатюр

  const images = useAppSelector(selectorSelectedImages)
  const indexImage = useAppSelector(selectorIndexCropImage)
  const dispatch = useAppDispatch()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<Canvas | null>(null)

  /**
   * Generates thumbnails for all filters.
   */
  const generateThumbnails = async () => {
    const fabricCanvas = fabricCanvasRef.current

    if (!fabricCanvas || !originalImageBlob) return
    setIsLoading(true)

    // Загружаем оригинальное изображение
    const originalImgSrc = URL.createObjectURL(originalImageBlob) // Создаем URL из Blob

    const generatedThumbnails = await Promise.all(
      filterNames.map(async filterName => {
        const quality = filterName === 'normal' ? 1 : 0.5
        const multiplier = filterName === 'normal' ? 1 : 0.2

        const thumbnail = await getFilteredThumbnail({
          fabricCanvas,
          imgSrc: originalImgSrc,
          filterName,
          quality,
          multiplier,
        })

        return { filterName, thumbnail }
      })
    )

    const thumbnailsMap = generatedThumbnails.reduce(
      (acc, { filterName, thumbnail }) => {
        if (thumbnail) acc[filterName] = thumbnail
        return acc
      },
      {} as Record<string, string>
    )

    setThumbnails(thumbnailsMap)
    setIsLoading(false)
  }

  /**
   * Applies a selected filter to the current image.
   */
  const applyFilter = useCallback(
    async (filterName: string) => {
      const fabricCanvas = fabricCanvasRef.current

      if (!fabricCanvas || !originalImageBlob) return

      const originalImgSrc = URL.createObjectURL(originalImageBlob)

      if (filterName === 'normal') {
        dispatch(setCroppedImage({ url: originalImgSrc }))
        return
      }

      const url = await getFilteredThumbnail({
        fabricCanvas,
        imgSrc: originalImgSrc,
        filterName,
        quality: 1,
        multiplier: 1,
      })

      if (url) {
        dispatch(setCroppedImage({ url }))
      }
    },
    [originalImageBlob, dispatch]
  )
  /**
   * Извлекает исходное изображение из IndexedDB и обновляет состояние.
   */
  const fetchOriginalImage = async () => {
    setIsLoading(true) // Устанавливаем загрузку в true при смене изображения

    const image = await indexDBUtils.getImageById(images[indexImage]?.id)
    if (image?.image) {
      setOriginalImageBlob(image.image) // Сохраняем оригинальное изображение в состояние
    }
  }
  // Load the original image when indexImage changes
  useEffect(() => {
    fetchOriginalImage().catch(error => {
      console.error(error)
      dispatch(showAlert({ message: 'изображения не загружены', variant: 'alertError' }))
    })
  }, [indexImage])

  const debouncedOriginalImageBlob = useDebounce(originalImageBlob, 1000)

  // Генерация миниатюр при изменении оригинального изображения
  useEffect(() => {
    if (debouncedOriginalImageBlob && fabricCanvasRef.current) {
      generateThumbnails().catch(error => {
        dispatch(
          showAlert({ message: 'генерация миниатюр прошла с ошибкой!', variant: 'alertError' })
        )
        console.error(error)
      })
    }
  }, [debouncedOriginalImageBlob, fabricCanvasRef.current])

  // Инициализация холста
  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new Canvas(canvasRef.current)
    }

    return () => {
      fabricCanvasRef.current?.dispose()
      fabricCanvasRef.current = null
    }
  }, [])

  return (
    <CreatePrimitiveRoot>
      <CreatePrimitiveContent>
        <ImageForCreate images={images} indexImage={indexImage} />
        <canvas ref={canvasRef} width={490} height={503} className="hidden" />
        <CarouselBtn arrayItems={images} indexItems={indexImage} />
      </CreatePrimitiveContent>
      <CreatePrimitiveContent>
        {/* Элементы управления для выбора фильтров */}
        <div className="flex flex-wrap w-full justify-between">
          {isLoading ? (
            <div className="flex w-full h-full items-center justify-center">
              <p>Loading thumbnails...</p> {/* Здесь можно использовать спиннер */}
            </div>
          ) : (
            filterNames.map(filterName => (
              <Button
                className={'flex flex-col flex-[0_1_33%] p-0 text-light-100'}
                variant={'text'}
                key={filterName}
                onClick={() => applyFilter(filterName)}
              >
                <Image
                  src={thumbnails[filterName]}
                  alt={`${filterName} preview`}
                  className="w-[108px] h-[108px] object-cover"
                  width={108}
                  height={108}
                />
                {filterName}
              </Button>
            ))
          )}
        </div>
      </CreatePrimitiveContent>
    </CreatePrimitiveRoot>
  )
}
