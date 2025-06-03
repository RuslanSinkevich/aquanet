import React from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { 
  IConnectionPoint,
  IConnectionPointCreateDto 
} from '../../models/ConnectionPoint/connection-point.model';
import { 
  useCreateConnectionPointMutation,
  useUpdateConnectionPointMutation,
} from '../../services/ConnectionPointsApi';

interface IConnectionPointFormProps {
  initialValues?: Partial<IConnectionPoint>;
  onSuccess: () => void;
}

export const ConnectionPointForm: React.FC<IConnectionPointFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const [createPoint, { isLoading: isCreating }] = useCreateConnectionPointMutation();
  const [updatePoint, { isLoading: isUpdating }] = useUpdateConnectionPointMutation();

  const handleSubmit = async (values: Partial<IConnectionPoint>) => {
    try {
      if (initialValues?.id) {
        await updatePoint({ 
          id: initialValues.id, 
          point: values 
        }).unwrap();
        message.success('Точка подключения успешно обновлена');
      } else {
        const createDto: IConnectionPointCreateDto = {
          name: values.name!,
          address: values.address!,
          type: values.type!,
          positionM: values.positionM || 0,
          totalCost: values.totalCost || 0,
        };
        await createPoint(createDto).unwrap();
        message.success('Точка подключения успешно создана');
      }
      form.resetFields();
      onSuccess();
    } catch {
      message.error(
        initialValues?.id
          ? 'Ошибка при обновлении точки подключения'
          : 'Ошибка при создании точки подключения'
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
        name="name"
        label="Название"
        rules={[{ required: true, message: 'Пожалуйста, введите название' }]}
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

      <Form.Item
        name="type"
        label="Тип"
        rules={[{ required: true, message: 'Пожалуйста, укажите тип' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="positionM"
        label="Позиция (м)"
        rules={[{ required: true, message: 'Пожалуйста, укажите позицию' }]}
      >
        <InputNumber min={0} step={0.1} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="totalCost"
        label="Общая стоимость"
        rules={[{ required: true, message: 'Пожалуйста, укажите стоимость' }]}
      >
        <InputNumber
          min={0}
          step={100}
          style={{ width: '100%' }}
          formatter={(value) => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value: string | undefined) => {
            const parsed = value?.replace(/₽\s?|(,*)/g, '');
            return parsed ? Number(parsed) : 0;
          }}
        />
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