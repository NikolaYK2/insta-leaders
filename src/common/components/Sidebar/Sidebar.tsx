import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ROUTES_APP } from '@/appRoot/routes/routes'
import LogOut from '@/features/auth/ui/logOut/logOut'
import { NextPageWithLayout } from '@/pages/_app'

import { LocalStorageUtil } from '@/common/utils/LocalStorageUtil'
import { cn } from '@/common/utils/cn'
import { DynamicIcon, IconId } from '@nikolajk2/lib-insta-leaders'

type Routs = {
  href: string
  label: string
  style?: string
  icon: IconId
}
const routs: Routs[] = [
  { href: ROUTES_APP.HOME, label: 'Home', icon: 'HomeOutline' },
  { href: ROUTES_APP.CREATE, label: 'Create', icon: 'PlusSquareOutline' },
  { href: ROUTES_APP.PROFILE, label: 'My Profile', icon: 'PersonOutline' },
  { href: ROUTES_APP.MESSENGER, label: 'Messenger', icon: 'MessageCircle' },
  { href: ROUTES_APP.SEARCH, label: 'Search', style: 'mb-[38.66%]', icon: 'Search' },
  { href: ROUTES_APP.STATISTICS, label: 'Statistics', icon: 'TrendingUpOutline' },
  { href: ROUTES_APP.FAVORITES, label: 'Favorites', icon: 'BookmarkOutline', style: 'mb-[129.5%]' },
]
export const Sidebar: NextPageWithLayout = () => {
  const [userId, setUserId] = useState<string | null>(null)

  //проверяет, если href равен ROUTES_APP.PROFILE так как в profile нужно передать id
  const getHref = (href: string) => {
    return href === ROUTES_APP.PROFILE ? `${href}/${userId}` : href
  }

  useEffect(() => {
    const storedUserId = LocalStorageUtil.getValue('userId') as string | null

    setUserId(storedUserId)
  }, [])

  return (
    <nav className="max-w-[156px] min-h-screen mr-[24px] w-full text-white border-r-[1px] border-dark-300 notePad:hidden">
      <section
        className={'sticky top-[60px] pt-[74px] flex flex-col max-h-full justify-between mr-4'}
      >
        {routs.map(rout => (
          <Link
            className={cn('flex mb-[17.4%]', rout.style)}
            href={getHref(rout.href)}
            key={rout.label}
          >
            <DynamicIcon className={' mr-[19px]'} iconId={rout.icon} width={24} height={24} />
            {rout.label}
          </Link>
        ))}
        <LogOut />
      </section>
    </nav>
  )
}
