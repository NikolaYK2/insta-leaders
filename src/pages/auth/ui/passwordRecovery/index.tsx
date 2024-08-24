import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

export const PasswordRecovery = () => {
  return (
    <div>
      <HeadersMeta
        title={'Password Recovery'}
        description={'Recover your account by resetting your password'}
      />
      <h2>Password recovery</h2>
    </div>
  )
}

PasswordRecovery.getLayout = getLayout
export default PasswordRecovery
