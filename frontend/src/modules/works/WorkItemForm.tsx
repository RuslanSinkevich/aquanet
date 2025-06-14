import React, { useEffect } from 'react';
import { Form, Input, InputNumber, DatePicker, Select, Button, message } from 'antd';
import { useCreateWorkItemMutation, useUpdateWorkItemMutation } from '../../services/WorkItemsApi';
import { useGetUsersQuery } from '../../services/UsersApi';
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
  const { data: users } = useGetUsersQuery();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        workDate: initialValues.workDate ? dayjs(initialValues.workDate) : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: IWorkItemCreateDto) => {
    try {
      const submitData = {
        ...values,
        workDate: values.workDate ? dayjs(values.workDate).toISOString() : undefined
      };

      if (initialValues) {
        await updateWorkItem({ id: initialValues.id, workItem: submitData }).unwrap();
        message.success('Работа успешно обновлена');
      } else {
        await createWorkItem(submitData).unwrap();
        message.success('Работа успешно создана');
      }
      form.resetFields();
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting work item:', error);
      message.error('Произошла ошибка при сохранении работы');
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="description"
        label="Описание работы"
        rules={[{ required: true, message: 'Пожалуйста, введите описание работы' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="cost"
        label="Стоимость"
        rules={[
          { required: true, message: 'Пожалуйста, введите стоимость' },
          { type: 'number', min: 0, message: 'Стоимость должна быть положительным числом' }
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="userIds"
        label="Участники оплаты"
        rules={[{ required: true, message: 'Пожалуйста, выберите участников оплаты' }]}
      >
        <Select
          mode="multiple"
          placeholder="Выберите участников оплаты"
          optionFilterProp="children"
        >
          {users?.map(user => (
            <Select.Option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="workDate"
        label="Дата выполнения"
      >
        <DatePicker 
          style={{ width: '100%' }}
          format="DD.MM.YYYY"
        />
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