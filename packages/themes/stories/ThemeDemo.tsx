import { useEffect, useRef } from 'react';
import { ThemeProvider, ThemeToggle, ThemeWatcher, useTheme } from '../src/index';
import { DarkModeConfig, ThemeMode } from '../src/types';

function DarkModeDebug() {
  const { darkMode } = useTheme();
  const debugRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debugRef.current) {
      debugRef.current.setAttribute(
        'data-mode',
        typeof darkMode === 'string' ? darkMode : JSON.stringify(darkMode)
      );
    }
  }, [darkMode]);

  return <div ref={debugRef} className='debug-dark-mode' />;
}

function DarkModeStatus() {
  const { theme, darkMode, setDarkMode } = useTheme();

  const getFormattedMode = () => {
    if (typeof darkMode === 'string') {
      return darkMode;
    } else {
      return `[${darkMode[0]}, ${typeof darkMode[1] === 'string' ? `"${darkMode[1]}"` : JSON.stringify(darkMode[1])}]`;
    }
  };

  const handleModeClick = (mode: DarkModeConfig) => {
    setDarkMode(mode);
  };

  return (
    <div className='mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600'>
      <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
        当前配置
      </h3>
      <p className='text-gray-600 dark:text-gray-300 mb-4'>
        主题: <span className='font-medium'>{theme}</span> | 暗黑模式:{' '}
        <code className='bg-gray-100 dark:bg-gray-600 px-1 rounded'>
          {getFormattedMode()}
        </code>
      </p>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
        <button
          onClick={() => handleModeClick('class')}
          className={`px-3 py-2 text-xs rounded-md ${darkMode === 'class' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}
        >
          class
        </button>
        <button
          onClick={() => handleModeClick('media')}
          className={`px-3 py-2 text-xs rounded-md ${darkMode === 'media' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}
        >
          media
        </button>
        <button
          onClick={() => handleModeClick('selector')}
          className={`px-3 py-2 text-xs rounded-md ${darkMode === 'selector' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}
        >
          selector
        </button>
        <button
          onClick={() => handleModeClick(['class', 'custom-dark'])}
          className={`px-3 py-2 text-xs rounded-md ${Array.isArray(darkMode) && darkMode[0] === 'class' && darkMode[1] === 'custom-dark' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}
        >
          ['class', 'custom-dark']
        </button>
        <button
          onClick={() => handleModeClick(['selector', '.custom-dark-selector'])}
          className={`px-3 py-2 text-xs rounded-md ${Array.isArray(darkMode) && darkMode[0] === 'selector' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}
        >
          ['selector', '.custom...']
        </button>
        <button
          onClick={() => handleModeClick(['variant', 'dark'])}
          className={`px-3 py-2 text-xs rounded-md ${Array.isArray(darkMode) && darkMode[0] === 'variant' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200'}`}
        >
          ['variant', 'dark']
        </button>
      </div>
    </div>
  );
}

export interface ThemeDemoProps {
  defaultTheme?: ThemeMode;
  defaultDarkMode?: DarkModeConfig;
}

export function ThemeDemo({
  defaultTheme = 'system',
  defaultDarkMode = 'class',
}: ThemeDemoProps) {
  return (
    <ThemeProvider
      defaultTheme={defaultTheme}
      defaultDarkMode={defaultDarkMode}
    >
      <ThemeWatcher />
      <div className='p-6 max-w-xl mx-auto'>
        <div className='flex flex-col gap-6'>
          <div className='p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md'>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              暗黑模式演示
            </h1>

            <ThemeToggle
              showDarkModeToggle={true}
              className='bg-white dark:bg-gray-700 text-gray-800 dark:text-white'
            />

            <DarkModeStatus />

            <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-4 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600'>
                <h2 className='font-semibold text-gray-900 dark:text-white'>
                  明亮/暗黑模式切换
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  点击左侧按钮在明亮、暗黑和系统三种模式间切换。
                </p>
              </div>

              <div className='p-4 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600'>
                <h2 className='font-semibold text-gray-900 dark:text-white'>
                  暗黑模式配置切换
                </h2>
                <p className='mt-2 text-gray-600 dark:text-gray-300'>
                  点击右侧按钮可以在不同的暗黑模式配置之间切换。
                </p>
              </div>
            </div>

            <div className='mt-8'>
              <h2 className='font-semibold text-gray-900 dark:text-white mb-4'>
                暗黑模式配置类型
              </h2>
              <ul className='list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2'>
                <li>
                  <code className='bg-gray-100 dark:bg-gray-600 px-1 rounded'>
                    class
                  </code>{' '}
                  - 使用CSS类 <code>.dark</code>
                </li>
                <li>
                  <code className='bg-gray-100 dark:bg-gray-600 px-1 rounded'>
                    media
                  </code>{' '}
                  - 使用媒体查询{' '}
                  <code>@media (prefers-color-scheme: dark)</code>
                </li>
                <li>
                  <code className='bg-gray-100 dark:bg-gray-600 px-1 rounded'>
                    selector
                  </code>{' '}
                  - 使用选择器 <code>:where(.dark)</code>
                </li>
                <li>
                  <code className='bg-gray-100 dark:bg-gray-600 px-1 rounded'>
                    ['class', '自定义类名']
                  </code>{' '}
                  - 使用自定义类
                </li>
                <li>
                  <code className='bg-gray-100 dark:bg-gray-600 px-1 rounded'>
                    ['selector', '自定义选择器']
                  </code>{' '}
                  - 使用自定义选择器
                </li>
                <li>
                  <code className='bg-gray-100 dark:bg-gray-600 px-1 rounded'>
                    ['variant', 'dark']
                  </code>{' '}
                  - 使用变体
                </li>
              </ul>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow'>
              <div className='h-24 bg-blue-100 dark:bg-blue-900 rounded mb-4'></div>
              <h3 className='font-medium text-gray-900 dark:text-white'>
                卡片标题
              </h3>
              <p className='text-gray-500 dark:text-gray-400 mt-2'>
                这是一个展示暗黑模式效果的卡片。
              </p>
            </div>

            <div className='flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow'>
              <div className='h-24 bg-green-100 dark:bg-green-900 rounded mb-4'></div>
              <h3 className='font-medium text-gray-900 dark:text-white'>
                卡片标题
              </h3>
              <p className='text-gray-500 dark:text-gray-400 mt-2'>
                这是一个展示暗黑模式效果的卡片。
              </p>
            </div>

            <div className='flex flex-col p-4 bg-white dark:bg-gray-800 rounded-lg shadow'>
              <div className='h-24 bg-purple-100 dark:bg-purple-900 rounded mb-4'></div>
              <h3 className='font-medium text-gray-900 dark:text-white'>
                卡片标题
              </h3>
              <p className='text-gray-500 dark:text-gray-400 mt-2'>
                这是一个展示暗黑模式效果的卡片。
              </p>
            </div>
          </div>

          <div className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow text-center'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              默认暗黑模式配置:{' '}
              <code className='bg-gray-100 dark:bg-gray-700 px-1 rounded'>
                {typeof defaultDarkMode === 'string'
                  ? defaultDarkMode
                  : JSON.stringify(defaultDarkMode)}
              </code>
            </p>
          </div>
        </div>
      </div>
      <DarkModeDebug />
    </ThemeProvider>
  );
}
