import clsx from 'clsx';
import React from 'react';

import Button from '@/components/buttons/Button';
import ThemeSwitch from '@/components/common/ThemeSwitch';

import { colorList } from '@/constant/themeColor';
import { useThemeContext } from '@/context/theme';
const Footer = () => {
  const { color, setColor } = useThemeContext();
  return (
    <footer className='transition-color sticky bottom-0 col-span-3 bg-primary-500 p-2 duration-1000'>
      <p className='mb-2 text-center text-text-primary'>
        Pick your favourite color
      </p>
      <div className='flex flex-wrap justify-center gap-2'>
        {colorList.map((c) => (
          <Button
            key={c}
            className={`${clsx(
              c === color && 'border-white'
            )} h-10 w-10 ${c} rounded-full bg-primary-500`}
            aria-label={`set the theme color to ${c}`}
            onClick={() => setColor(c)}
          ></Button>
        ))}
      </div>
      <ThemeSwitch />
    </footer>
  );
};

export default Footer;
