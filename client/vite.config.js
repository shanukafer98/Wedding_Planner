import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://wedding-plannerback-shanukafer98s-projects.vercel.app',
        secure: true, // Disable SSL certificate validation
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});