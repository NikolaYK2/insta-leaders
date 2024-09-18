import { NextPage } from 'next'
import React, { PropsWithChildren, ReactElement } from 'react'
import { NavBar, Sidebar } from '@/common/components'
import { cn } from '@/common/utils/cn'
import { Header } from '@nikolajk2/lib-insta-leaders'
import Link from 'next/link'
import { ROUTES_APP, ROUTES_AUTH } from '@/appRoot/routes/routes'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  const authenticated = true //возможно тут можно выполнять запрос для получения данных о пользователе

  //пока данные грузятся можно сделать индикатор загрузки

  return (
    <div className="flex min-h-screen flex-col">
      {/* Верхняя навигационная панель */}
      {/*<NavBar />*/}
      <div className=" bg-gray-600 w-full mb-[60px]">
        <Header>
          <Link href={ROUTES_APP.HOME}>Main</Link>
          <Link href={ROUTES_AUTH.REGISTRATION}>Sign Up</Link>
          <Link href={ROUTES_AUTH.LOGIN}>Sign In</Link>
          <Link href={ROUTES_AUTH.FORGOT_PASSWORD}>Forgot Password</Link>
          <Link href={ROUTES_AUTH.RECOVERY_PASSWORD}>Password recovery</Link>
          <Link href={ROUTES_AUTH.CREATE_NEW_PASSWORD}>Create New Password</Link>
        </Header>
      </div>
      <div className="flex flex-1 w-full">
        {/* Sidebar отображается только если пользователь авторизован */}
        {authenticated && <Sidebar />}
        <main className={cn('flex-1 p-10 max-w-screen-desktop mx-auto')}>
          {children} {/* Основной контент */}
        </main>
      </div>
    </div>
  )
}

export const getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
