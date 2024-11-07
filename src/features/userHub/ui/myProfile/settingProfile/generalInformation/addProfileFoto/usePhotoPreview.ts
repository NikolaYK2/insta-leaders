import { useDeleteAvatarMutation } from '@/features/userHub/api/user/userService'
import { useState } from 'react'

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
