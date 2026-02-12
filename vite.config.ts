import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NEXT_PUBLIC_API_BASE_URL": JSON.stringify(
      process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
    ),
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/testing/setupTest.ts",
    coverage: {
      provider: "v8",
      reportsDirectory: "./coverage",
      reporter: ["lcov"],
    },
    exclude: ["node_modules", "dist", "build", "public", "src/utils/testing"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      util: "node:util",
    },
  },
});
