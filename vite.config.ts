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
    },
  },
  plugins: [react(), tailwindcss()],
});
