import { ChangeEvent, useEffect, useRef, useState } from 'react'

export function prepareImageForUpload(dataUrl: string, fieldName: string = 'file'): FormData {
  // Create FormData
  const formData = new FormData()

  // Get MIME type from Data URL
  const mimeType = dataUrl.split(';')[0].split(':')[1] // For example, 'image/jpeg' or 'image/png'

  // Get binary data from Data URL
  const base64 = dataUrl.split(',')[1]
  const binaryString = atob(base64)

  // Create Blob from binary data
  const blob = new Blob(
    [new Uint8Array(binaryString.length).map((_, i) => binaryString.charCodeAt(i))],
    { type: mimeType }
  )

  // Append Blob to FormData
  formData.append(fieldName, blob, `avatar.${mimeType.split('/')[1]}`) // The file name will be 'avatar.jpg' or 'avatar.png'

  return formData
}

export type SelectedImages = {
  id: string
  image: string
}
type UseModalAddPhotoProps = {
  isOpen: boolean
  setImage: (image: null | string) => void
}

export const useModalAddPhoto = ({ isOpen, setImage }: UseModalAddPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<null | string>(null)
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const [selectedImages, setSelectedImages] = useState<SelectedImages[]>([])
  const [isSaved, setIsSaved] = useState(false)
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB in bytes
  const ALLOWED_FORMATS = ['image/jpeg', 'image/png']

  const reset = () => {
    setSelectedImage(null)
    setSelectedImages([])
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
        // Генерируем уникальный ключ для нового изображения
        const newImages = {
          id: Date.now().toString(), // Генерируем уникальный ID для каждого изображения
          image: newImage,
        }

        setSelectedImage(newImage)

        // Обновляем состояние, добавляя новое изображение
        if (selectedImages.length < 3) {
          setSelectedImages(prevImages => [...prevImages, newImages])
        } else {
          setError('maximum 10 photos!')
        }
      }

      reader.readAsDataURL(file)
    }
    event.target.value = ''
  }

  const handleSave = () => {
    if (selectedImage) {
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
  }, 3000)

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
    selectedImages,
    setSelectedImages,
    reset,
  }
}
