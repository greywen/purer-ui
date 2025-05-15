import './tailwind.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#1a202c',
        },
      ],
    },
  },
  decorators: [
    (Story) => {
      // 每个故事开始时重置任何类
      if (typeof window !== 'undefined') {
        document.documentElement.classList.remove('dark', 'light', 'custom-dark');
      }
      return Story();
    }
  ]
};

export default preview; 