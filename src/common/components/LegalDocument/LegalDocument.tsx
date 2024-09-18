import React from 'react'
import { H1Title } from '@/common/components/H1Title/H1Title'
import { Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'

type LegalDocumentProps = {
  title: string
  description: string
}
export const LegalDocument = ({ title, description }: LegalDocumentProps) => {
  return (
    <div>
      <H1Title title={title} />
      <Typography
        variant={TypographyVariant.regular_text_14}
        className={'text-center max-w-[958px]'}
      >
        {description}
      </Typography>
    </div>
  )
}
