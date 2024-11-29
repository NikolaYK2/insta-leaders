import '@nikolajk2/lib-insta-leaders/css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { wrapper } from '@/appRoot/store'
import '@/assets/styles/globals.css'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { GoogleOAuthProvider } from '@react-oauth/google'
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

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_API_KEY

  if (!GOOGLE_CLIENT_ID || !RECAPTCHA_KEY) {
    throw new Error('Missing environment variables: GOOGLE_CLIENT_ID or RECAPTCHA_KEY')
  }

  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_KEY}>
          {getLayout(<Component {...props.pageProps} />)}
        </GoogleReCaptchaProvider>
      </GoogleOAuthProvider>
    </Provider>
  )
}
