import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App.jsx';
import { SettingsProvider } from './pages/SettingsContext';

createRoot(document.getElementById('root')).render(
  <SettingsProvider>
    <StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </StrictMode>
  </SettingsProvider>
)
