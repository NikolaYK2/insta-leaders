import React from 'react'
import Link from 'next/link'
import { ROUTES_APP, ROUTES_AUTH } from '@/appRoot/routes/routes'

export const NavBar = () => {
  return (
    <div className="flex justify-center gap-10 mb-10 p-3 bg-gray-600 w-full">
      <Link href={ROUTES_APP.HOME}>Main</Link>
      <Link href={ROUTES_AUTH.REGISTRATION}>Sign Up</Link>
      <Link href={ROUTES_AUTH.LOGIN}>Sign In</Link>
      <Link href={ROUTES_AUTH.FORGOT_PASSWORD}>Forgot Password</Link>
      <Link href={ROUTES_AUTH.RECOVERY_PASSWORD}>Password recovery</Link>
      <Link href={ROUTES_AUTH.CREATE_NEW_PASSWORD}>Create New Password</Link>
    </div>
  )
}
