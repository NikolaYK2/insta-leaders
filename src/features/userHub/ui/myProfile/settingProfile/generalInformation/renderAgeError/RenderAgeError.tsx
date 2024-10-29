import { Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'
import { ROUTES_AUTH } from '@/appRoot/routes/routes'
import React from 'react'

type Props = {
  age: number
}
const RenderAgeError = ({ age }: Props) => {
  return (
    <div className="flex">
      <Typography variant={TypographyVariant.small_text}>
        A user under {age} cannot create a profile.
      </Typography>
      <Typography className="text-danger-500 ml-1" variant={TypographyVariant.small_link}>
        <Link href={{ pathname: ROUTES_AUTH.PRIVACY_POLICY, query: { from: 'profile' } }}>
          Privacy Policy
        </Link>
      </Typography>
    </div>
  )
}

export const renderError = (age: number | null) => {
  return age !== null && age < 13 ? <RenderAgeError age={13} /> : null
}
