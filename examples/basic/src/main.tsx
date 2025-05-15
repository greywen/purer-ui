import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, ThemeWatcher } from '@purer-ui/themes';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system">
      <ThemeWatcher />
      <App />
    </ThemeProvider>
  </React.StrictMode>
); 