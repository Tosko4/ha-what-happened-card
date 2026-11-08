import { readFileSync } from "node:fs";
import { defineConfig } from "vitest/config";

const pkg = JSON.parse(readFileSync("./package.json", "utf-8")) as { version: string };

export default defineConfig({
  define: { __VERSION__: JSON.stringify(pkg.version) },
  build: {
    target: "es2021",
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "what-happened-card.js",
    },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
  test: { include: ["test/**/*.test.ts"] },
});
