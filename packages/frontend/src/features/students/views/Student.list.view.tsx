import React, { useEffect, useState } from 'react';
import { Table, Space, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons'; // Importar PlusOutlined
import { Student } from '../services/StudentsServices';

// Define la interfaz del estudiante


interface StudentsTableProps {
  students: Student[];
  loading: boolean;
  onEdit: (student: Student) => void;
  onDelete: (id: number) => void;
  onAddStudent: () => void; // Agregar prop para manejar la acción de agregar
}

const StudentsTable: React.FC<StudentsTableProps> = ({
  students,
  loading,
  onEdit,
  onDelete,
  onAddStudent, // Recibir la nueva prop
}) => {
    const [data, setData] = useState<Student[]>([]);
    useEffect(() => {
      // Actualizar el estado local con los datos recibidos
      setData(students);
    },[students])
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Student, b: Student) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: Student, b: Student) => a.email.localeCompare(b.email),
    },
    {
      title: 'Fecha de Nacimiento',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: Student) => (
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
    <div> 
      <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}> {/* Usar Space para alinear título y botón */}
        <h2>Lista de Estudiantes</h2>
        <Button type="primary"
        icon={<PlusOutlined />} onClick={onAddStudent} loading={loading}>
        Nuevo Estudiante
        </Button>
      </Space>
     
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default StudentsTable;