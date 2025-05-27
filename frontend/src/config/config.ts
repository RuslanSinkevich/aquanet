export const baseUrl = () => {
  // Определение базового URL в зависимости от окружения, папка env в корне проекта.
  return import.meta.env.VITE_API_HOST || "http://localhost:3000/";
};

