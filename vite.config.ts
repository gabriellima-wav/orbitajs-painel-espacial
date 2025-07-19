import * as path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/context': path.resolve(__dirname, 'src/context'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/firebase': path.resolve(__dirname, 'src/firebase'),
      '@/theme': path.resolve(__dirname, 'src/theme'),
      '@/page': path.resolve(__dirname, 'src/page'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/config': path.resolve(__dirname, 'src/config'),
      '@/types': path.resolve(__dirname, 'src/types'),
    },
  },
});
