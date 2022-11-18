import { BenchNine, Inter } from '@next/font/google';
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

const inter = Inter({ subsets: ['latin'] });
const benchNine = BenchNine({ weight: '700' });

import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/cv.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { theme } = useThemeContext();
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
        h1,
        h2 {
          font-family: ${benchNine.style.fontFamily};
        }
      `}</style>
      <ThemeWrapper>
        <ToastContainer theme={theme} />
        {getLayout(<Component {...pageProps} />)}
      </ThemeWrapper>
    </>
  );
}

export default MyApp;
