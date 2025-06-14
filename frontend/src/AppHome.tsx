import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "hooks/Redux";
import { useMeQuery } from "services/AuthApi";
import { setCredentials, logout } from "store/slice/AuthSlice";
import { Routes, Route, Navigate } from "react-router-dom";
import { WaterConnectionPage } from './pages/WaterConnectionPage';
import { ConnectionPointsList } from './modules/connection-points/ConnectionPointsList';
import { UsersList } from './modules/users/UsersList';
import { MaterialsList } from './modules/materials/MaterialsList';
import { WorkItemsList } from './modules/works/WorkItemsList';
import WaterConnectionInfo from './modules/info/WaterConnectionScheme';
import { AppLayout } from './components/AppLayout';
import { getAuthToken, getAuthUser } from "utils/Cookies";
import { RootState } from 'store/store';
import { PaymentsList } from './modules/payments/PaymentsList';

export const AppHome: React.FC = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state: RootState) => state.auth.token);
  const [ready, setReady] = useState(false);

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
  }, [dispatch, token]);

  const {
    data: profile,
    error: meError,
    isFetching,
    isLoading: isMeLoading,
    isSuccess: isMeSuccess,
    isError: isMeErrorOcurred
  } = useMeQuery(undefined, {
    skip: !token || !ready,
  });

  useEffect(() => {
    if (!token || !ready || isFetching || isMeLoading) {
      return;
    }

    if (profile && isMeSuccess) {
      dispatch(setCredentials({ token, user: profile }));
    } else if (meError && isMeErrorOcurred) {
      console.warn("Error during /auth/me request, logging out:", meError);
      dispatch(logout());
    }
  }, [token, profile, meError, isFetching, isMeLoading, isMeSuccess, isMeErrorOcurred, ready, dispatch]);

  if (!ready && !token) {
    return null;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<WaterConnectionPage />} />
        <Route path="/scheme" element={<WaterConnectionInfo />} />
        <Route path="/connection-points" element={<ConnectionPointsList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/materials" element={<MaterialsList />} />
        <Route path="/works" element={<WorkItemsList />} />
        <Route path="/payments" element={<PaymentsList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
};
