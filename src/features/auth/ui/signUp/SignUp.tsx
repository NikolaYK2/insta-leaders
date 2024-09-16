import React from 'react'
import { HeadersMeta } from '@/common/components'
import { NextPageWithLayout } from '@/pages/_app'

export const SignUp: NextPageWithLayout = () => {
  return (
    <div>
      <HeadersMeta title={'Sign Up'} description={'Create a new account by signing up'} />
      <h2>Registration</h2>
    </div>
  )
}
