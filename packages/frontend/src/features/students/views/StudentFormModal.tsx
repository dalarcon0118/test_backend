import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, message, DatePicker } from 'antd';
import { Student, StudentInput } from '../services/StudentsServices'; // Asegúrate de que la ruta sea correcta

// Define los tipos para las props del modal
interface StudentFormModalProps {
  isVisible: boolean;
  initialData: Student | null; // null para agregar, Student para editar
  onClose: () => void;
  onSubmit: (values: StudentInput) => Promise<void>; // Función que maneja el envío (agregar/editar)
  isLoading: boolean; // Para deshabilitar el botón de submit durante la carga
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({
  isVisible,
  initialData,
  onClose,
  onSubmit,
  isLoading,
}) => {
  // Usamos el hook useForm de Ant Design para manejar el estado del formulario
  const [form] = Form.useForm();

  // Efecto para cargar los datos iniciales cuando el modal se abre o initialData cambia
  useEffect(() => {
    if (isVisible) {
      // Si hay datos iniciales, los cargamos en el formulario
      if (initialData) {
        form.setFieldsValue(initialData);
      } else {
        // Si no hay datos iniciales (modo agregar), reseteamos el formulario
        form.resetFields();
      }
    }
  }, [isVisible, initialData, form]); // Dependencias: cuando el modal se abre, los datos iniciales cambian, o la instancia del formulario cambia

  // Manejador para cuando el formulario se envía exitosamente
  const onFinish = async (values: StudentInput) => {
    try {
      // Transformar birth_date a string "YYYY-MM-DD" si existe
      const formattedValues = {
        ...values,
        birth_date: values.birth_date ? (values.birth_date as any)?.format('YYYY-MM-DD') : undefined,
      };
      await onSubmit(formattedValues);
      // onClose(); // El padre es responsable de cerrar el modal después del éxito
    } catch (error) {
      // El error se maneja en el componente padre
    }
  };

  // Manejador para cuando el formulario falla la validación
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Por favor, completa todos los campos requeridos.');
  };

  return (
    <Modal
      title={initialData ? 'Editar Estudiante' : 'Agregar Estudiante'}
      visible={isVisible}
      onCancel={onClose} // Cerrar modal al hacer clic en cancelar o fuera del modal
      footer={null} // Ocultar los botones por defecto del modal, usaremos los del formulario
      destroyOnClose={true} // Destruir el contenido del modal al cerrarlo para resetear el estado del formulario
    >
      <Form
        form={form}
        layout="vertical" // O 'horizontal' o 'inline'
        name="student_form"
        onFinish={onFinish} // Llama a onFinish si la validación es exitosa
        onFinishFailed={onFinishFailed} // Llama a onFinishFailed si la validación falla
        initialValues={initialData || undefined} // Carga datos iniciales si existen
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor, ingresa el nombre' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Por favor, ingresa el email' },
            { type: 'email', message: 'Por favor, ingresa un email válido' },
          ]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Fecha de nacimiento"
          name="birth_date"
          rules={[{ required: true, message: 'Por favor, ingresa la fecha de nacimiento' }]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            {initialData ? 'Actualizar' : 'Agregar'}
          </Button>
          <Button onClick={onClose} style={{ marginLeft: 8 }}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default StudentFormModal;