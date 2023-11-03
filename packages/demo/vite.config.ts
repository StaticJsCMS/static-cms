import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';

const root = resolve(__dirname, 'src');
const publicDir = resolve(__dirname, 'public');
const outDir = resolve(__dirname, 'build');

// https://vitejs.dev/config/
export default defineConfig({
  root,
  publicDir,
  plugins: [
    react(),
    svgrPlugin(),
    {
      name: 'rewrite-middleware',
      configureServer(serve) {
        serve.middlewares.use((req, _res, next) => {
          if (req.url === '/simple') {
            req.url = '/simple/';
          } else if (req.url === '/editorial') {
            req.url = '/editorial/';
          }
          next();
        });
      },
    },
  ],
  assetsInclude: ['public/**/*'],
  optimizeDeps: {
    force: true,
    include: ['@staticcms/core'],
  },
  build: {
    commonjsOptions: { include: [/core/, /node_modules/] },
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        simple: resolve(root, 'simple', 'index.html'),
        editorial: resolve(root, 'editorial', 'index.html'),
      },
    },
  },
});
