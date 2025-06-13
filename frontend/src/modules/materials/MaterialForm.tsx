import React from 'react';
import { Form, Input, InputNumber, Button, message } from 'antd';
import { useCreateMaterialMutation, useUpdateMaterialMutation } from '../../services/MaterialsApi';
import type { IMaterial, IMaterialCreateDto } from '../../models/Material/material.model';

interface MaterialFormProps {
  initialValues?: IMaterial;
  onSuccess?: () => void;
}

export const MaterialForm: React.FC<MaterialFormProps> = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm();
  const [createMaterial] = useCreateMaterialMutation();
  const [updateMaterial] = useUpdateMaterialMutation();

  const handleSubmit = async (values: IMaterialCreateDto) => {
    try {
      if (initialValues) {
        await updateMaterial({ id: initialValues.id, material: values }).unwrap();
        message.success('Материал успешно обновлен');
      } else {
        await createMaterial(values).unwrap();
        message.success('Материал успешно создан');
      }
      form.resetFields();
      onSuccess?.();
    } catch {
      message.error('Произошла ошибка при сохранении материала');
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
        name="unit"
        label="Единица измерения"
        rules={[{ required: true, message: 'Пожалуйста, введите единицу измерения' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="unitCost"
        label="Стоимость за единицу"
        rules={[
          { required: true, message: 'Пожалуйста, введите стоимость' },
          { type: 'number', min: 0, message: 'Стоимость должна быть положительным числом' }
        ]}
      >
        <InputNumber
          style={{ width: '100%' }}
          formatter={value => `₽ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value!.replace(/₽\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item
        name="comment"
        label="Комментарий"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Обновить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
}; 