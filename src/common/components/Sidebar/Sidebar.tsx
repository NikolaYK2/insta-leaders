import React from 'react'
import Link from 'next/link'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import LogOut from '@/features/auth/ui/logOut/logOut'
import { NextPageWithLayout } from '@/pages/_app'
import { useGetUsersMeQuery } from '@/features/userHub/api/user/userService'

export const Sidebar: NextPageWithLayout = () => {
  const { data } = useGetUsersMeQuery()

  return (
    <div className="flex flex-col align-sub max-w-[156px] w-full text-white border-r-[1px] border-dark-300">
      <Link href={ROUTES_APP.HOME}>Home</Link>
      <Link href={ROUTES_APP.CREATE}>Create</Link>
      <Link href={`${ROUTES_APP.PROFILE}/${data?.data.id}`}>My Profile</Link>
      <Link href={ROUTES_APP.MESSENGER}>Messenger</Link>
      <Link href={ROUTES_APP.SEARCH}>Search</Link>
      <Link href={ROUTES_APP.STATISTICS}>Statistics</Link>
      <Link href={ROUTES_APP.FAVORITES}>Favorites</Link>
      <LogOut />
    </div>
  )
}
