import React from 'react';
import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Course } from '../../services/CoursesServices';

interface CoursesTableProps {
  courses: Course[];
  loading: boolean;
  onEdit: (course: Course) => void;
  onDelete: (id: number) => void;
}

const CoursesTable: React.FC<CoursesTableProps> = ({ 
  courses, 
  loading, 
  onEdit, 
  onDelete 
}) => {
  // Columnas para la tabla
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Course, b: Course) => a.name.localeCompare(b.name),
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text: string | null) => text || 'Sin descripción',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Course) => (
        <Space size="middle">
          <Button 
            icon={<EditOutlined />} 
            onClick={() => onEdit(record)}
          />
          <Button 
            danger 
            icon={<DeleteOutlined />} 
            onClick={() => onDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={courses}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 10 }}
    />
  );
};

export default CoursesTable;