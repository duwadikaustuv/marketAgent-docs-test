import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

export default defineConfig({
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/react",
      remarkPlugins: [],
      rehypePlugins: [],
    }),
    react(),
  ],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
  resolve: {
    extensions: [".js", ".jsx", ".mdx"],
  },
});
