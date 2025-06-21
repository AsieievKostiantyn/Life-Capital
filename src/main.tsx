import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/app/App';
import '@/app/index.css';

const root = document.getElementById('root') as HTMLElement;
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
