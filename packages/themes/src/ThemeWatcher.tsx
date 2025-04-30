import { useEffect } from 'react';
import { useTheme } from './ThemeContext';

export function ThemeWatcher() {
  const { theme, darkMode } = useTheme();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (darkMode === 'media') return;

    const handleMediaQuery = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;

      if (theme === 'system') {
        const systemTheme = e.matches ? 'dark' : 'light';

        root.classList.remove('light', 'dark');

        if (darkMode === 'class') {
          root.classList.add(systemTheme);
        } else if (Array.isArray(darkMode) && darkMode[0] === 'class') {
          if (systemTheme === 'dark') {
            root.classList.add(darkMode[1]);
          }
        } else if (
          darkMode === 'selector' ||
          (Array.isArray(darkMode) && darkMode[0] === 'selector')
        ) {
          root.classList.add(systemTheme);
        }
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleMediaQuery);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQuery);
    };
  }, [theme, darkMode]);

  return null;
}
