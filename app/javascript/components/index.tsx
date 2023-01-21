import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import GlobalStyle from './GlobalStyle';
import { theme } from './theme';

//App as the main handler
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.body.appendChild(document.createElement('div'))).render(
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
});
