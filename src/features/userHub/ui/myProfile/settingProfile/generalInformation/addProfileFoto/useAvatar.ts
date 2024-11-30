import { useEffect, useState } from 'react'
import { prepareImageForUpload } from './prepareImageForUpload'
import {
  useGetAvatarQuery,
  useUploadAvatarMutation,
} from '@/features/userHub/api/profile/profileService'

export const useAvatar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { data: avatarData, isLoading } = useGetAvatarQuery()

  const [uploadAvatar] = useUploadAvatarMutation()

  const [image, setImage] = useState<null | string>(
    avatarData?.data.avatarUrl && avatarData.data.avatarUrl.length > 0
      ? avatarData.data.avatarUrl
      : null
  )

  useEffect(() => {
    if (avatarData?.data.avatarUrl) {
      setImage(avatarData.data.avatarUrl)
    }
  }, [avatarData])

  const handleSubmit = async (selectedImage: string | null) => {
    setIsSubmitting(true)
    try {
      if (selectedImage && selectedImage !== avatarData?.data.avatarUrl) {
        const formData = prepareImageForUpload(selectedImage, 'avatarFile')
        await uploadAvatar(formData).unwrap()
        console.log('submit')
      }
    } catch (error) {
      console.log('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePhoto = () => {
    setImage(null)
  }

  return {
    handleDeletePhoto,
    image,
    isLoading,
    isSubmitting,
    handleSubmit,
    setImage,
    isOpen,
  }
}
