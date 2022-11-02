import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import { colorList } from '@/constant/themeColor';
import { useThemeContext } from '@/context/theme';

export default function Layout({
  children,
  bgText = 'HELLO',
}: {
  children: ReactNode;
  bgText?: string;
}) {
  const { color, setColor, theme } = useThemeContext();
  const [tempColor, setTempColor] = useState<typeof colorList[number]>(
    colorList[0]
  );
  const [fontLoaded, setFontLoaded] = useState(false);

  // auto changing colors
  useEffect(() => {
    if (!color) {
      const intervalId = setInterval(() => {
        const ind = colorList.findIndex((col) => col === tempColor);
        const nextInd = ind === colorList.length - 1 ? 0 : ind + 1;
        setTempColor(colorList[nextInd]);
      }, 3000);
      return () => clearInterval(intervalId);
    }
  }, [setColor, tempColor, color]);

  // avoid flash of unstyled fonts
  useEffect(() => {
    document.fonts?.ready.then(() => setFontLoaded(true));
  }, []);

  return (
    <div
      className={`${clsx(!color && tempColor, color, theme)} text-text-primary`}
    >
      <div className='layoutGrid bg-bg-primary'>
        <div
          className={`${
            fontLoaded ? 'opacity-100' : 'opacity-0'
          } fixed -ml-2 -mt-1 font-antonio text-[8em] font-thin leading-[0.75em] text-primary-800/10 transition-all duration-1000 md:text-[14em]`}
        >
          {bgText}
        </div>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}
