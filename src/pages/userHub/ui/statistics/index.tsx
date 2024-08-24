import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

const Favorites = () => {
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

Favorites.getLayout = getLayout
export default Favorites
