import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { Page } from '@/common/components/page'

export const MyProfile: NextPageWithLayout = () => {
  return (
    <Page
      titleMeta={'My Profile'}
      descriptionMeta={'View and edit your personal profile information'}
    >
      <h2>My Profile</h2>
    </Page>
  )
}
