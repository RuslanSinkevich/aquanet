import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { 
  IClient, 
  ICreateClientDto, 
  IUpdateClientDto, 
  IClientConnectionPoint 
} from '../../models/Client/client.model';
import { 
  useCreateClientMutation,
  useUpdateClientMutation,
} from '../../services/ClientsApi';

interface IClientFormProps {
  initialValues?: Partial<IClient>;
  onSuccess: () => void;
}

export const ClientForm: React.FC<IClientFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const [form] = Form.useForm<ICreateClientDto>();
  const [createClient, { isLoading: isCreating }] = useCreateClientMutation();
  const [updateClient, { isLoading: isUpdating }] = useUpdateClientMutation();

  const handleSubmit = async (values: ICreateClientDto) => {
    try {
      if (initialValues?.id) {
        const connectionPoints = (initialValues.connectionPoints || []).map(cp => ({
          clientId: initialValues.id!,
          connectionPointId: cp.id,
          paymentShare: 0,
          isInitial: true,
          joinedAt: new Date().toISOString()
        })) as IClientConnectionPoint[];

        const updateData: IUpdateClientDto = {
          client: values,
          connectionPoints
        };

        await updateClient({ 
          id: initialValues.id, 
          data: updateData
        }).unwrap();
        message.success('Клиент успешно обновлен');
      } else {
        await createClient(values).unwrap();
        message.success('Клиент успешно создан');
      }
      form.resetFields();
      onSuccess();
    } catch {
      message.error(
        initialValues?.id
          ? 'Ошибка при обновлении клиента'
          : 'Ошибка при создании клиента'
      );
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
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
          loading={isCreating || isUpdating}
          block
        >
          {initialValues?.id ? 'Обновить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
}; 