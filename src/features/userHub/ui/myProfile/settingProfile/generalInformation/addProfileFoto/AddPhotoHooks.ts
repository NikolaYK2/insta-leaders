import {
  useDeleteAvatarMutation,
  useGetAvatarQuery,
  useUploadAvatarMutation,
} from '@/features/userHub/api/user/userService'
import { useEffect, useState } from 'react'
import { prepareImageForUpload } from './Images'

export const useProfilePhoto = () => {
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

export const usePhotoPreview = (onDeletePhoto?: () => void) => {
  const [isOpen, setIsOpen] = useState(false)
  const [deleteAvatar] = useDeleteAvatarMutation()

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleConfirmation = async () => {
    try {
      await deleteAvatar().unwrap()
      setIsOpen(false)
      onDeletePhoto?.()
      // need to use Alert
      console.log('Photo deleted successfully')
    } catch (error: unknown) {
      console.log('Failed to delete photo')
    }
  }

  return {
    handleConfirmation,
    handleOpenModal,
    isOpen,
  }
}
