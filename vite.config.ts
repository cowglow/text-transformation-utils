import { defineConfig } from "vite";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
  build: {
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
