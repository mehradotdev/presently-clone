import { createContext, useContext } from 'react';
import { ThemeMode, ThemeName } from './themes';

export interface ThemeContextType {
  mode: ThemeMode;
  theme: ThemeName;
  setMode: (mode: ThemeMode) => void;
  setTheme: (theme: ThemeName) => void;
  resolvedMode: 'light' | 'dark';
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
