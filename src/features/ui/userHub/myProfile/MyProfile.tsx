import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

export const MyProfile: NextPageWithLayout = () => {
  return (
    <div>
      <HeadersMeta
        title={'My Profile'}
        description={'View and edit your personal profile information'}
      />
      <h2>My Profile</h2>
    </div>
  )
}
