import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "hooks/Redux";
import { useGetProfileQuery } from "services/AuthApi";
import { setCredentials, logout } from "store/slice/AuthSlice";
import { Routes, Route } from "react-router-dom";
import { WaterConnectionPage } from './pages/WaterConnectionPage';
import { ConnectionPointsList } from './modules/connection-points/ConnectionPointsList';
import { ClientsList } from './modules/clients/ClientsList';
import WaterConnectionInfo from './modules/info/WaterConnectionScheme';
import { AppLayout } from './components/AppLayout';
import { getAuthToken, getAuthUser } from "utils/Cookies";

export const AppHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const [ready, setReady] = useState(false);

  // Читаем токен и пользователя из куки только один раз при монтировании
  useEffect(() => {
    if (!token) {
      const tokenFromCookie = getAuthToken();
      const userFromCookie = getAuthUser();

      if (tokenFromCookie) {
        dispatch(
          setCredentials({ token: tokenFromCookie, user: userFromCookie })
        );
      }
    }
    setReady(true);
  }, []); // Пустой массив зависимостей

  // Запрос профиля — только если токен есть и ready true
  const {
    data: profile,
    error,
    isFetching,
  } = useGetProfileQuery(undefined, {
    skip: !token || !ready,
  });

  // Обновляем данные пользователя или выходим из аккаунта при ошибке
  useEffect(() => {
    if (!token || !ready || isFetching) return;

    if (profile) {
      dispatch(setCredentials({ token, user: profile }));
    } else if (error) {
      console.log("logout");
      dispatch(logout());
    }
    console.log("token:", token, "ready:", ready);
  }, [token, profile, error, isFetching, ready, dispatch]);

  if (!ready) {
    // Пока читаем куки и не готовы — можно показать загрузку
    return null;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<WaterConnectionPage />} />
        <Route path="/scheme" element={<WaterConnectionInfo />} />
        <Route path="/connection-points" element={<ConnectionPointsList />} />
        <Route path="/clients" element={<ClientsList />} />
        <Route path="/payments" element={<div>Платежи - в разработке</div>} />
        <Route path="/works" element={<div>Работы - в разработке</div>} />
      </Routes>
    </AppLayout>
  );
};
