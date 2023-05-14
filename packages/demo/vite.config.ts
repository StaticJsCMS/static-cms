import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgrPlugin()],
  assetsInclude: ["public/**/*"],
  build: {
    commonjsOptions: { include: [/node_modules/] },
    outDir: "build",
  },
});
