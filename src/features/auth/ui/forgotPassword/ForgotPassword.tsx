import React from 'react'
import { H1Title, HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'
import { Card, TextField, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'

export const ForgotPassword: NextPageWithLayout = () => {
  return (
    <div className={'flex justify-center'}>
      <HeadersMeta
        title={'Forgot Password'}
        description={'Reset your password if you have forgotten it'}
      />
      <h2 className={'mb-10'}>Forgot Password</h2>
      <Card className={'!w-378 flex flex-col items-center'}>
        <H1Title className={'mt-[23px]'}>Forgot Password</H1Title>
        <TextField className={'mt-[37px] !w-330'} label={'Email'}></TextField>
        <div>content</div>
        <div>content</div>
      </Card>
    </div>
  )
}
