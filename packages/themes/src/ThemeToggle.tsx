import { useTheme } from './ThemeContext';
import { ThemeMode, DarkModeConfig } from './types';

export interface ThemeToggleProps {
  className?: string;
  showDarkModeToggle?: boolean;
}

export function ThemeToggle({
  className,
  showDarkModeToggle = false,
}: ThemeToggleProps) {
  const { theme, setTheme, darkMode, setDarkMode } = useTheme();

  function toggleTheme() {
    const nextTheme: ThemeMode =
      theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(nextTheme);
  }

  function toggleDarkMode() {
    let nextDarkMode: DarkModeConfig;

    if (darkMode === 'class') {
      nextDarkMode = 'media';
    } else if (darkMode === 'media') {
      nextDarkMode = 'selector';
    } else if (darkMode === 'selector') {
      nextDarkMode = ['class', 'custom-dark'];
    } else if (Array.isArray(darkMode) && darkMode[0] === 'class') {
      nextDarkMode = ['selector', '.custom-dark-selector'];
    } else if (Array.isArray(darkMode) && darkMode[0] === 'selector') {
      nextDarkMode = ['variant', 'dark'];
    } else {
      nextDarkMode = 'class';
    }

    setDarkMode(nextDarkMode);
  }

  return (
    <div className='flex gap-2'>
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-md border ${className}`}
      >
        {theme === 'light' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <circle cx='12' cy='12' r='5' />
            <line x1='12' y1='1' x2='12' y2='3' />
            <line x1='12' y1='21' x2='12' y2='23' />
            <line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
            <line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
            <line x1='1' y1='12' x2='3' y2='12' />
            <line x1='21' y1='12' x2='23' y2='12' />
            <line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
            <line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
          </svg>
        )}

        {theme === 'dark' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
          </svg>
        )}

        {theme === 'system' && (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <rect x='2' y='3' width='20' height='14' rx='2' ry='2' />
            <line x1='8' y1='21' x2='16' y2='21' />
            <line x1='12' y1='17' x2='12' y2='21' />
          </svg>
        )}
      </button>

      {showDarkModeToggle && (
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-md border ${className}`}
        >
          {darkMode === 'class' && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
              <line x1='9' y1='9' x2='15' y2='15' />
            </svg>
          )}

          {darkMode === 'media' && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <polygon points='23 7 16 12 23 17 23 7' />
              <rect x='1' y='5' width='15' height='14' rx='2' ry='2' />
            </svg>
          )}

          {darkMode === 'selector' && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
              <polyline points='15 3 21 3 21 9' />
              <line x1='10' y1='14' x2='21' y2='3' />
            </svg>
          )}

          {Array.isArray(darkMode) && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M12 20h9' />
              <path d='M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' />
            </svg>
          )}
        </button>
      )}

      <div className='text-sm'>
        <div>{`主题模式: ${theme}`}</div>
        <div>{`暗黑模式配置: ${typeof darkMode === 'string' ? darkMode : JSON.stringify(darkMode)}`}</div>
      </div>
    </div>
  );
}
