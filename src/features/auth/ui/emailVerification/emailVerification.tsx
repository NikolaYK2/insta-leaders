import React from 'react'
import { Button, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import img from '../../../../assets/images/signUp/rafiki.png'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'
import Image from 'next/image'

export const EmailVerification: NextPageWithLayout = () => {
  return (
    <section className={'flex flex-col items-center justify-center text-center'}>
      <HeadersMeta title={'Email verification'} description={'Email verification link expired'} />
      <div className={'w-[300px]'}>
        <Typography variant={TypographyVariant.h1} className={'mb-5'}>
          Email verification link expired
        </Typography>
        <Typography variant={TypographyVariant.regular_text_16}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </Typography>
        <Button className={'mt-7 mb-7'}>Resend verification link</Button>
      </div>
      <Image src={img} alt="EmailVerification" width={473} height={532} />
    </section>
  )
}
