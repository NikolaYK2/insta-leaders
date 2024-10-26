import React, { PropsWithChildren, ReactElement } from 'react'
import { BaseLayout, Sidebar } from '@/common/components'
import { NextPage } from 'next'
import { cn } from '@/common/utils/cn'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <BaseLayout>
      <div className="flex flex-1 max-w-screen-desktop w-full m-auto">
        <Sidebar />
        <main className={cn('flex-1 mx-auto w-full')}>{children}</main>
      </div>
    </BaseLayout>
  )
}

export const PrivateLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
