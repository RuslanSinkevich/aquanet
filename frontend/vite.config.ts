import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import Checker from "vite-plugin-checker";
import { visualizer } from "rollup-plugin-visualizer";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3001,
    hmr: true,
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, "./src/utils"),
      components: path.resolve(__dirname, "./src/components"),
      images: path.resolve(__dirname, "./src/images"),
      store: path.resolve(__dirname, "./src/store"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      models: path.resolve(__dirname, "./src/models"),
      config: path.resolve(__dirname, "./src/config"),
      pages: path.resolve(__dirname, "./src/pages"),
      scss: path.resolve(__dirname, "./src/scss"),
      services: path.resolve(__dirname, "./src/services"),
      modules: path.resolve(__dirname, "./src/modules"),
      enum: path.resolve(__dirname, "./src/enum"),
      tests: path.resolve(__dirname, "./src/tests"),
    },
  },
  plugins: [
    react(),
    viteTsconfigPaths(),   
    Checker({
      typescript: true,
      eslint: {
        lintCommand: 'eslint "./src/"',
        useFlatConfig: true,
      },
    }),
    visualizer({
      open: false, // Автоматически открывать страницу с бандлами в браузере после сборки
    }),
  ],
  define: {
    "process.env": {}, // Добавляем глобальную переменную process.env
  },
  build: {
    outDir: "build", // Указываем новую папку для сборки
    rollupOptions: {
      output: {
        manualChunks: {
          // Выделение основных библиотек в отдельные чанки
          vendor_react: ["react", "react-dom"],
          vendor_antd: ["antd"],
        },
      },
      external: [
        '**/__tests__/**', // Исключить папку tests
        '**/__mocks__/**', // Исключить папку mocks
        '**/__snapshots__/**' // Исключить папку snapshots
      ],
    },
    chunkSizeWarningLimit: 2500, // Устанавливаем предел в 2.5 mb (по умолчанию 500 KB)
  },
});
