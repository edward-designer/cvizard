import clsx from 'clsx';
import { ReactNode, useEffect, useState } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

import { colorList } from '@/constant/themeColor';
import { useThemeContext } from '@/context/theme';

export default function Layout({ children }: { children: ReactNode }) {
  const { color, setColor, theme } = useThemeContext();
  const [tempColor, setTempColor] = useState<typeof colorList[number]>(
    colorList[0]
  );
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

  return (
    <div
      className={`${clsx(!color && tempColor, color, theme)} text-text-primary`}
    >
      <div className='layoutGrid bg-bg-primary'>
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}
