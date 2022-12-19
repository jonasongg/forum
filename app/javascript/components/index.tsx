import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import GlobalStyle from './GlobalStyle';

//App as the main handler
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.body.appendChild(document.createElement('div'))).render(
    <>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  );
});
