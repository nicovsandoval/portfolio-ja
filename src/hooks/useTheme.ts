import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme-preference';

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function getInitialTheme(): { theme: Theme; isManual: boolean } {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && (stored === 'light' || stored === 'dark')) {
    return { theme: stored, isManual: true };
  }
  return { theme: getSystemTheme(), isManual: false };
}

export function useTheme() {
  const [state, setState] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [state.theme]);

  useEffect(() => {
    if (state.isManual) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setState({ theme: e.matches ? 'dark' : 'light', isManual: false });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [state.isManual]);

  const setTheme = (newTheme: Theme) => {
    setState({ theme: newTheme, isManual: true });
    localStorage.setItem(STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => {
    setTheme(state.theme === 'light' ? 'dark' : 'light');
  };

  return { theme: state.theme, setTheme, toggleTheme };
}
