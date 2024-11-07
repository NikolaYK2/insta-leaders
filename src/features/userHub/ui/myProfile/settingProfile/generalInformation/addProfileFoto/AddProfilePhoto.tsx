import React from 'react'

import { AddPhotoModal } from './AddPhotoModal'
import { useAvatar } from './useAvatar'

import { PhotoPreview } from './PhotoPreview'
import { usePhotoPreview } from '@/features/userHub/ui/myProfile/settingProfile/generalInformation/addProfileFoto/usePhotoPreview'

export const AddProfilePhoto = () => {
  const { handleDeletePhoto, image, setImage } = useAvatar()
  const { handleConfirmation } = usePhotoPreview(handleDeletePhoto)

  return (
    <div className={'flex flex-col items-center gap-6 w-full max-w-xs pt-6'}>
      <PhotoPreview
        image={image}
        size={96}
        callback={handleConfirmation}
        styleImage={'object-cover rounded-full'}
        styleClose={'shadow-[0px_0px_0px_4px_black] right-3'}
      />
      <AddPhotoModal setImage={setImage} />
    </div>
  )
}
