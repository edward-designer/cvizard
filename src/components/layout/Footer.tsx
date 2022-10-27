import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import clsx from 'clsx';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import ThemeSwitch from '@/components/common/ThemeSwitch';

import { colorList } from '@/constant/themeColor';
import { useThemeContext } from '@/context/theme';

const Footer = () => {
  const [showPreference, setShowPreference] = useState(false);
  const { color, setColor } = useThemeContext();

  return (
    <footer
      className={`fixed w-full transition-all duration-1000 ${
        showPreference ? 'bottom-0 ' : '-bottom-20'
      }`}
    >
      {showPreference ? (
        <div className='bg-primary-300 p-2'>
          <p className='my-2 text-center text-slate-900'>
            Pick your favourite color
          </p>
          <div className='flex flex-wrap justify-center gap-2 md:mx-10'>
            {colorList.map((c) => (
              <Button
                key={c}
                className={`${clsx(
                  c === color && 'border-white'
                )} h-10 w-10 ${c} rounded-full bg-primary-700`}
                aria-label={`set the theme color to ${c}`}
                onClick={() => setColor(c)}
              ></Button>
            ))}
          </div>
          <ThemeSwitch />
          <button
            onClick={() => setShowPreference(!showPreference)}
            aria-label='show color preference'
            className='fixed right-2 bottom-2 rounded-full bg-primary-400 p-2 text-white'
          >
            <CloseIcon />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowPreference(!showPreference)}
          aria-label='show color preference'
          className='fixed right-2 bottom-2 rounded-full bg-primary-700 p-2 text-white'
        >
          <TuneIcon />
        </button>
      )}
    </footer>
  );
};

export default Footer;
