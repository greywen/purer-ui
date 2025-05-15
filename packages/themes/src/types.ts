import React from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export type DarkModeConfig =
  // 使用 `media` 查询策略
  | 'media'
  // 使用 `class` 策略，需要在 `html` 上添加 `.dark` 类
  | 'class'
  // 使用 `class` 策略但使用自定义类而不是 `.dark`
  | ['class', string]
  // 使用 `selector` 策略 — 与 `class` 类似但使用 `:where()` 以获得更可预测的行为
  | 'selector'
  // 使用 `selector` 策略但使用自定义选择器而不是 `.dark`
  | ['selector', string]
  // 使用 `variant` 策略，允许完全自定义选择器
  | ['variant', string | string[]];

export interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  darkMode: DarkModeConfig;
  setDarkMode: (config: DarkModeConfig) => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  defaultDarkMode?: DarkModeConfig;
  storageKey?: string;
  darkModeStorageKey?: string;
} 