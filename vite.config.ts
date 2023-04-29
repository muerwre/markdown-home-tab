import { PluginOption, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({ exportAsDefault: true }),
    visualizer({
      template: "treemap", // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "analice.html",
    }) as PluginOption,
  ],
  resolve: {
    alias: [{ find: "~", replacement: path.resolve("src") }],
  },
});
