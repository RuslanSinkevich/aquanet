import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { 
  IClient, 
  ICreateClientDto, 
  IUpdateClientDto
} from '../../models/Client/client.model';
import { 
  useCreateClientMutation,
  useUpdateClientMutation
} from '../../services/ClientsApi';

interface ClientFormProps {
  initialValues?: Partial<IClient>;
  onSuccess?: () => void;
}

export const ClientForm: React.FC<ClientFormProps> = ({ 
  initialValues, 
  onSuccess 
}) => {
  const [form] = Form.useForm();
  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();

  const onFinish = async (values: ICreateClientDto | IUpdateClientDto) => {
    try {
      if (initialValues?.id) {
        await updateClient({ 
          id: initialValues.id, 
          client: values as IUpdateClientDto
        }).unwrap();
        message.success('Клиент успешно обновлен');
      } else {
        await createClient(values as ICreateClientDto).unwrap();
        message.success('Клиент успешно создан');
      }
      form.resetFields();
      onSuccess?.();
    } catch {
      message.error('Произошла ошибка при сохранении клиента');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
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
        rules={[{ required: true, message: 'Пожалуйста, введите телефон' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="address"
        label="Адрес"
        rules={[{ required: true, message: 'Пожалуйста, введите адрес' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues?.id ? 'Обновить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
}; 