import React from 'react'

import { AddPhotoModal } from './AddPhotoModal'
import { useAvatar } from './useAvatar'

import { PhotoPreview } from './PhotoPreview'

export const AddProfilePhoto = () => {
  const { handleDeletePhoto, image, setImage } = useAvatar()

  return (
    <div className={'flex flex-col items-center gap-6 w-full max-w-xs pt-6'}>
      <PhotoPreview
        image={image}
        size={96}
        onDeletePhoto={handleDeletePhoto}
        preview={'h-192 w-192 object-cover rounded-full'}
      />
      <AddPhotoModal setImage={setImage} />
    </div>
  )
}
