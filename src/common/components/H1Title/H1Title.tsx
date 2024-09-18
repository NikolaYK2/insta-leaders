import React, { ReactNode } from 'react'
import { Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'
import { cn } from '@/common/utils/cn'

type H1TitleProps = {
  children: ReactNode
  className?: string
}
export const H1Title = ({ children, className }: H1TitleProps) => {
  return (
    <Typography variant={TypographyVariant.h1} asChild className={cn('text-light-100', className)}>
      <h2>{children}</h2>
    </Typography>
  )
}
