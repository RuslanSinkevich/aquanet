import React from "react";
import { Form, Input, Button, message, Alert } from "antd";
import { IAuthRegisterRequest } from "models/Users/Auth";
import { useRegisterMutation, useLoginMutation } from "../../services/AuthApi";
import { useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch } from "hooks/Redux";
import { setCredentials } from "store/slice/AuthSlice";
import { setAuthCookie } from "utils/Cookies";

interface IRegisterFormProps {
  onSuccess: () => void;
}

interface IErrorResponse {
  message: string;
}

export const RegisterForm: React.FC<IRegisterFormProps> = ({ onSuccess }) => {
  const [form] = Form.useForm<IAuthRegisterRequest>();
  const [register, { isLoading: isRegistering, error }] = useRegisterMutation();
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: IAuthRegisterRequest) => {
    try {
      await register(values).unwrap();
      message.success('Регистрация успешна');
      
      // Автоматически входим после регистрации
      const loginData = await login({
        phone: values.phone,
        password: values.password
      }).unwrap();
      
      setAuthCookie(loginData.access_token, loginData.user);
      dispatch(setCredentials({ token: loginData.access_token, user: loginData.user }));
      
      form.resetFields();
      if (onSuccess) {
        onSuccess();
      }
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      message.error('Ошибка при регистрации');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      {error && (
        <Alert
          message="Ошибка регистрации"
          description={((error as FetchBaseQueryError).data as IErrorResponse)?.message || 'Произошла ошибка при регистрации'}
          type="error"
          showIcon
          style={{ marginBottom: 16 }}
        />
      )}

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
        name="password"
        label="Пароль"
        rules={[
          { required: true, message: 'Пожалуйста, введите пароль' },
          { min: 6, message: 'Пароль должен быть не менее 6 символов' }
        ]}
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
          loading={isRegistering || isLoggingIn}
          block
        >
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};
