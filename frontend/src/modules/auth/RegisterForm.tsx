import React from "react";
import { Form, Input, Button, message } from "antd";
import { IRegisterRequest } from "models/Users/Auth";
import { useRegisterMutation } from "../../services/AuthApi";
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
  onSuccess?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm<IRegisterRequest>();
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const handleSubmit = async (values: IRegisterRequest) => {
    try {
      await register(values).unwrap();
      message.success('Регистрация успешна');
      form.resetFields();
      if (onSuccess) {
        onSuccess();
      }
      navigate('/');
    } catch {
      message.error('Ошибка при регистрации');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="firstName"
        label="Имя"
        rules={[{ required: true, message: 'Пожалуйста, введите имя' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Фамилия"
        rules={[{ required: true, message: 'Пожалуйста, введите фамилию' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Телефон"
        rules={[{ 
          required: true, 
          message: 'Пожалуйста, введите телефон',
          pattern: /^\+7\d{10}$/,
          transform: (value: string) => value.startsWith('+7') ? value : `+7${value.replace(/\D/g, '')}`
        }]}
      >
        <Input placeholder="+79991234567" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Пароль"
        rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="houseNumber"
        label="Номер дома"
        rules={[{ required: true, message: 'Пожалуйста, введите номер дома' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit"
          loading={isLoading}
          block
        >
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
