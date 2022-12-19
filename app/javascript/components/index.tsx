import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App';

//App as the main handler
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.body.appendChild(document.createElement('div'))).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
