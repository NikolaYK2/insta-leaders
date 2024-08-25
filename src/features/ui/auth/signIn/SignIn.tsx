import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

export const SignIn: NextPageWithLayout = () => {
  return (
    <div>
      <HeadersMeta title={'Sign In'} description={'Access your account by signing in'} />
      <h2>Login</h2>
    </div>
  )
}
