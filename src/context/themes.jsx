import { createContext, useContext } from 'react';

export const themes = {
  dark: 'dark',
  light: 'light',
};

export const ThemeContext = createContext({
  theme: themes.dark,
  toggleTheme: () => {},
});

export const useThemeContext = () => {
    const theme = useContext(ThemeContext);
  
    if(!theme) return theme.dark;
  
    return theme;
  }