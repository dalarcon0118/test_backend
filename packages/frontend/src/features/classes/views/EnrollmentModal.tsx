import React from 'react';
import { Modal, Form, Select, DatePicker, Button } from 'antd';

const { Option } = Select;

interface EnrollmentModalProps {
  visible: boolean;
  onCancel: () => void;
  onFinish: (values: any) => void;
  students: { id: number; name: string }[];
  courses: { id: number; name: string }[];
  form: any;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  visible,
  onCancel,
  onFinish,
  students,
  courses,
  form,
}) => (
  <Modal
    title="Agregar Matrícula"
    visible={visible}
    onCancel={onCancel}
    footer={null}
    destroyOnClose
  >
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Estudiante"
        name="student"
        rules={[{ required: true, message: 'Selecciona un estudiante' }]}
      >
        <Select
          showSearch
          placeholder="Buscar estudiante"
          filterOption={(input, option) =>
            (option?.children as any).toLowerCase().includes(input.toLowerCase())
          }
        >
          {students.map((student) => (
            <Option key={student.id} value={student.id}>
              {student.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Curso"
        name="course"
        rules={[{ required: true, message: 'Selecciona un curso' }]}
      >
        <Select
          showSearch
          placeholder="Buscar curso"
          filterOption={(input, option) =>
            (option?.children as any).toLowerCase().includes(input.toLowerCase())
          }
        >
          {courses.map((course) => (
            <Option key={course.id} value={course.id}>
              {course.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="Fecha de matrícula"
        name="enrollmentDate"
        rules={[{ required: true, message: 'Selecciona la fecha de matrícula' }]}
      >
        <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Guardar
        </Button>
        <Button onClick={onCancel} style={{ marginLeft: 8 }}>
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  </Modal>
);

export default EnrollmentModal;