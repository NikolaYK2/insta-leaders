import React from 'react'
import { getLayout, HeadersMeta } from '@/common/components'

export const SignUp = () => {
  return (
    <div>
      <HeadersMeta title={'Sign Up'} description={'Create a new account by signing up'} />
      <h2>Registration</h2>
    </div>
  )
}

SignUp.getLayout = getLayout
export default SignUp
