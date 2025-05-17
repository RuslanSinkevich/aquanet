
export const SWITCH_BASE_URL = "switchBaseUrl";

export const baseUrl = () => {
  // Определение базового URL в зависимости от окружения, папка env в корне проекта.
  return import.meta.env.VITE__API_HOST;
};

export const Config = () => {
  baseUrl();
};
