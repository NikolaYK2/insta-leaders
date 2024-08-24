import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

export const ForgotPassword = () => {
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

ForgotPassword.getLayout = getLayout
export default ForgotPassword
