import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

const MyProfile = () => {
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

MyProfile.getLayout = getLayout
export default MyProfile
