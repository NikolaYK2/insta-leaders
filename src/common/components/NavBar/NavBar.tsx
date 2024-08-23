import React from 'react'
import Link from 'next/link'

export const NavBar = () => {
  return (
    <div className="flex justify-center gap-10 mb-10 p-3 bg-gray-600 w-full">
      <Link href="/signUp">Sign Up</Link>
      <Link href="/signIn">Sign In</Link>
      <Link href="/forgotPassword">Forgot Password</Link>
      <Link href="/passwordRecovery">Password recovery</Link>
      <Link href="/createNewPassword">Create New Password</Link>
    </div>
  )
}
