import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: /\.(js|jsx)$/,
      jsxRuntime: 'classic'
    })
  ],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js?$/,
    exclude: [],
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/test/setup.js',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
    server: {
      deps: {
        inline: ['chart.js'],
      }
    }
  }
});