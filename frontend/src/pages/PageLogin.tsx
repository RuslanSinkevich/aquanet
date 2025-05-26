// src/pages/PageLogin.tsx
import React from 'react';
import LayoutPage from './layout/LayoutPage';
import LoginForm from 'modules/auth/LoginForm';

export default function PageLogin() {
  React.useEffect(() => {
    document.title = 'Вход в систему';
  }, []);

  return (
    <LayoutPage>
      <LoginForm />
    </LayoutPage>
  );
}