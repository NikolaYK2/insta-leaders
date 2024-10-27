import React, { PropsWithChildren, ReactElement } from 'react'
import { BaseLayout } from '@/common/components'
import { NextPage } from 'next'

const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return <BaseLayout>{children}</BaseLayout>
}

export const PublicLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
