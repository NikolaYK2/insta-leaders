import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

export const ForgotPassword: NextPageWithLayout = () => {
  return (
    <div>
      <HeadersMeta
        title={'Forgot Password'}
        description={'Reset your password if you have forgotten it'}
      />
      <h2>Forgot Password</h2>
    </div>
  )
}
