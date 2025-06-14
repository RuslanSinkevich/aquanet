import React, { useState } from 'react';
import { Table, Button, Space, Modal, message, Tag, Tooltip } from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  CheckCircleOutlined, 
  StopOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { useGetUsersQuery, useDeleteUserMutation } from '../../services/UsersApi';
import { IUser } from '../../models/Users/user.model';
import { UserForm } from './UserForm';
import { AuthService } from '../../services/AuthService';
import { UserRole } from '../../models/Users/user.model';

export const UsersList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const { data: users, isLoading, refetch } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();

  const isAdmin = AuthService.hasRole(UserRole.ADMIN);
  const isAuthorized = AuthService.isAuthenticated();

  const handleAdd = () => {
    setSelectedUser(null);
    setIsModalVisible(true);
  };

  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteUser(id).unwrap();
      message.success('Пользователь успешно удален');
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error);
      message.error('Ошибка при удалении пользователя');
    }
  };

  const getStatusTag = (user: IUser) => {
    if (user.banned) {
      return (
        <Tooltip title="Пользователь заблокирован">
          <Tag color="error" icon={<StopOutlined />}>
            Заблокирован
          </Tag>
        </Tooltip>
      );
    }
    if (user.isConfirmed) {
      if (user.role === UserRole.PRORAB) {
        return (
          <Tooltip title="Прораб подтвержден">
            <Tag color="success" icon={<CheckCircleOutlined />}>
              Подтвержден
            </Tag>
          </Tooltip>
        );
      }
      if (user.role === UserRole.ADMIN) {
        return (
          <Tooltip title="Администратор подтвержден">
            <Tag color="success" icon={<CheckCircleOutlined />}>
              Подтвержден
            </Tag>
          </Tooltip>
        );
      }
      return (
        <Tooltip title="Пользователь подтвержден">
          <Tag color="success" icon={<CheckCircleOutlined />}>
            Подтвержден
          </Tag>
        </Tooltip>
      );
    }
    if (user.role === UserRole.PRORAB) {
      return (
        <Tooltip title="Ожидает подтверждения">
          <Tag color="warning" icon={<ClockCircleOutlined />}>
            Ожидает
          </Tag>
        </Tooltip>
      );
    }
    if (user.role === UserRole.ADMIN) {
      return (
        <Tooltip title="Требуется подтверждение">
          <Tag color="warning" icon={<ExclamationCircleOutlined />}>
            Не подтвержден
          </Tag>
        </Tooltip>
      );
    }
    return (
      <Tooltip title="Требуется подтверждение">
        <Tag color="warning" icon={<ExclamationCircleOutlined />}>
          Не подтвержден
        </Tag>
      </Tooltip>
    );
  };

  const columns = [
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
      title: 'Роль',
      dataIndex: 'role',
      key: 'role',
      render: (role: UserRole) => {
        const roleMap = {
          [UserRole.ADMIN]: <Tag color="error">Администратор</Tag>,
          [UserRole.PRORAB]: <Tag color="warning">Прораб</Tag>,
          [UserRole.USER]: <Tag color="default">Пользователь</Tag>,
        };
        return roleMap[role] || role;
      },
    },
    {
      title: 'Статус',
      key: 'status',
      render: (_: unknown, record: IUser) => getStatusTag(record),
    },
    ...(isAuthorized ? [{
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: IUser) => (
        <Space>
          {isAdmin && (
            <>
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
            </>
          )}
        </Space>
      ),
    }] : []),
  ];

  return (
    <div>
      {isAdmin && (
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAdd}
          >
            Добавить пользователя
          </Button>
        </div>
      )}

      <Table
        columns={columns}
        dataSource={users}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={selectedUser ? 'Редактировать пользователя' : 'Добавить пользователя'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <UserForm
          initialValues={selectedUser || undefined}
          onSuccess={() => {
            setIsModalVisible(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
}; 