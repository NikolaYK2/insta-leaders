import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { wrapper } from "@/appRoot/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "@nikolajk2/lib-insta-leaders/css";
import "@/assets/styles/globals.css";

//подключение layout
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest);

  // Используйте макет, определенный на уровне страницы, если он доступен
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_RECAPTCHA_ENTERPRISE_API_KEY}
      >
        {getLayout(<Component {...props.pageProps} />)}
      </GoogleOAuthProvider>
    </Provider>
  );
}
