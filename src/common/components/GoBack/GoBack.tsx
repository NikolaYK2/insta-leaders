import React from 'react'
import { Button, DynamicIcon, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'
import { cn } from '@/common/utils/cn'

type GoBackProps = {
  backToTitle?: string
  backToRedirect: string
}
export const GoBack = ({ backToRedirect, backToTitle }: GoBackProps) => {
  return (
    <Button variant={'text'} asChild className={cn('!p-0 !text-light-100')}>
      <Link href={backToRedirect}>
        <DynamicIcon iconId={'ArrowBackOutline'} width={24} height={24} />
        <Typography variant={TypographyVariant.regular_text_14}>
          Back to <span className={'capitalize'}>{backToTitle}</span>
        </Typography>
      </Link>
    </Button>
  )
}
