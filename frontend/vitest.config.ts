import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom", // Настроим тестирование с использованием jsdom (для React)
    globals: true, // Подключаем глобальные переменные, такие как describe, it, expect
    coverage: {
      provider: "v8", // Провайдер для покрытия
      reporter: ["text", "json", "html"], // Форматы отчётов покрытия
      include: ["src/**/*.{ts,tsx}"], // Покрытие только для src
    },
    setupFiles: [
      "./src/tests/__mocks__/window.mock.ts",
      "./src/tests/__mocks__/Shared.mock.ts"
    ], // Файл для начальной настройки
    isolate: true, // Изоляция тестов
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
});
