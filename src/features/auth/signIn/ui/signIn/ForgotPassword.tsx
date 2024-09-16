import { Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'

export const ForgotPassword = () => {
  return (
    <Link href={'/forgotPassword'}>
      <Typography
        className={'text-light-900 mt-9 mb-6 text-right'}
        variant={TypographyVariant.regular_text_14}
      >
        Forgot Password
      </Typography>
    </Link>
  )
}
