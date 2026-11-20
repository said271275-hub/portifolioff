import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Bundle tahlil qilish (npm run build -- --mode analyze)
    mode === 'analyze' &&
      visualizer({
        open: true,
        filename: 'dist/stats.html',
        gzipSize: true,
        brotliSize: true,
      }),
  ].filter(Boolean),

  server: {
    port: 5173,
    host: true,
  },

  build: {
    // Chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'i18n': ['i18next', 'react-i18next'],
          'icons': ['lucide-react'],
        },
      },
    },
    // Warning threshold
    chunkSizeWarningLimit: 500,
  },
}));
