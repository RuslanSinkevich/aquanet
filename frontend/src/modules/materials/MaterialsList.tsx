import React, { useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetMaterialsQuery, useDeleteMaterialMutation } from '../../services/MaterialsApi';
import { MaterialForm } from './MaterialForm';
import type { IMaterial } from '../../models/Material/material.model';

export const MaterialsList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<IMaterial | null>(null);
  const { data: materials, isLoading, refetch } = useGetMaterialsQuery();
  const [deleteMaterial] = useDeleteMaterialMutation();

  const handleAdd = () => {
    setSelectedMaterial(null);
    setIsModalVisible(true);
  };

  const handleEdit = (material: IMaterial) => {
    setSelectedMaterial(material);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMaterial(id).unwrap();
      message.success('Материал успешно удален');
      refetch();
    } catch {
      message.error('Ошибка при удалении материала');
    }
  };

  const columns = [
    {
      title: 'Тип материала',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Единица измерения',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Стоимость за единицу',
      dataIndex: 'unit_cost',
      key: 'unit_cost',
      render: (value: number) => `₽ ${value.toLocaleString()}`,
    },
    {
      title: 'Комментарий',
      dataIndex: 'comment',
      key: 'comment',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: IMaterial) => (
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
          Добавить материал
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={materials}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={selectedMaterial ? 'Редактировать материал' : 'Добавить материал'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <MaterialForm
          initialValues={selectedMaterial || undefined}
          onSuccess={() => {
            setIsModalVisible(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
}; 