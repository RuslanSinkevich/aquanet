import globals from "globals";
import react from "eslint-plugin-react"; // Подключение eslint-plugin-react
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import tsEslintPlugin from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";
import jsxA11y from "eslint-plugin-jsx-a11y";

import prettierConfig from "eslint-config-prettier"; // Подключение eslint-config-prettier

export default [
  // Игнорируемые файлы/папки
  { ignores: ["dist"] },

  // Общая конфигурация
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsEslintParser,
      globals: {
        ...globals.node,
        myCustomGlobal: "readonly",
      },
    },
    // Подключаем плагины
    plugins: {
      react, // React
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@typescript-eslint": tsEslintPlugin, // TypeScript
      "jsx-a11y": jsxA11y, // Проверки доступности
    },
    // Настройки
    settings: {
      react: {
        version: "detect", // Автоматическое определение версии React
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
    // Правила
    rules: {
      eqeqeq: 2,
      "react/jsx-first-prop-new-line": [2, "multiline"],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/prop-types": "off",
      "jsx-a11y/no-static-element-interactions": "warn",
      "jsx-a11y/click-events-have-key-events": "warn",
      "react-hooks/exhaustive-deps": "off",
    },
  },

  // Подключение Prettier как конфигурации
  prettierConfig,

  // Применение правил для TypeScript файлов
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // Пример правила
    },
  },
];
