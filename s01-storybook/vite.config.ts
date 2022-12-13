import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    // Uncomment to make the warning disappear .
    jsx: 'automatic',
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
    svgr(),
  ],
  base: './',
  server: {
    open: true,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      'src/': path.join(__dirname, './src/'),
      components: path.resolve(__dirname, './src/components'),
      service: path.resolve(__dirname, './src/service'),
      class: path.resolve(__dirname, './src/class'),
      interface: path.resolve(__dirname, './src/interface'),
      states: path.resolve(__dirname, './src/states'),
    },
  },
});
