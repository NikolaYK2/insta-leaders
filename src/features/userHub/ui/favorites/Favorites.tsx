import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

export const Favorites: NextPageWithLayout = () => {
  return (
    <div>
      <HeadersMeta
        title={'Favorites'}
        description={'View and manage your favorite items or content'}
      />
      <h2>Favorites</h2>
    </div>
  )
}
