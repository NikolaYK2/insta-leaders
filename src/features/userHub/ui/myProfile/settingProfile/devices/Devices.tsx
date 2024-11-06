import React, { useEffect } from 'react'
import { Page } from '@/common/components/page'

import { NextPageWithLayout } from '@/pages/_app'

import { cn } from '@/common/utils/cn'
import { Card, DynamicIcon, Typography, TypographyVariant } from '@nikolajk2/lib-insta-leaders'

export const Devices: NextPageWithLayout = () => {
  return (
    <Page titleMeta={'Devices'} descriptionMeta={'devices'} className={'pt-0'}>
      <section className={'flex justify-between flex-wrap mt-[3.04%]'}>
        <Typography variant={TypographyVariant.h3} className="text-light-100">
          Current device
        </Typography>
        <Card>
          <DynamicIcon iconId="GoogleSvgrepoCom1" width={36} height={36} />
          <Typography variant={TypographyVariant.bold_text_16} className="text-light-100">
            Google
          </Typography>
          <Typography variant={TypographyVariant.regular_text_14} className="text-light-100">
            IP: 22.345.345.12
          </Typography>
        </Card>
      </section>
    </Page>
  )
}
