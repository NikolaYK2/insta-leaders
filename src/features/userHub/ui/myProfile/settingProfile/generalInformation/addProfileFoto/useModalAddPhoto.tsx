import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '@/appRoot/lib/hooks/hooksStore'
import { PayloadAction } from '@reduxjs/toolkit'
import { hiddenAlert, showAlert } from '@/appRoot/app.slice'

type SelectedImages = {
  id: string
  image: string
}
type UseModalAddPhotoProps = {
  setImage?: (image: null | string) => void
  photoLimit?: number
  photosLength?: number
  errorMessage?: string
  localError?: string | null
  setActionForImages?: (payload: SelectedImages) => PayloadAction<SelectedImages>
  deleteActionForImages?: () => PayloadAction<void>
}

export const useModalAddPhoto = ({
  setImage,
  photoLimit,
  photosLength,
  errorMessage = '',
  localError = null,
  setActionForImages,
  deleteActionForImages,
}: UseModalAddPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<null | string>(localError)
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const [isSaved, setIsSaved] = useState(false)
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const dispatch = useAppDispatch()

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes
  const ALLOWED_FORMATS = ['image/jpeg', 'image/png']

  const reset = () => {
    setSelectedImage(null)
    if (deleteActionForImages) dispatch(deleteActionForImages())
    // dispatch(actionsCreate.deleteImages())
    setError(null)
    setIsSaved(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      if (!ALLOWED_FORMATS.includes(file.type)) {
        setError('The format of the uploaded photo must be PNG and JPEG')
        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('Photo size must be less than 10 MB!')
        return
      }

      const reader = new FileReader()

      reader.onload = e => {
        const newImage = e.target?.result as string
        setSelectedImage(newImage)

        // Генерируем уникальный ключ для нового изображения
        const newImages = {
          id: Date.now().toString(), // Генерируем уникальный ID для каждого изображения
          image: newImage,
        }

        // Обновляем состояние, добавляя новое изображение
        if (photosLength && photoLimit) {
          if (photosLength >= photoLimit) {
            dispatch(showAlert({ message: errorMessage ?? '', variant: 'alertError' }))
          } else if (setActionForImages) {
            dispatch(setActionForImages(newImages))
          }
        } else if (setActionForImages) {
          dispatch(setActionForImages(newImages))
        }
      }

      reader.readAsDataURL(file)
    }
    event.target.value = ''
  }

  const handleSave = () => {
    if (selectedImage && setImage) {
      setImage(selectedImage)
      setError(null)
      setIsSaved(true)
    }
  }
  // Очищаем предыдущий таймер, если он есть
  if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current)

  // Устанавливаем новый таймер для сброса ошибки
  errorTimeoutRef.current = setTimeout(() => {
    setError(null)
    dispatch(hiddenAlert())
  }, 5000)

  useEffect(() => {
    // Очистка таймера при размонтировании компонента
    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current)
    }
  }, [])

  return {
    error,
    setError,
    fileInputRef,
    handleClick,
    handleFileChange,
    handleSave,
    isSaved,
    selectedImage,
    reset,
  }
}
