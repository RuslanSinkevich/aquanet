import React, { useState } from 'react';
import { Table, Button, Space, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetWorkItemsQuery, useDeleteWorkItemMutation } from '../../services/WorkItemsApi';
import { WorkItemForm } from './WorkItemForm';
import type { IWorkItem } from '../../models/WorkItem/work-item.model';
import dayjs from 'dayjs';

export const WorkItemsList: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWorkItem, setSelectedWorkItem] = useState<IWorkItem | null>(null);
  const { data: workItems, isLoading, refetch } = useGetWorkItemsQuery();
  const [deleteWorkItem] = useDeleteWorkItemMutation();

  const handleAdd = () => {
    setSelectedWorkItem(null);
    setIsModalVisible(true);
  };

  const handleEdit = (workItem: IWorkItem) => {
    setSelectedWorkItem(workItem);
    setIsModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkItem(id).unwrap();
      message.success('Работа успешно удалена');
      refetch();
    } catch {
      message.error('Ошибка при удалении работы');
    }
  };

  const columns = [
    {
      title: 'Точка подключения',
      dataIndex: ['connectionPoint', 'address'],
      key: 'connectionPoint',
    },
    {
      title: 'Описание',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Материал',
      dataIndex: ['material', 'type'],
      key: 'material',
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Стоимость',
      dataIndex: 'cost',
      key: 'cost',
      render: (value: number) => `₽ ${value.toLocaleString()}`,
    },
    {
      title: 'Дата выполнения',
      dataIndex: 'workDate',
      key: 'workDate',
      render: (value: string) => value ? dayjs(value).format('DD.MM.YYYY') : '-',
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: IWorkItem) => (
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
          Добавить работу
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={workItems}
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={selectedWorkItem ? 'Редактировать работу' : 'Добавить работу'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <WorkItemForm
          initialValues={selectedWorkItem || undefined}
          onSuccess={() => {
            setIsModalVisible(false);
            refetch();
          }}
        />
      </Modal>
    </div>
  );
}; 