import '@/assets/styles/globals.css'
import '@nikolajk2/lib-insta-leaders/css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { wrapper } from '@/appRoot/store'
//подключение layout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)

  // Используйте макет, определенный на уровне страницы, если он доступен
  const getLayout = Component.getLayout ?? (page => page)

  return <Provider store={store}>{getLayout(<Component {...props.pageProps} />)}</Provider>
}
