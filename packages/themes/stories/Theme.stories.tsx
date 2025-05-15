import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDemo } from '../src';

const meta: Meta<typeof ThemeDemo> = {
  title: 'Theme/Demo',
  component: ThemeDemo,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeDemo>;

export const ClassMode: Story = {
  args: {
    defaultTheme: 'system',
    defaultDarkMode: 'class',
  },
};

export const MediaQueryMode: Story = {
  args: {
    defaultTheme: 'system',
    defaultDarkMode: 'media',
  },
};

export const SelectorMode: Story = {
  args: {
    defaultTheme: 'system',
    defaultDarkMode: 'selector',
  },
};

export const CustomClassMode: Story = {
  args: {
    defaultTheme: 'system',
    defaultDarkMode: ['class', 'custom-dark'],
  },
};

export const CustomSelectorMode: Story = {
  args: {
    defaultTheme: 'system',
    defaultDarkMode: ['selector', '.custom-dark-selector'],
  },
};

export const VariantMode: Story = {
  args: {
    defaultTheme: 'system',
    defaultDarkMode: ['variant', 'dark'],
  },
}; 