import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      // Este proxy me permite evitar problemas con el CORS en desarrollo
      proxy: {
        '/api': {
          target: env.VITE_DOMAIN_API,
          changeOrigin: true,
        },
      },
    },
    plugins: [react()],
  };
});
