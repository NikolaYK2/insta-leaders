import React, { useEffect } from 'react'
import { HeadersMeta } from '@/common/components'
import { Button, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import img from '../../../../assets/images/signUp/bro.png'
import Image from 'next/image'
import { NextPageWithLayout } from '@/pages/_app'
import Link from 'next/link'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'
import { useRouter } from 'next/router'
import { useConfirmEmailMutation } from '@/features/auth/api/authService'

export const EmailConfirmation: NextPageWithLayout = () => {
  const router = useRouter()
  const { code } = router.query
  // const code = '389d6303-65e6-4c39-9849-9aad10eb8f04'
  const [confirmEmail, { isError, isLoading, isSuccess }] = useConfirmEmailMutation()

  useEffect(() => {
    if (code) {
      confirmEmail(code as string)
      return
    }
    router.push(ROUTES_AUTH.EMAIL_VERIFICATION)
  }, [code, confirmEmail])

  if (isError) {
    router.push(ROUTES_AUTH.EMAIL_VERIFICATION)
    return null
  }
  if (isLoading) {
    return <h1>LOADING....</h1>
  }

  if (isSuccess) {
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
}
