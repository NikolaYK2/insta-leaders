import React from 'react'
import { NextPageWithLayout } from '@/pages/_app'
import { CounterSlot } from '@/common/components/counterSlot'
import { Page } from '@/common/components/page'

export const PublicHome: NextPageWithLayout = () => {
  return (
    <Page titleMeta={'Home public'} descriptionMeta={'Explore the public section of our platform.'}>
      <CounterSlot />
    </Page>
  )
}
