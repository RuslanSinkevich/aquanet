import React, { useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { ClientForm } from './ClientForm';
import { IClient } from '../../models/Client/client.model';
import { 
  useGetClientsQuery, 
  useDeleteClientMutation 
} from '../../services/ClientsApi';
import { AuthService } from '../../services/AuthService';
import { UserRole } from '../../common/enums/user-role.enum';

export const ClientsList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState<Partial<IClient> | undefined>(undefined);

  const { data: clients = [], isLoading, error } = useGetClientsQuery();
  const [deleteClient] = useDeleteClientMutation();

  const isAdmin = AuthService.hasRole(UserRole.ADMIN);
  const isAuthorized = AuthService.isAuthenticated();

  if (error) {
    console.error('Error loading clients:', error);
    return <div>Ошибка загрузки данных. Пожалуйста, обновите страницу.</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteClient(id).unwrap();
      message.success('Клиент успешно удален');
    } catch {
      message.error('Ошибка при удалении клиента');
    }
  };

  const baseColumns = [
    {
      title: 'Имя',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Фамилия',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Номер дома',
      dataIndex: 'houseNumber',
      key: 'houseNumber',
    },
    {
      title: 'Позиция (м)',
      dataIndex: 'positionM',
      key: 'positionM',
      render: (value: number | null | undefined) => value !== null && value !== undefined ? value.toFixed(1) : '-',
    },
  ];

  const actionColumn = {
    title: 'Действия',
    key: 'actions',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (_: unknown, record: any) => {
      const fullClient = clients.find(c => c.id === record.id);
      return (
        <Space size="middle">
          {isAdmin && (
            <>
              <Button onClick={() => {
                setEditingClient(fullClient);
                setIsModalVisible(true);
              }}>
                Редактировать
              </Button>
              <Button danger onClick={() => handleDelete(record.id)}>
                Удалить
              </Button>
            </>
          )}
        </Space>
      );
    },
  };

  const columns = [...baseColumns, ...(isAuthorized ? [actionColumn] : [])];

  return (
    <div>
      {isAdmin && (
        <Button 
          type="primary" 
          onClick={() => {
            setEditingClient(undefined);
            setIsModalVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          Добавить клиента
        </Button>
      )}

      <Table 
        dataSource={clients} 
        columns={columns} 
        rowKey="id"
        loading={isLoading}
      />

      <Modal
        title={editingClient ? "Редактировать клиента" : "Добавить клиента"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <ClientForm
          initialValues={editingClient}
          onSuccess={() => {
            setIsModalVisible(false);
            setEditingClient(undefined);
          }}
        />
      </Modal>
    </div>
  );
}; 