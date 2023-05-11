import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  assetsInclude: ["public/**/*"],
  optimizeDeps: {
    force: true,
    include: ["@staticcms/core"],
  },
  build: {
    commonjsOptions: { include: [/core/, /node_modules/] },
  },
});
