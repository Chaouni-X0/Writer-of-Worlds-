import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import '@fontsource/amiri';
import '@fontsource/noto-sans-arabic';
import '@fontsource/tajawal';
import '@fontsource/cairo';
import '@fontsource/readex-pro';
import '@fontsource/ibm-plex-sans-arabic';
import '@fontsource/changa';
import '@fontsource/mada';
import '@fontsource/aref-ruqaa';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
