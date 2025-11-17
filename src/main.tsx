import { createRoot } from 'react-dom/client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import '@/app/index.css';
import { AppProvider } from '@/app/providers/AppProvider';

const root = document.getElementById('root') as HTMLElement;

if (root) {
  createRoot(root).render(<AppProvider />);
}
