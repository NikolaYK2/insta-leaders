import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

const Messenger = () => {
  return (
    <div>
      <HeadersMeta
        title={'Messenger'}
        description={'Communicate with others through the messenger'}
      />
      <h2>Messenger</h2>
    </div>
  )
}

Messenger.getLayout = getLayout
export default Messenger
