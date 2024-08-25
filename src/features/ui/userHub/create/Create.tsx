import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

export const Create: NextPageWithLayout = () => {
  return (
    <div>
      <HeadersMeta title={'Create'} description={'Create new content or items in your account'} />
      <h2>Create</h2>
    </div>
  )
}
