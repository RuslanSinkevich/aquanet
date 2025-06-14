import React from 'react';
import { Form, Input, InputNumber, DatePicker, Select, Button, message } from 'antd';
import { useCreatePaymentMutation, useUpdatePaymentMutation } from '../../services/PaymentsApi';
import { useGetUsersQuery } from '../../services/UsersApi';
import type { IPayment, IPaymentCreateDto } from '../../models/Payment/payment.model';
import dayjs from 'dayjs';

interface PaymentFormProps {
  initialValues?: IPayment;
  onSuccess?: () => void;
}

interface PaymentFormValues {
  userId: number;
  amount: number;
  paymentDate: dayjs.Dayjs;
  docLink?: string;
  comment?: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm<PaymentFormValues>();
  const [createPayment] = useCreatePaymentMutation();
  const [updatePayment] = useUpdatePaymentMutation();
  const { data: users } = useGetUsersQuery();

  const onFinish = async (values: PaymentFormValues) => {
    try {
      const paymentData: IPaymentCreateDto = {
        ...values,
        paymentDate: values.paymentDate.toISOString()
      };

      if (initialValues) {
        await updatePayment({ id: initialValues.id, payment: paymentData }).unwrap();
        message.success('Платеж успешно обновлен');
      } else {
        await createPayment(paymentData).unwrap();
        message.success('Платеж успешно создан');
      }

      form.resetFields();
      onSuccess?.();
    } catch {
      message.error('Произошла ошибка при сохранении платежа');
    }
  };

  return (
    <Form<PaymentFormValues>
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues ? {
        ...initialValues,
        paymentDate: initialValues.paymentDate ? dayjs(initialValues.paymentDate) : undefined,
      } : undefined}
    >
      <Form.Item
        name="userId"
        label="Пользователь"
        rules={[{ required: true, message: 'Пожалуйста, выберите пользователя' }]}
      >
        <Select
          showSearch
          placeholder="Выберите пользователя"
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
        name="amount"
        label="Сумма"
        rules={[
          { required: true, message: 'Пожалуйста, введите сумму' },
          { type: 'number', min: 0, message: 'Сумма должна быть положительным числом' }
        ]}
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="paymentDate"
        label="Дата платежа"
        rules={[{ required: true, message: 'Пожалуйста, выберите дату платежа' }]}
      >
        <DatePicker 
          style={{ width: '100%' }}
          format="DD.MM.YYYY"
        />
      </Form.Item>

      <Form.Item
        name="docLink"
        label="Ссылка на документ"
      >
        <Input placeholder="Ссылка на чек или квитанцию" />
      </Form.Item>

      <Form.Item
        name="comment"
        label="Комментарий"
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {initialValues ? 'Обновить' : 'Создать'}
        </Button>
      </Form.Item>
    </Form>
  );
}; 