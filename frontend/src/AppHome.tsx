import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "hooks/Redux";
import { useGetProfileQuery } from "services/AuthApi";
import { setCredentials, logout } from "store/slice/AuthSlice";
import { Route, Routes } from "react-router-dom";
import PageWaterConnection from "pages/PageWaterConnection";

export default function App() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);

  // 1) Запускаем запрос «/auth/me», но только если есть токен
  const {
    data: profile,
    error,
    isFetching,
  } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  // 2) В одном эффекте обрабатываем и success, и error
  useEffect(() => {
    if (isFetching) return; // ждём окончания
    if (profile) {
      // Пришёл профиль — обновляем user в Redux
      dispatch(setCredentials({ token: token!, user: profile }));
    } else if (error) {
      // Если ошибка (например, 401 или 404) — логаутим
      dispatch(logout());
    }
  }, [profile, error, isFetching, dispatch, token]);

  return (
    <>
      <Routes>
        <Route path="/" element={<PageWaterConnection />} />
      </Routes>
    </>
  );
}
