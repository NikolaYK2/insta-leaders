import { NextPage } from 'next'
import { PropsWithChildren, ReactElement } from 'react'
import { NavBar, Sidebar } from '@/common/components'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const authenticated = false //возможно тут можно выполнять запрос для получения данных о пользователе

  //пока данные грузятся можно сделать индикатор загрузки

  return (
    <div className="flex min-h-screen flex-col">
      <NavBar /> {/* Верхняя навигационная панель */}
      <div className="flex flex-1 w-full">
        {authenticated && <Sidebar />}
        {/* Sidebar отображается только если пользователь авторизован */}
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
