import React from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import type { IMaterial, IMaterialCreateDto } from '../../models/Material/material.model';
import { 
  useCreateMaterialMutation,
  useUpdateMaterialMutation,
} from '../../services/MaterialsApi';

interface IMaterialFormProps {
  initialValues?: Partial<IMaterial>;
  onSuccess: () => void;
}

export const MaterialForm: React.FC<IMaterialFormProps> = ({
  initialValues,
  onSuccess,
}) => {
  const [form] = Form.useForm<IMaterialCreateDto>();
  const [createMaterial, { isLoading: isCreating }] = useCreateMaterialMutation();
  const [updateMaterial, { isLoading: isUpdating }] = useUpdateMaterialMutation();

  const handleSubmit = async (values: IMaterialCreateDto) => {
    try {
      if (initialValues?.id) {
        await updateMaterial({ 
          id: initialValues.id, 
          material: values 
        }).unwrap();
        message.success('Материал успешно обновлен');
      } else {
        await createMaterial(values).unwrap();
        message.success('Материал успешно создан');
      }
      form.resetFields();
      onSuccess();
    } catch {
      message.error(
        initialValues?.id
          ? 'Ошибка при обновлении материала'
          : 'Ошибка при создании материала'
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
        name="type"
        label="Тип материала"
        rules={[{ required: true, message: 'Пожалуйста, введите тип материала' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="comment"
        label="Комментарий"
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="unit"
        label="Единица измерения"
        rules={[{ required: true, message: 'Пожалуйста, укажите единицу измерения' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="unit_cost"
        label="Стоимость за единицу"
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