import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import App from './App.jsx';
import { SettingsProvider } from './context/SettingsContext.jsx';
import { TextsProvider } from './context/TextsContext.jsx';

createRoot(document.getElementById('root')).render(
  <SettingsProvider>
    <TextsProvider>
      <StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </StrictMode>
    </TextsProvider>
  </SettingsProvider>
)
