import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

export const CreateNewPassword = () => {
  return (
    <div>
      <HeadersMeta
        title={'Create New Password'}
        description={'Set a new password for your account'}
      />
      <h2>Create New Password</h2>
    </div>
  )
}

CreateNewPassword.getLayout = getLayout
export default CreateNewPassword
