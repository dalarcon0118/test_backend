import React, { useState, useEffect } from 'react';
import { Typography, Space, Input, Button, message, Modal } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import useCourse from '../useCourse';
import { Course, CourseInput } from '../services/CoursesServices';
import CoursesTable from './components/CoursesTable';
import CourseForm from './components/CourseForm';

const { Title } = Typography;

const CoursesView: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Use the custom hook
  const {
    courses,
    isLoading,
    error,
    fetchAddCourse,
    fetchUpdCourse,
    fetchDelCourse,
    refetchCourses,
  } = useCourse();

  // Filter courses by search text
  const filteredCourses = courses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (course.description && course.description.toLowerCase().includes(searchText.toLowerCase()))
  );

  // Handlers for create, update, and delete
  const handleCreate = async (values: CourseInput) => {
    try {
      console.log('Creating course with values:', values);
      await fetchAddCourse(values);
      message.success('Curso creado exitosamente');
      refetchCourses();
      handleCancel();
    } catch (error: any) {
      message.error(`Error al crear el curso: ${error?.message || 'Error desconocido'}`);
    }
  };

  const handleUpdate = async (id: number, values: CourseInput) => {
    try {
      await fetchUpdCourse({ id, courseData: values });
      message.success('Curso actualizado exitosamente');
      refetchCourses();
      handleCancel();
    } catch (error: any) {
      message.error(`Error al actualizar el curso: ${error?.message || 'Error desconocido'}`);
    }
  };

  const handleDeleteConfirm = async (id: number) => {
    try {
      await fetchDelCourse(id);
      message.success('Curso eliminado exitosamente');
      refetchCourses();
    } catch (error: any) {
      message.error(`Error al eliminar el curso: ${error?.message || 'Error desconocido'}`);
    }
  };

  // Event handlers
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const showModal = () => {
    setEditingCourse(null);
    setIsModalVisible(true);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este curso?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Sí',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        handleDeleteConfirm(id);
      },
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingCourse(null);
  };

  const handleSubmit = (values: CourseInput) => {
    console.log('Form submitted with values:', values);
    if (editingCourse) {
      handleUpdate(editingCourse.id, values);
    } else {
      handleCreate(values);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Title level={2}>Gestión de Cursos</Title>
        <Space>
          
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Nuevo Curso
          </Button>
        </Space>
      </div>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <CoursesTable
        courses={filteredCourses}
        loading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CourseForm
        visible={isModalVisible}
        course={editingCourse}
        loading={isLoading}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CoursesView;