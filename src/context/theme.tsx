import { createContext, ReactNode, useContext, useState } from 'react';

import { colorList } from '@/constant/themeColor';

export enum ITheme {
  light = 'light',
  dark = 'dark',
}

interface IThemeContext {
  color: typeof colorList[number] | null;
  setColor: (color: typeof colorList[number]) => void;
  theme: ITheme;
  setTheme: (theme: ITheme) => void;
}

const defaultState = {
  color: null,
  setColor: () => {
    return null;
  },
  theme: ITheme.light,
  setTheme: () => {
    return null;
  },
};

const ThemeContext = createContext<IThemeContext>(defaultState);

export const ThemeWrapper = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState<typeof colorList[number] | null>(null);
  const [theme, setTheme] = useState<ITheme>(ITheme.light);
  return (
    <ThemeContext.Provider value={{ color, setColor, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
