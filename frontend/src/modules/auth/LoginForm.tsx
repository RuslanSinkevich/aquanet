import React from "react";
import { Form, Input, Button, Alert } from "antd";
import { useRegisterMutation } from "services/AuthApi";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
  houseNumber: string;
}

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [register, { isLoading, error }] = useRegisterMutation();

  const onFinish = async (values: RegisterFormValues) => {
    try {
      await register(values).unwrap();
      if (onSuccess) onSuccess();
    } catch {
      // Ошибка отобразится через error в Alert
    }
  };

  return (
    <Form
      name="register"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400, margin: "0 auto" }}
    >
      {error && (
        <Alert
          message="Ошибка регистрации"
          description={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (error as any)?.data?.message || "Произошла ошибка при регистрации"
          }
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

      <Form.Item
        label="Имя"
        name="firstName"
        rules={[{ required: true, message: "Пожалуйста, введите имя" }]}
      >
        <Input placeholder="Имя" />
      </Form.Item>

      <Form.Item
        label="Фамилия"
        name="lastName"
        rules={[{ required: true, message: "Пожалуйста, введите фамилию" }]}
      >
        <Input placeholder="Фамилия" />
      </Form.Item>

      <Form.Item
        label="Телефон"
        name="phone"
        rules={[
          { required: true, message: "Пожалуйста, введите телефон" },
          {
            pattern: /^[\d\s\+\-\(\)]{10,}$/,
            message: "Введите корректный номер телефона",
          },
        ]}
      >
        <Input placeholder="+7 999 999 99 99" />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[{ required: true, message: "Пожалуйста, введите пароль" }]}
        hasFeedback
      >
        <Input.Password placeholder="Пароль" />
      </Form.Item>

      <Form.Item
        label="Номер дома"
        name="houseNumber"
        rules={[{ required: true, message: "Пожалуйста, введите номер дома" }]}
      >
        <Input placeholder="Номер дома" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
}
