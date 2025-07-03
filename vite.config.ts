import path from 'path';
import { defineConfig } from 'vite';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@/app': path.resolve(__dirname, 'src/app'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/static': path.resolve(__dirname, 'src/static'),
      '@/features': path.resolve(__dirname, 'src/features'),
    },
  },
  plugins: [react(), tailwindcss()],
});
