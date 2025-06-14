import React, { useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetPaymentsQuery, useDeletePaymentMutation } from '../../services/PaymentsApi';
import { useGetUsersQuery } from '../../services/UsersApi';
import { PaymentForm } from './PaymentForm';
import type { IPayment } from '../../models/Payment/payment.model';
import dayjs from 'dayjs';

export const PaymentsList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<IPayment | null>(null);
  const { data: payments, isLoading, refetch } = useGetPaymentsQuery();
  const { data: users } = useGetUsersQuery();
  const [deletePayment] = useDeletePaymentMutation();

  const getUserName = (userId: number) => {
    const user = users?.find(u => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : 'Неизвестный пользователь';
  };

  const handleAdd = () => {
    setSelectedPayment(null);
    setIsModalVisible(true);
  };

  const handleEdit = (payment: IPayment) => {
    setSelectedPayment(payment);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePayment(id).unwrap();
      message.success('Платеж успешно удален');
      refetch();
    } catch {
      message.error('Ошибка при удалении платежа');
    }
  };

  const columns = [
    {
      title: 'Пользователь',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId: number) => getUserName(userId),
    },
    {
      title: 'Сумма',
      dataIndex: 'amount',
      key: 'amount',
      render: (value: number) => `₽ ${value.toLocaleString()}`,
    },
    {
      title: 'Дата платежа',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (value: string) => dayjs(value).format('DD.MM.YYYY'),
    },
    {
      title: 'Документ',
      dataIndex: 'docLink',
      key: 'docLink',
      render: (value: string) => value ? (
        <a href={value} target="_blank" rel="noopener noreferrer">
          Открыть документ
        </a>
      ) : '-',
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: IPayment) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Редактировать
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Удалить
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Добавить платеж
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={payments}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={selectedPayment ? 'Редактировать платеж' : 'Добавить платеж'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <PaymentForm
          initialValues={selectedPayment || undefined}
          onSuccess={() => {
            setIsModalVisible(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
}; 