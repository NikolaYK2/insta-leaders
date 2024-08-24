import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

const Create = () => {
  return (
    <div>
      <HeadersMeta title={'Create'} description={'Create new content or items in your account'} />
      <h2>Create</h2>
    </div>
  )
}

Create.getLayout = getLayout
export default Create
