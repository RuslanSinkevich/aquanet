import type { ReactElement } from "react";
import React, { createRef, StrictMode } from "react";
import type { RenderOptions } from "@testing-library/react";
import { act, render } from "@testing-library/react";
import { _rs as onEsResize } from "rc-resize-observer/es/utils/observerUtil";
import { _rs as onLibResize } from "rc-resize-observer/lib/utils/observerUtil";

// Утверждает, что объект существует (не undefined и не null)
export function assertsExist<T>(item?: T): asserts item is T {
  expect(item).not.toBeUndefined(); // Проверка на undefined
  expect(item).not.toBeNull(); // Проверка на null
}

const globalTimeout = global.setTimeout;

// Функция "заснуть" для создания задержки в тестах
export const sleep = async (timeout = 0) => {
  await act(async () => {
    await new Promise((resolve) => {
      globalTimeout(resolve, timeout); // Задержка на указанное время
    });
  });
};

// Кастомный рендеринг с использованием StrictMode
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: StrictMode, ...options });

// Рендеринг хуков для тестирования
export function renderHook<T>(func: () => T): {
  result: React.RefObject<T | null>;
} {
  const result = createRef<T>(); // Создаём ссылку для хранения результата

  // Компонент, вызывающий переданный хук
  const Demo: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result as any).current = func(); // Сохраняем результат выполнения хука
    return null;
  };

  customRender(<Demo />); // Рендерим компонент

  return { result }; // Возвращаем результат
}

/**
 * "Чистый" рендеринг без StrictMode.
 * Использовать только для случаев с мемоизацией.
 */
const pureRender = render;

// Экспорт чистого рендера и кастомного рендера
export { pureRender, customRender as render };

// Эмуляция события изменения размеров элемента
export const triggerResize = (target: Element) => {
  const originGetBoundingClientRect = target.getBoundingClientRect;

  // Подменяем метод getBoundingClientRect для возврата заданных размеров
  target.getBoundingClientRect = () => ({ width: 510, height: 903 } as DOMRect);

  // Имитируем вызов событий изменения размера
  act(() => {
    onLibResize([{ target } as ResizeObserverEntry]);
    onEsResize([{ target } as ResizeObserverEntry]);
  });

  // Восстанавливаем оригинальный метод
  target.getBoundingClientRect = originGetBoundingClientRect;
};

/**
 * Убирает динамические классы из HTML перед сравнением со снапшотом.
 * @param html HTML-контент для проверки
 */
export function expectCleanSnapshot(html: string) {
  const cleanedHtml = html.replace(/css-dev-only-do-not-override-[\w-]+/g, "");
  expect(cleanedHtml).toMatchSnapshot();
}

// Экспортируем всё из @testing-library/react
export * from "@testing-library/react";
