import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

const Search = () => {
  return (
    <div>
      <HeadersMeta
        title={'Search'}
        description={'Search for content, users, or items within the platform'}
      />
      <h2>Search</h2>
    </div>
  )
}

Search.getLayout = getLayout
export default Search
