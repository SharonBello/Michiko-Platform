import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@michiko/types': path.resolve(__dirname, '../../packages/types/src/index.ts'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // No additionalData needed — tokens are CSS custom properties in global.scss
      },
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
    },
  },
});