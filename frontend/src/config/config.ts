export const baseUrl = () => {
  // Используем переменную из .env-cmdrc
  const apiHost = import.meta.env.VITE__API_HOST;
  
  if (apiHost) {
    // Убеждаемся, что URL заканчивается на /
    return apiHost.endsWith('/') ? apiHost : `${apiHost}/`;
  }
  
  // Fallback для случаев, когда переменная не задана
  if (import.meta.env.DEV) {
    // Локальная разработка
    return "http://localhost:3001/";
  } else {
    // Продакшен - используем IP сервера
    return "http://91.84.98.3:3001/";
  }
};

