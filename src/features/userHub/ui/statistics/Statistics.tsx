import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

export const Statistics: NextPageWithLayout = () => {
  return (
    <div>
      <HeadersMeta title={'Statistics'} description={'View and analyze your account statistics'} />
      <h2>Statistics</h2>
    </div>
  )
}
