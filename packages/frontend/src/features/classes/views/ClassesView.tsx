import React, { useState } from 'react';
import { Table, Button, Space, Select, Form, message } from 'antd';
import EnrollmentModal from './EnrollmentModal';
import useClasses from '../hooks/useClasses';

const { Option } = Select;

const ClassesView: React.FC = () => {
  const {
    classes,
    students,
    courses,
    isLoading,
    error,
    addClass,
    deleteClass,
    setStudentId,
    setCourseId,
    studentId,
    courseId,
    refetch,
  } = useClasses();

  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Filtros
  const handleStudentFilter = (value: number | undefined) => {
    setStudentId(value);
  };

  const handleCourseFilter = (value: number | undefined) => {
    setCourseId(value);
  };

  // Tabla columnas
  const columns = [
    {
      title: 'Estudiante',
      dataIndex: ['student', 'name'],
      key: 'student',
      render: (_: any, record: any) => record.student?.name || 'Sin nombre',
    },
    {
      title: 'Curso',
      dataIndex: ['course', 'name'],
      key: 'course',
      render: (_: any, record: any) => record.course?.name || 'Sin nombre',
    },
    {
      title: 'Fecha de matrícula',
      dataIndex: 'initialDate',
      key: 'initialDate',
      render: (initialDate: string) =>
        initialDate ? new Date(initialDate).toLocaleDateString() : '',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link">Ver más</Button>
          <Button type="link">Editar</Button>
          <Button
            type="link"
            danger
            onClick={async () => {
              await deleteClass(record.id);
              message.success('Matrícula eliminada');
            }}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  // Manejo del formulario de matrícula
  const handleAddEnrollment = async (values: any) => {
    try {
      await addClass({
        student_id: values.student,
        course_id: values.course,
        initial_date: values.enrollmentDate.format('YYYY-MM-DD'),
      });
      setModalVisible(false);
      form.resetFields();
      message.success('Matrícula agregada correctamente');
    } catch (err) {
      message.error('Error al agregar la matrícula');
    }
  };

  return (
    <div>
      <h2>Gestión de Matrículas</h2>
      <Space style={{ marginBottom: 16 }}>
        <Select
          allowClear
          placeholder="Filtrar por estudiante"
          style={{ width: 200 }}
          value={studentId}
          onChange={handleStudentFilter}
          loading={isLoading}
        >
          {students.map((student) => (
            <Option key={student.id} value={student.id}>
              {student.name}
            </Option>
          ))}
        </Select>
        <Select
          allowClear
          placeholder="Filtrar por curso"
          style={{ width: 200 }}
          value={courseId}
          onChange={handleCourseFilter}
          loading={isLoading}
        >
          {courses.map((course) => (
            <Option key={course.id} value={course.id}>
              {course.name}
            </Option>
          ))}
        </Select>
        <Button type="primary" onClick={() => setModalVisible(true)}>
          Agregar matrícula
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={classes}
        rowKey="id"
        loading={isLoading}
        pagination={false}
      />

      <EnrollmentModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onFinish={handleAddEnrollment}
        students={students}
        courses={courses}
        form={form}
      />

      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default ClassesView;