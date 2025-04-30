import { createContext, useContext, useEffect, useState } from 'react';
import { ThemeContextType, ThemeMode, ThemeProviderProps, DarkModeConfig } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  defaultDarkMode = 'class',
  storageKey = 'purer-ui-theme',
  darkModeStorageKey = 'purer-ui-dark-mode',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(
    () => {
      if (typeof window === 'undefined') return defaultTheme;
      return (localStorage.getItem(storageKey) as ThemeMode) || defaultTheme;
    }
  );
  
  const [darkMode, setDarkMode] = useState<DarkModeConfig>(
    () => {
      if (typeof window === 'undefined') return defaultDarkMode;
      
      const storedMode = localStorage.getItem(darkModeStorageKey);
      if (!storedMode) return defaultDarkMode;
      
      try {
        return JSON.parse(storedMode) as DarkModeConfig;
      } catch (e) {
        return storedMode as DarkModeConfig;
      }
    }
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = window.document.documentElement;
    
    root.classList.remove('light', 'dark', 'custom-dark');
    root.removeAttribute('data-theme');
    
    const isDark = 
      theme === 'dark' || 
      (theme === 'system' && 
       window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (darkMode === 'media') {
      root.setAttribute('data-color-scheme', isDark ? 'dark' : 'light');
    } else if (darkMode === 'class') {
      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    } else if (Array.isArray(darkMode) && darkMode[0] === 'class') {
      if (isDark) {
        root.classList.add(darkMode[1]);
      }
    } else if (darkMode === 'selector' || (Array.isArray(darkMode) && darkMode[0] === 'selector')) {
      root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else if (Array.isArray(darkMode) && darkMode[0] === 'variant') {
      if (isDark) {
        root.classList.add('custom-dark');
      }
    }
  }, [theme, darkMode]);

  const value = {
    theme,
    darkMode,
    setTheme: (theme: ThemeMode) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, theme);
      }
      setTheme(theme);
    },
    setDarkMode: (config: DarkModeConfig) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(darkModeStorageKey, 
          typeof config === 'string' ? config : JSON.stringify(config));
      }
      setDarkMode(config);
    },
  };

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}; 