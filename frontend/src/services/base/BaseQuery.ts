import {
  fetchBaseQuery,
  FetchArgs,
  FetchBaseQueryError,
  BaseQueryFn,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { baseUrl } from "config/config";
import { RootState } from "store/BaseStore";
import { logout, setCredentials } from "store/slice/AuthSlice";

// Базовый fetch-запрос с авторизацией
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl(), // Получаем базовый URL из конфига
  prepareHeaders: (headers, { getState }) => {
    // Получаем токен из состояния Redux
    const token = (getState() as RootState).auth.token;

    // Если токен есть — добавляем его в заголовок Authorization
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

/**
 * Расширенный базовый запрос с автообновлением токена.
 * Если токен устарел и получен 401 — пробуем обновить токен и повторить запрос.
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs, // допустимые аргументы запроса: строка (URL) или объект
  unknown, // успешный результат
  FetchBaseQueryError // ошибка
> = async (args, api: BaseQueryApi, extraOptions) => {
  // Типизируем api.getState, чтобы вытянуть данные из auth
  const state = api.getState() as RootState;

  // Делаем изначальный запрос
  let result = await baseQuery(args, api, extraOptions);

  // Проверяем: если сервер вернул ошибку 401 (неавторизован)
  if (result.error && result.error.status === 401) {
    // Пробуем обновить access_token, отправив запрос на /auth/refreshToken
    const refreshResult = await baseQuery(
      "/auth/refreshToken",
      api,
      extraOptions
    );

    // Если обновление прошло успешно
    if (refreshResult.data) {
      // Получаем новый токен из ответа
      const newToken = (refreshResult.data as { access_token: string })
        .access_token;

      // Обновляем состояние auth в Redux (оставляем старого пользователя)
      api.dispatch(setCredentials({ token: newToken, user: state.auth.user! }));

      // Повторяем оригинальный запрос уже с новым токеном
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Если refresh не сработал — логиним пользователя заново (очищаем Redux и localStorage)
      api.dispatch(logout());
    }
  }

  // Возвращаем либо успешный, либо повторный (или неудачный) результат
  return result;
};

export default baseQueryWithReauth;
