import React from "react";
import { Form, Input, Button, Alert, Modal } from "antd";
import { useLoginMutation } from "services/AuthApi";
import { useAppDispatch } from "hooks/Redux"; // ваш типизированный useDispatch
import { setCredentials } from "store/slice/AuthSlice"; // ваш slice
import { setAuthCookie } from "utils/Cookies";

interface LoginFormValues {
  phone: string;
  password: string;
}

interface LoginFormProps {
  isShowModal: boolean;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({
  isShowModal,
  setIsShowModal,
}: LoginFormProps) {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const onClose = () => setIsShowModal(false);

  const onFinish = async (values: LoginFormValues) => {
    try {
      // Выполняем мутацию
      const data = await login(values).unwrap();
      // Сохраняем в куку
      setAuthCookie(data.token, data.user);

      // Диспатчим в Redux
      dispatch(
        setCredentials({
          token: data.token,
          user: data.user,
        })
      );
      // Закрываем модалку
      onClose();
    } catch {
      // Ошибка отобразится через error → Alert
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            description={(error as any)?.data?.message}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form.Item
          label="Телефон"
          name="phone"
          rules={[{ required: true, message: "Пожалуйста, введите телефон" }]}
        >
          <Input placeholder="8 999 999 99 99" />
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
