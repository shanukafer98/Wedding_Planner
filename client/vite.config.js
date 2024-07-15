import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://wedding-plannerback-shanukafer98s-projects.vercel.app',
        changeOrigin: true,
        secure: false, // Disable SSL certificate validation if necessary
      },
    },
  },
  plugins: [react()],
});
