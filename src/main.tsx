import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';

import { AppProvider } from '@/app/AppProvider';
import '@/app/index.css';

const root = document.getElementById('root') as HTMLElement;
if (root) {
  createRoot(root).render(
    <StrictMode>
      <AppProvider />
    </StrictMode>
  );
}
