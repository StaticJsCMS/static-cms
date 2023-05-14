import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin(), tsconfigPaths()],
  root: 'src',
  optimizeDeps: {
    force: true,
    include: ['iarna-toml-esm', '@codemirror', 'ol'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  build: {
    commonjsOptions: { include: [/node_modules/, /@codemirror/, /\/ol\//], exclude: [/@lezer/] },
    outDir: '../dist',
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'StaticCMSCore',
      fileName: format =>
        format === 'umd' ? 'static-cms-core.js' : `static-cms-core.${format}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          if (assetInfo.name === 'style.css') {
            return 'main.css';
          }
          return assetInfo.name!;
        },
      },
    },
  },
  define: {
    _global: '({})',
  },
  resolve: {
    alias: {
      path: 'path-browserify',
      stream: 'stream-browserify',
      buffer: 'buffer',
    },
  },
});
