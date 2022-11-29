import * as path from "path";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rollupReplace from "@rollup/plugin-replace";

import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  base: './',
  server: {
    open: true,
  },
  publicDir: '../public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [
    svgr(),
    rollupReplace({
      preventAssignment: true,
      values: {
        __DEV__: JSON.stringify(true),
        "process.env.NODE_ENV": JSON.stringify("development"),
      },
    }),
    react(),
  ],
  resolve: process.env.USE_SOURCE
    ? {
      alias: {
        "react-router": path.resolve(
          __dirname,
          "../../packages/react-router/index.tsx"
        ),
        "react-router-dom": path.resolve(
          __dirname,
          "../../packages/react-router-dom/index.tsx"
        ),
      },
    }
    : {},
})
