import React, { useState } from 'react';
import { Table, Button, Space, Modal, message, Tag, Dropdown } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, MoreOutlined, CheckOutlined, StopOutlined, UnlockOutlined, LockOutlined } from '@ant-design/icons';
import { ClientForm } from './ClientForm';
import { IClient } from '../../models/Client/client.model';
import { 
  useGetClientsQuery, 
  useDeleteClientMutation,
  useUpdateClientMutation
} from '../../services/ClientsApi';
import { AuthService } from '../../services/AuthService';
import { UserRole } from '../../common/enums/user-role.enum';

export const ClientsList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const { data: clients, isLoading, refetch } = useGetClientsQuery();
  const [deleteClient] = useDeleteClientMutation();
  const [updateClient] = useUpdateClientMutation();

  const isAdmin = AuthService.hasRole(UserRole.ADMIN);
  const isForeman = AuthService.hasRole(UserRole.PRORAB);

  const handleAdd = () => {
    setSelectedClient(null);
    setIsModalVisible(true);
  };

  const handleEdit = (client: IClient) => {
    setSelectedClient(client);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteClient(id).unwrap();
      message.success('Клиент успешно удален');
      refetch();
    } catch {
      message.error('Ошибка при удалении клиента');
    }
  };

  const handleToggleBan = async (client: IClient) => {
    try {
      await updateClient({
        id: client.id,
        client: { 
          firstName: client.firstName,
          lastName: client.lastName,
          phone: client.phone,
          address: client.address,
          banned: !client.banned 
        }
      }).unwrap();
      message.success(`Клиент ${client.banned ? 'разблокирован' : 'заблокирован'}`);
      refetch();
    } catch {
      message.error('Ошибка при изменении статуса блокировки');
    }
  };

  const handleToggleConfirm = async (client: IClient) => {
    try {
      await updateClient({
        id: client.id,
        client: { 
          firstName: client.firstName,
          lastName: client.lastName,
          phone: client.phone,
          address: client.address,
          isConfirmed: !client.isConfirmed 
        }
      }).unwrap();
      message.success(`Клиент ${client.isConfirmed ? 'отклонен' : 'подтвержден'}`);
      refetch();
    } catch {
      message.error('Ошибка при изменении статуса подтверждения');
    }
  };

  const getRoleTag = (role: number) => {
    switch (role) {
      case 0:
        return <Tag color="red">Админ</Tag>;
      case 1:
        return <Tag color="blue">Прораб</Tag>;
      case 2:
        return <Tag color="green">Пользователь</Tag>;
      default:
        return <Tag>Неизвестно</Tag>;
    }
  };

  const getAdminMenuItems = (client: IClient) => [
    {
      key: 'edit',
      label: 'Редактировать',
      icon: <EditOutlined />,
      onClick: () => handleEdit(client),
    },
    {
      key: 'confirm',
      label: client.isConfirmed ? 'Отклонить' : 'Подтвердить',
      icon: client.isConfirmed ? <StopOutlined /> : <CheckOutlined />,
      onClick: () => handleToggleConfirm(client),
    },
    {
      key: 'ban',
      label: client.banned ? 'Разблокировать' : 'Заблокировать',
      icon: client.banned ? <UnlockOutlined /> : <LockOutlined />,
      onClick: () => handleToggleBan(client),
    },
    {
      key: 'delete',
      label: 'Удалить',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => handleDelete(client.id),
    },
  ];

  const getForemanMenuItems = (client: IClient) => [
    {
      key: 'edit',
      label: 'Редактировать',
      icon: <EditOutlined />,
      onClick: () => handleEdit(client),
    },
    {
      key: 'confirm',
      label: client.isConfirmed ? 'Отклонить' : 'Подтвердить',
      icon: client.isConfirmed ? <StopOutlined /> : <CheckOutlined />,
      onClick: () => handleToggleConfirm(client),
    },
  ];

  const columns = [
    {
      title: 'ФИО',
      key: 'fullName',
      render: (record: IClient) => 
        `${record.lastName} ${record.firstName}`.trim(),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Адрес',
      dataIndex: 'houseNumber',
      key: 'houseNumber',
    },
    {
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (role: number) => getRoleTag(role),
    },
    {
      title: 'Статус',
      key: 'status',
      render: (record: IClient) => (
        <Space>
          {record.isConfirmed ? (
            <Tag color="success">Подтвержден</Tag>
          ) : (
            <Tag color="warning">Не подтвержден</Tag>
          )}
          {record.banned && <Tag color="error">Заблокирован</Tag>}
        </Space>
      ),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: IClient) => {
        if (!isAdmin && !isForeman) return null;
        
        const menuItems = isAdmin 
          ? getAdminMenuItems(record)
          : getForemanMenuItems(record);

        return (
          <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      {(isAdmin || isForeman) && (
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Добавить клиента
          </Button>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={clients}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={selectedClient ? 'Редактировать клиента' : 'Добавить клиента'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <ClientForm
          initialValues={selectedClient || undefined}
          onSuccess={() => {
            setIsModalVisible(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
}; 