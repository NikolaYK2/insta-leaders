import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { Page } from '@/common/components/page'
import { Typography, Button, TypographyVariant } from '@nikolajk2/lib-insta-leaders'

export const MyProfile: NextPageWithLayout = () => {
  return (
    <Page
      titleMeta={'My Profile'}
      descriptionMeta={'View and edit your personal profile information'}
    >
      <section className={'flex justify-between h-[204px] mb-12'}>
        <div className={'border-2 border-cyan-50 max-w-[204px] w-full'}>
          <div className={'w-full h-full border-2 border-red-800 rounded-full'}></div>
        </div>
        <div className={'border-2 border-cyan-50 w-full max-w-[730px]'}>
          <div className={'flex justify-between items-center border-2 border-red-800 mb-5'}>
            <Typography>URLProfile</Typography>
            <Button variant={'secondary'}>
              <Typography variant={TypographyVariant.h3}>Profile Settings</Typography>
            </Button>
          </div>

          <div className={'flex flex-row border-2 border-green-500 mb-7'}>
            <div className={'border-2 border-red-800 max-w-[159px] w-full mr-1'}>
              <Typography variant={TypographyVariant.bold_text_14}>2000</Typography>
              <Typography variant={TypographyVariant.regular_text_14}>bla bla</Typography>
            </div>
            <div className={'border-2 border-red-800 max-w-[139px] w-full mr-1'}>
              <Typography variant={TypographyVariant.bold_text_14}>2000</Typography>
              <Typography variant={TypographyVariant.regular_text_14}>bla bla</Typography>
            </div>
            <div className={'border-2 border-red-800'}>
              <Typography variant={TypographyVariant.bold_text_14}>2000</Typography>
              <Typography variant={TypographyVariant.regular_text_14}>bla bla</Typography>
            </div>
          </div>
          <Typography
            variant={TypographyVariant.regular_text_16}
            className={'border-2 border-yellow-400'}
          >
            bla bla bla bla
            <Typography
              asChild
              variant={TypographyVariant.regular_link}
              className={'cursor-pointer'}
            >
              <span>span span span</span>
            </Typography>
          </Typography>
        </div>
      </section>
      <section className={'border-2 border-red-800'}>items</section>
    </Page>
  )
}
