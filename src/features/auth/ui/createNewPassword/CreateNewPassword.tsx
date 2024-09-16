import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

export const CreateNewPassword: NextPageWithLayout = () => {
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
