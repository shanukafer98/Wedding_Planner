// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:3000',
//         changeOrigin: true,
//         secure: false, // Disable SSL certificate validation if necessary
//       },
//     },
//   },
//   plugins: [react()],
// });


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';

// export default defineConfig({
//   plugins: [react()],
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
  },
  define: {
    'process.env.VITE_BACKEND_URL': JSON.stringify('https://wedding-plannerback-ge2a313u1-shanukafer98s-projects.vercel.app'),
  },
});