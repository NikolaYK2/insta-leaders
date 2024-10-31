import { ChangeEvent, useRef, useState } from 'react'
import { useProfilePhoto } from './AddPhotoHooks'

export function prepareImageForUpload(dataUrl: string, fieldName: string = 'file'): FormData {
  // Create FormData
  const formData = new FormData()

  // Get MIME type from Data URL
  const mimeType = dataUrl.split(';')[0].split(':')[1] // For example, 'image/jpeg' or 'image/png'

  // Get binary data from Data URL
  const base64 = dataUrl.split(',')[1]
  const byteCharacters = atob(base64)
  const byteNumbers = new Array(byteCharacters.length)

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }

  // Create Blob from binary data
  const byteArray = new Uint8Array(byteNumbers)
  const blob = new Blob([byteArray], { type: mimeType })

  // Append Blob to FormData
  formData.append(fieldName, blob, `avatar.${mimeType.split('/')[1]}`) // The file name will be 'avatar.jpg' or 'avatar.png'

  return formData
}

type UseModalAddPhotoProps = {
  setImage: (image: null | string) => void
}

export const useModalAddPhoto = ({ setImage }: UseModalAddPhotoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<null | string>(null)
  const [selectedImage, setSelectedImage] = useState<null | string>(null)
  const [isSaved, setIsSaved] = useState(false)
  const MAX_FILE_SIZE = 1 * 1024 * 1024 // 10MB in bytes
  const ALLOWED_FORMATS = ['image/jpeg', 'image/png']

  const reset = () => {
    setSelectedImage(null)
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
        setSelectedImage(null)

        return
      }

      if (file.size > MAX_FILE_SIZE) {
        setError('Photo size must be less than 10 MB!')
        setSelectedImage(null)

        return
      }

      const reader = new FileReader()

      reader.onload = e => {
        setSelectedImage(e.target?.result as string)
        setError(null)
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
      console.log('save')
    }
  }

  return {
    error,
    fileInputRef,
    handleClick,
    handleFileChange,
    handleSave,
    isSaved,
    selectedImage,
    reset,
  }
}
