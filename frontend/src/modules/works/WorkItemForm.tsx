import React from 'react';
import { Form, Input, InputNumber, DatePicker, Select, Button, message } from 'antd';
import { useCreateWorkItemMutation, useUpdateWorkItemMutation } from '../../services/WorkItemsApi';
import { useGetMaterialsQuery } from '../../services/MaterialsApi';
import { useGetConnectionPointsQuery } from '../../services/ConnectionPointsApi';
import type { IWorkItem, IWorkItemCreateDto } from '../../models/WorkItem/work-item.model';
import dayjs from 'dayjs';

interface WorkItemFormProps {
  initialValues?: IWorkItem;
  onSuccess?: () => void;
}

export const WorkItemForm: React.FC<WorkItemFormProps> = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm();
  const [createWorkItem] = useCreateWorkItemMutation();
  const [updateWorkItem] = useUpdateWorkItemMutation();
  const { data: materials } = useGetMaterialsQuery();
  const { data: connectionPoints } = useGetConnectionPointsQuery();

  const handleSubmit = async (values: IWorkItemCreateDto) => {
    try {
      if (initialValues) {
        await updateWorkItem({ id: initialValues.id, workItem: values }).unwrap();
        message.success('Работа успешно обновлена');
      } else {
        await createWorkItem(values).unwrap();
        message.success('Работа успешно создана');
      }
      form.resetFields();
      onSuccess?.();
    } catch {
      message.error('Произошла ошибка при сохранении работы');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues ? {
        ...initialValues,
        workDate: initialValues.workDate ? dayjs(initialValues.workDate) : undefined,
      } : undefined}
    >
      <Form.Item
        name="connectionPointId"
        label="Точка подключения"
        rules={[{ required: true, message: 'Пожалуйста, выберите точку подключения' }]}
      >
        <Select
          showSearch
          placeholder="Выберите точку подключения"
          optionFilterProp="children"
        >
          {connectionPoints?.map(point => (
            <Select.Option key={point.id} value={point.id}>
              {point.address}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="description"
        label="Описание работы"
        rules={[{ required: true, message: 'Пожалуйста, введите описание работы' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="materialId"
        label="Материал"
        rules={[{ required: true, message: 'Пожалуйста, выберите материал' }]}
      >
        <Select
          showSearch
          placeholder="Выберите материал"
          optionFilterProp="children"
        >
          {materials?.map(material => (
            <Select.Option key={material.id} value={material.id}>
              {material.type} ({material.unit})
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="quantity"
        label="Количество"
        rules={[
          { required: true, message: 'Пожалуйста, введите количество' },
          { type: 'number', min: 0, message: 'Количество должно быть положительным числом' }
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="userIds"
        label="Исполнители"
        rules={[{ required: true, message: 'Пожалуйста, выберите исполнителей' }]}
      >
        <Select
          mode="multiple"
          placeholder="Выберите исполнителей"
          optionFilterProp="children"
        >
          {/* Здесь нужно будет добавить список пользователей */}
        </Select>
      </Form.Item>

      <Form.Item
        name="workDate"
        label="Дата выполнения"
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="comment"
        label="Комментарий"
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? 'Обновить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
}; 