import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

export const SignIn = () => {
  return (
    <div>
      <HeadersMeta title={'Sign In'} description={'Access your account by signing in'} />
      <h2>Login</h2>
    </div>
  )
}

SignIn.getLayout = getLayout
export default SignIn
