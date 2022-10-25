import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import React from 'react';

import { useThemeContext } from '@/context/theme';
import { ITheme } from '@/context/theme';

const ThemeSwitch = () => {
  const { theme, setTheme } = useThemeContext();
  const changeTheme = () => {
    theme === ITheme.dark ? setTheme(ITheme.light) : setTheme(ITheme.dark);
  };

  return (
    <div
      onChange={changeTheme}
      className='absolute top-0 right-1 z-50 flex items-center justify-end gap-1 p-2 text-lg'
    >
      <span>
        <WbSunnyOutlinedIcon
          sx={{ fontSize: 'medium', color: 'var(--text-tertiary)' }}
        />
      </span>
      <label className='relative inline-block h-6 w-10' htmlFor='checkbox'>
        <input
          className='sacle-50 peer -translate-y-[10%] translate-x-[100%] focus:z-50 focus:outline-none focus:ring-offset-0'
          type='checkbox'
          id='checkbox'
          defaultChecked={theme === ITheme.dark}
          aria-label='toggle light and dark theme'
        />
        <div
          role='presentation'
          className="duration:500 before:bg-reverse-color peer-focus-visible:ring-focus-color absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-full
          bg-slate-100 transition-all before:absolute before:bottom-[2px] before:left-[2px] before:h-5 before:w-5 before:rounded-full before:bg-slate-300 before:transition-all before:duration-500 
          before:content-[''] peer-checked:bg-slate-700 peer-checked:before:translate-x-4 peer-focus-visible:ring"
        ></div>
      </label>
      <span>
        <DarkModeOutlinedIcon
          sx={{ fontSize: 'medium', color: 'var(--text-tertiary)' }}
        />
      </span>
    </div>
  );
};

export default ThemeSwitch;
