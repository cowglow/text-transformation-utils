import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  base: "/text-transformation-utils/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/main.ts",
      name: "TextTransformationUtils",
      formats: ["es", "cjs"],
      fileName: (format: string) => `text-transformation-utils.${format}.ts`,
    },
  },
  plugins: [
    dtsPlugin({
      insertTypesEntry: true,
      include: ["src"],
    }),
  ],
});
