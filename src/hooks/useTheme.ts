import { useEffect, useMemo, useState } from 'react';
import { applyThemeToSafari } from '../utils/safariTheme';

type Theme = 'light' | 'dark';
type ThemeMode = Theme | 'system';

const STORAGE_KEY = 'theme-preference';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getInitialMode(): ThemeMode {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored;
  }

  return 'system';
}

export function useTheme() {
  const [mode, setModeState] = useState<ThemeMode>(getInitialMode);
  const [systemTheme, setSystemTheme] = useState<Theme>(getSystemTheme);

  const theme = useMemo<Theme>(
    () => (mode === 'system' ? systemTheme : mode),
    [mode, systemTheme]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    applyThemeToSafari(theme);
  }, [theme]);

  const setMode = (nextMode: ThemeMode) => {
    setModeState(nextMode);
    localStorage.setItem(STORAGE_KEY, nextMode);
  };

  const setTheme = (nextTheme: Theme) => {
    setMode(nextTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return { theme, mode, setMode, setTheme, toggleTheme };
}
