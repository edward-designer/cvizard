import { createContext, ReactNode, useContext } from 'react';

import { colorList } from '@/constant/themeColor';
import useStateStorage from '@/hook/useStateStorage';
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
  const [color, setColor] = useStateStorage<typeof colorList[number] | null>(
    'color',
    null
  );
  const [theme, setTheme] = useStateStorage<ITheme>('theme', ITheme.light);
  return (
    <ThemeContext.Provider value={{ color, setColor, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
