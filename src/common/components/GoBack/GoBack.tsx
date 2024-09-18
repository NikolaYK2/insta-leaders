import React from 'react'
import { Button, DynamicIcon, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'

type GoBackProps = {
  backToTitle?: string
  backToRedirect: string
}
export const GoBack = ({ backToRedirect, backToTitle }: GoBackProps) => {
  return (
    <Button variant={'text'} asChild className={'text-amber-50'}>
      <Link href={backToRedirect}>
        <DynamicIcon
          iconId={'ArrowBackOutline'}
          width={24}
          height={24}
          className={'text-amber-50'}
        />
        <Typography variant={TypographyVariant.regular_text_14} className={'text-amber-50'}>
          Back to {' ' + backToTitle}
        </Typography>
      </Link>
    </Button>
  )
}
