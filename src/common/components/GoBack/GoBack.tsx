import React from 'react'
import { Button, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'

type GoBackProps = {
  backToTitle?: string
  backToRedirect: string
}
export const GoBack = ({ backToRedirect, backToTitle }: GoBackProps) => {
  return (
    <Button variant={'primary'}>
      <Link href={backToRedirect}>
        <Typography variant={TypographyVariant.regular_text_14}>
          Back to {' ' + backToTitle}
        </Typography>
      </Link>
    </Button>
  )
}
