import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import LogOut from '@/features/auth/ui/logOut/logOut'
import { NextPageWithLayout } from '@/pages/_app'

import { LocalStorageUtil } from '@/common/utils/LocalStorageUtil'

export const Sidebar: NextPageWithLayout = () => {
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = LocalStorageUtil.getValue('userId') as string | null

    setUserId(storedUserId)
  }, [])

  return (
    <div className="flex flex-col align-sub max-w-[156px] mr-[24px] w-full text-white border-r-[1px] border-dark-300">
      <Link href={ROUTES_APP.HOME}>Home</Link>
      <Link href={ROUTES_APP.CREATE}>Create</Link>
      <Link href={`${ROUTES_APP.PROFILE}/${userId}`}>My Profile</Link>
      <Link href={ROUTES_APP.MESSENGER}>Messenger</Link>
      <Link href={ROUTES_APP.SEARCH}>Search</Link>
      <Link href={ROUTES_APP.STATISTICS}>Statistics</Link>
      <Link href={ROUTES_APP.FAVORITES}>Favorites</Link>
      <LogOut />
    </div>
  )
}
