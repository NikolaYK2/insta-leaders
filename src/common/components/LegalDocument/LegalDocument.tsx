import React, { Fragment } from 'react'
import { H1Title } from '@/common/components/H1Title/H1Title'
import { Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'

type LegalDocumentProps = {
  title: string
  description: string //для абзацов с красной строки нужно ставить перед ними символ \n
}
export const LegalDocument = ({ title, description }: LegalDocumentProps) => {
  return (
    <div className={'flex flex-col justify-center items-center w-full mt-[1.917%]'}>
      <H1Title title={title} className={'mb-[1.667%]'} />
      <Typography
        variant={TypographyVariant.regular_text_14}
        className={'text-center max-w-[958px] '}
      >
        {description.split('\n').map((line, i) => (
          <Fragment key={i}>
            {line}
            <br />
          </Fragment>
        ))}
      </Typography>
    </div>
  )
}
