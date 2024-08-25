import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

export const PasswordRecovery: NextPageWithLayout = () => {
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
