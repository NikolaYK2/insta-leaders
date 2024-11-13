import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '@/appRoot/lib/hooks/hooksStore'
import {
  selectorIndexCropImage,
  selectorSelectedImages,
} from '@/features/userHub/model/createSlice/createSelectors'
import { setCroppedImage } from '@/features/userHub/model/createSlice'
import { Canvas, FabricImage, filters } from 'fabric'
import { CarouselBtn } from '@/features/userHub/ui/create/carouselBtn'

export const Filters = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('') // Состояние фильтра
  const images = useAppSelector(selectorSelectedImages)
  const indexImage = useAppSelector(selectorIndexCropImage)
  const dispatch = useAppDispatch()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<Canvas | null>(null)
  const originalImageRef = useRef<string | null>(null) // Ссылка на оригинальное изображение

  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      // Инициализируем холст только один раз
      fabricCanvasRef.current = new Canvas(canvasRef.current)
    }

    // Очищаем холст при размонтировании
    return () => {
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose()
        fabricCanvasRef.current = null
      }
    }
  }, [])

  const applyFilter = (filterName: string) => {
    const img = new window.Image()
    img.src = images[indexImage]?.image ?? ''
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const fabricCanvas = fabricCanvasRef.current
      if (fabricCanvas) {
        // Очищаем холст перед добавлением нового изображения
        fabricCanvas.clear()

        // Устанавливаем размер холста под размер изображения
        fabricCanvas.setWidth(img.width)
        fabricCanvas.setHeight(img.height)

        const fabricImage = new FabricImage(img)
        // Масштабируем изображение
        fabricImage.scaleToWidth(fabricCanvas.getWidth())
        fabricImage.scaleToHeight(fabricCanvas.getHeight())

        // Очищаем массив фильтров перед добавлением новых
        fabricImage.filters = []
        // Применяем фильтр в зависимости от выбора
        switch (filterName) {
          case 'grayscale':
            fabricImage.filters.push(new filters.Grayscale())
            break
          case 'sepia':
            fabricImage.filters.push(new filters.Sepia())
            break
          // Дополнительные фильтры при необходимости
          case 'normal':
            fabricImage.filters.push(new filters.Blur())
            // Не добавляем фильтры, оставляем изображение без изменений
            break
        }

        fabricImage.applyFilters()

        // Масштабируем снова, чтобы исправить возможные изменения после фильтра
        fabricImage.scaleToWidth(fabricCanvas.getWidth())
        fabricImage.scaleToHeight(fabricCanvas.getHeight())

        fabricCanvas.add(fabricImage)

        // Преобразование в URL и отправка в Redux
        const url = fabricCanvas.toDataURL({
          format: 'jpeg',
          quality: 1,
          multiplier: 1,
        })

        dispatch(setCroppedImage({ url }))
      }
    }
  }

  return (
    <div className="flex flex-wrap">
      <div className="relative flex flex-[0_1_50%] max-w-[490px] max-h-[503px]">
        <Image
          className="flex object-contain"
          src={images[indexImage].image}
          alt="image"
          width={490}
          height={503}
        />
        <canvas ref={canvasRef} width={490} height={503} className="hidden" />

        <CarouselBtn arrayItems={images} indexItems={indexImage} />
      </div>
      <div className="flex relative flex-[1_1_50%] max-w-[490px] max-h-[503px]">
        {/* Элементы управления для выбора фильтров */}
        <button onClick={() => applyFilter('normal')}>Normal</button>
        <button onClick={() => applyFilter('grayscale')}>Grayscale</button>
        <button onClick={() => applyFilter('sepia')}>Sepia</button>
        {/* Добавьте дополнительные кнопки для других фильтров */}
      </div>
    </div>
  )
}
