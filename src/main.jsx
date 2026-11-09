import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { setupAnalytics } from './analytics.js';
import './global.css';

setupAnalytics('G-LBC132077B');

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
