import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

const Statistics = () => {
  return (
    <div>
      <HeadersMeta title={'Statistics'} description={'View and analyze your account statistics'} />
      <h2>Statistics</h2>
    </div>
  )
}

Statistics.getLayout = getLayout
export default Statistics
