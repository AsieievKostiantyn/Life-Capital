import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { AppProvider } from '@/app/AppProvider';
import '@/app/index.css';

import { AuthProvider } from '@/features/auth';

const root = document.getElementById('root') as HTMLElement;
if (root) {
  createRoot(root).render(
    <StrictMode>
      <AuthProvider>
        <AppProvider />
      </AuthProvider>
    </StrictMode>
  );
}
