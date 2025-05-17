// Общая функция для добавления мока
export const mockWindowProperty = <T extends keyof Window>(
  property: T,
  implementation: Window[T]
) => {
  Object.defineProperty(window, property, {
    writable: true,
    value: implementation,
  });
};

// Мок для matchMedia
export const mockMatchMedia = () => {
  mockWindowProperty(
    "matchMedia",
    vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(), // устарело
      removeListener: vi.fn(), // устарело
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  );
};

// Мок для getComputedStyle
export const mockGetComputedStyle = () => {
  mockWindowProperty(
    "getComputedStyle",
    vi.fn(
      () =>
        ({
          width: "0px",
          height: "0px",
          getPropertyValue: vi.fn(() => ""),
          setProperty: vi.fn(),
          removeProperty: vi.fn(),
          item: vi.fn(),
          // Добавьте только те свойства, которые реально используются
          alignContent: "",
          alignItems: "",
        } as unknown as CSSStyleDeclaration)
    )
  );
};

// Инициализация всех необходимых моков
export const initializeWindowMocks = () => {
  mockMatchMedia();
  mockGetComputedStyle();
};

// Автоматическая инициализация при импорте
initializeWindowMocks();
