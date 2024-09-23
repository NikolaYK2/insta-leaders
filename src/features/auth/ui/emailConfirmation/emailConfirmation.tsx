import React from 'react'
import { HeadersMeta } from '@/common/components'
import { Button, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import img from '../../../../assets/images/signUp/bro.png'
import Image from 'next/image'
import { NextPageWithLayout } from '@/pages/_app'
import Link from 'next/link'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'
export const EmailConfirmation: NextPageWithLayout = () => {
  return (
    <section className={'flex flex-col items-center justify-center text-center'}>
      <HeadersMeta title={'Email confirmation'} description={'Email confirmation'} />
      <Typography variant={TypographyVariant.h1} className={'mb-5'}>
        Congratulations!
      </Typography>
      <Typography variant={TypographyVariant.regular_text_16} className={'mb-[54px]'}>
        Your email has been confirmed
      </Typography>
      <Button asChild className={'w-[182px] mb-[72px] hover:text-light-100'}>
        <Link href={ROUTES_AUTH.LOGIN}>Sign In</Link>
      </Button>
      <Image src={img} alt={'Email confirmed'} width={432} height={300} />
    </section>
  )
}
