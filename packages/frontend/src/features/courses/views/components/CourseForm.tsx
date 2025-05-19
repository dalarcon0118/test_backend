import React, { useEffect } from 'react';
import { Modal, Form, Input } from 'antd';
import { Course, CourseInput } from '../../services/CoursesServices';

interface CourseFormProps {
  visible: boolean;
  course: Course | null;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (values: CourseInput) => void;
}

const CourseForm: React.FC<CourseFormProps> = ({
  visible,
  course,
  loading,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  // Resetear el formulario cuando cambia el curso o la visibilidad
  useEffect(() => {
    if (visible) {
      form.resetFields();
      
      if (course) {
        form.setFieldsValue({
          name: course.name,
          description: course.description || '',
        });
      }
    }
  }, [visible, course, form]);

  const handleOk = () => {
    form.validateFields().then(values => {
      onSubmit(values);
    });
  };

  return (
    <Modal
      title={course ? 'Editar Curso' : 'Nuevo Curso'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor ingresa el nombre del curso' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseForm;