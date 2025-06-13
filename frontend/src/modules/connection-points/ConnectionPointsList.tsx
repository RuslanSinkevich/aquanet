import React, { useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { ConnectionPointForm } from './ConnectionPointForm';
import type { IConnectionPoint } from '../../models/ConnectionPoint/connection-point.model';
import { 
  useGetConnectionPointsQuery, 
  useDeleteConnectionPointMutation 
} from '../../services/ConnectionPointsApi';
import { AuthService } from '../../services/AuthService';
import { UserRole } from '../../common/enums/user-role.enum';

export const ConnectionPointsList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPoint, setEditingPoint] = useState<Partial<IConnectionPoint> | undefined>(undefined);

  const { data: points = [], isLoading, error } = useGetConnectionPointsQuery();
  const [deletePoint] = useDeleteConnectionPointMutation();

  const isAdmin = AuthService.hasRole(UserRole.ADMIN);
  const isAuthorized = AuthService.isAuthenticated();

  if (error) {
    console.error('Error loading connection points:', error);
    return <div>Ошибка загрузки данных. Пожалуйста, обновите страницу.</div>;
  }

  const handleDelete = async (id: number) => {
    try {
      await deletePoint(id).unwrap();
      message.success('Точка подключения успешно удалена');
    } catch (error) {
      console.error('Error deleting connection point:', error);
      message.error('Ошибка при удалении точки подключения');
    }
  };

  const safePoints = points.map(point => ({
    ...point,
    positionM: point.positionM || 0,
    totalCost: point.totalCost || 0,
    name: point.name || 'Без названия'
  }));

  const baseColumns = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Позиция (м)',
      dataIndex: 'positionM',
      key: 'positionM',
    },
    {
      title: 'Стоимость',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (value: number) => `₽${value.toLocaleString()}`,
    },
  ];

  const actionColumn = {
    title: 'Действия',
    key: 'actions',
    render: (_: unknown, record: IConnectionPoint) => (
      <Space size="middle">
        {isAdmin && (
          <>
            <Button 
              type="link"
              onClick={() => {
                setEditingPoint(record);
                setIsModalVisible(true);
              }}
            >
              Редактировать
            </Button>
            <Button 
              danger 
              type="link"
              onClick={() => handleDelete(record.id)}
            >
              Удалить
            </Button>
          </>
        )}
      </Space>
    ),
  };

  const columns = [...baseColumns, ...(isAuthorized ? [actionColumn] : [])];

  return (
    <div>
      {isAdmin && (
        <Button 
          type="primary" 
          onClick={() => {
            setEditingPoint(undefined);
            setIsModalVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          Добавить точку подключения
        </Button>
      )}

      <Table 
        dataSource={safePoints} 
        columns={columns} 
        rowKey="id"
        loading={isLoading}
      />

      <Modal
        title={editingPoint ? "Редактировать точку подключения" : "Добавить точку подключения"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <ConnectionPointForm
          initialValues={editingPoint}
          onSuccess={() => {
            setIsModalVisible(false);
            setEditingPoint(undefined);
          }}
        />
      </Modal>
    </div>
  );
}; 