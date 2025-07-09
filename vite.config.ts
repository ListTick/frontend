import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    middlewareMode: false,
    proxy: {
      '/realms': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false
      },
      '/resources': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
});
