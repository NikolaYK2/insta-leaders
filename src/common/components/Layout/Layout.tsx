import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import { NavBar, Sidebar } from '@/common/components'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar /> {/* Верхняя навигационная панель */}
      <div className="flex flex-1 w-full">
        <Sidebar /> {/* Sidebar слева */}
        <main className="flex-1 p-10">
          {children} {/* Основной контент */}
        </main>
      </div>
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
