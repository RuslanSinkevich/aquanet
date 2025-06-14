import React, { useEffect } from 'react';
import { Form, Input, Button, message, Select, Space, Switch } from 'antd';
import { useCreateUserMutation, useUpdateUserMutation } from '../../services/UsersApi';
import { IUser, IUserCreateDto, IUserUpdateDto, UserRole } from '../../models/Users/user.model';
import { AuthService } from '../../services/AuthService';

interface IUserFormProps {
  initialValues?: Partial<IUser>;
  onSuccess?: () => void;
}

interface IFormValues extends Partial<IUser> {
  password?: string;
}

export const UserForm: React.FC<IUserFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: IFormValues) => {
    try {
      if (initialValues?.id) {
        const updateDto: IUserUpdateDto = {
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          houseNumber: values.houseNumber,
          role: values.role,
          isConfirmed: values.isConfirmed,
          banned: values.banned,
        };
        await updateUser({
          id: initialValues.id,
          user: updateDto,
        }).unwrap();
        message.success('Пользователь успешно обновлен');
      } else {
        const createDto: IUserCreateDto = {
          firstName: values.firstName!,
          lastName: values.lastName!,
          phone: values.phone!,
          houseNumber: values.houseNumber!,
          password: values.password!,
          role: values.role,
        };
        await createUser(createDto).unwrap();
        message.success('Пользователь успешно создан');
      }
      form.resetFields();
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error saving user:', err);
      message.error('Произошла ошибка при сохранении пользователя');
    }
  };

  const roleOptions = [
    { label: 'Администратор', value: UserRole.ADMIN },
    { label: 'Прораб', value: UserRole.PRORAB },
    { label: 'Пользователь', value: UserRole.USER },
  ];

  const isAdmin = AuthService.hasRole(UserRole.ADMIN);

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
        rules={[
          { required: true, message: 'Пожалуйста, введите телефон' },
          { pattern: /^\+?[1-9]\d{10,14}$/, message: 'Введите корректный номер телефона' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="houseNumber"
        label="Номер дома"
        rules={[{ required: true, message: 'Пожалуйста, введите номер дома' }]}
      >
        <Input />
      </Form.Item>

      {!initialValues?.id && (
        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль' },
            { min: 6, message: 'Пароль должен быть не менее 6 символов' },
          ]}
        >
          <Input.Password />
        </Form.Item>
      )}

      {isAdmin && (
        <>
          <Form.Item
            name="role"
            label="Роль"
            rules={[{ required: true, message: 'Пожалуйста, выберите роль' }]}
          >
            <Select options={roleOptions} />
          </Form.Item>

          {initialValues?.id && (
            <>
              <Form.Item
                name="isConfirmed"
                label="Подтвержден"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="banned"
                label="Заблокирован"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </>
          )}
        </>
      )}

      <Form.Item>
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={onSuccess}>
            Отмена
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isCreating || isUpdating}
          >
            {initialValues?.id ? 'Обновить' : 'Создать'}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}; 