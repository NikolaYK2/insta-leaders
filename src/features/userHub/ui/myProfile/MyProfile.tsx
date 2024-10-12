import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { Page } from '@/common/components/page'
import { Typography } from '@nikolajk2/lib-insta-leaders'

export const MyProfile: NextPageWithLayout = () => {
  return (
    <Page
      titleMeta={'My Profile'}
      descriptionMeta={'View and edit your personal profile information'}
    >
      <h2>My Profile</h2>
      <section className={'flex'}>
        <div className={'border-2 border-cyan-50 max-w-[204px] h-[204px] w-full'}></div>
        <div className={'border-2 border-cyan-50 w-full max-w-[730px]'}>
          <div className={'border-2 border-red-800'}></div>
          <div className={'border-2 border-green-500'}></div>
          <Typography className={'border-2 border-yellow-400'}></Typography>
        </div>
      </section>
      <section></section>
    </Page>
  )
}
