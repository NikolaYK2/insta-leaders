import { Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'

export const ToForgotPassword = () => {
  return (
    <Link href={ROUTES_AUTH.FORGOT_PASSWORD} className={'flex justify-end'}>
      <Typography
        className={'text-light-900 hover:text-light-100 mt-9 mb-6'}
        variant={TypographyVariant.regular_text_14}
      >
        Forgot Password
      </Typography>
    </Link>
  )
}
