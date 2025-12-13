import { ReactNode, useEffect, useState } from 'react';
import { ThemeContext } from '../lib/theme-context';
import { ThemeMode, ThemeName, applyTheme } from '../lib/themes';

interface ThemeProviderProps {
  children: ReactNode;
}

const THEME_MODE_KEY = 'theme-mode';
const THEME_NAME_KEY = 'theme-name';

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(THEME_MODE_KEY);
    return (stored as ThemeMode) || 'system';
  });

  const [theme, setThemeState] = useState<ThemeName>(() => {
    const stored = localStorage.getItem(THEME_NAME_KEY);
    return (stored as ThemeName) || 'default';
  });

  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>('light');

  // Resolve system mode to actual light/dark
  useEffect(() => {
    const resolveMode = () => {
      if (mode === 'system') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      return mode;
    };

    const updateResolvedMode = () => {
      const resolved = resolveMode();
      setResolvedMode(resolved);
      applyTheme(theme, resolved);
    };

    updateResolvedMode();

    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', updateResolvedMode);
      return () => mediaQuery.removeEventListener('change', updateResolvedMode);
    }
  }, [mode, theme]);

  // Update document class for dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (resolvedMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolvedMode]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem(THEME_MODE_KEY, newMode);
  };

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_NAME_KEY, newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        setMode,
        setTheme,
        resolvedMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
