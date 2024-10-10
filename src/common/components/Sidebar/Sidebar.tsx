import React from 'react'
import Link from 'next/link'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import LogOut from '@/features/auth/ui/logOut/logOut'

export const Sidebar = () => {
  return (
    <div className="flex flex-col align-sub w-64 bg-gray-800 text-white">
      <Link href={ROUTES_APP.HOME}>Home</Link>
      <Link href={ROUTES_APP.CREATE}>Create</Link>
      <Link href={ROUTES_APP.PROFILE}>My Profile</Link>
      <Link href={ROUTES_APP.MESSENGER}>Messenger</Link>
      <Link href={ROUTES_APP.SEARCH}>Search</Link>
      <Link href={ROUTES_APP.STATISTICS}>Statistics</Link>
      <Link href={ROUTES_APP.FAVORITES}>Favorites</Link>
      <LogOut />
    </div>
  )
}
