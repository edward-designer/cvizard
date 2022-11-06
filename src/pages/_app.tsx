import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { ThemeWrapper } from '@/context/theme';
import { useThemeContext } from '@/context/theme';
export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

import '@/styles/globals.css';
import '@/styles/colors.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { theme } = useThemeContext();
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <ThemeWrapper>
      <ToastContainer theme={theme} />
      {getLayout(<Component {...pageProps} />)}
    </ThemeWrapper>
  );
}

export default MyApp;
