import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://wedding-plannerback-ge2a313u1-shanukafer98s-projects.vercel.app',
        secure: false, // Disable SSL certificate validation
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});