import React from "react";
import { Form, Input, Button, Alert, Modal } from "antd";
import { useLoginMutation } from "services/AuthApi";
import { useAppDispatch } from "hooks/Redux"; // ваш типизированный useDispatch
import { setCredentials } from "store/slice/AuthSlice"; // ваш slice
import { setAuthCookie } from "utils/Cookies";
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ILoginFormValues {
  phone: string;
  password: string;
}

interface ILoginFormProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: () => void;
}

interface IErrorResponse {
  message: string;
}

export default function LoginForm({
  isShowModal,
  setIsShowModal,
  onSuccess,
}: ILoginFormProps) {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClose = () => setIsShowModal(false);

  const onFinish = async (values: ILoginFormValues) => {
    try {
      // Выполняем мутацию
      const data = await login(values).unwrap();
      // Сохраняем в куку
      setAuthCookie(data.access_token, data.user);

      // Диспатчим в Redux
      dispatch(
        setCredentials({
          token: data.access_token,
          user: data.user,
        })
      );
      // Закрываем модалку
      onClose();
      onSuccess?.();
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Modal
      title="Вход в систему"
      open={isShowModal}
      footer={null}
      onCancel={onClose}
      destroyOnClose
    >
      <Form
        name="login"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        {error && (
          <Alert
            message="Ошибка входа"
            description={((error as FetchBaseQueryError).data as IErrorResponse)?.message || 'Произошла ошибка при входе'}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form.Item
          label="Телефон"
          name="phone"
          rules={[{ 
            required: true, 
            message: "Пожалуйста, введите телефон",
            pattern: /^8\d{10}$/,
            transform: (value: string) => {
              const digits = value.replace(/\D/g, '');
              if (digits.startsWith('7')) {
                return '8' + digits.slice(1);
              }
              if (!digits.startsWith('8')) {
                return '8' + digits;
              }
              return digits;
            }
          }]}
        >
          <Input placeholder="89509848017" />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
        >
          <Input.Password placeholder="Пароль" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
