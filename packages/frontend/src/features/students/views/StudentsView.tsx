import React, { useEffect, useState } from 'react'; // Importar useState
import useStudents from '../hooks/useStudents';
import StudentsTable from './Student.list.view';
import StudentFormModal from './StudentFormModal'; // Importar el nuevo modal
import { Student, StudentInput } from '../services/StudentsServices'; // Importar tipos
import { message, Button, Space } from 'antd'; // Para mostrar mensajes de éxito/error y Button/Space
import { ReloadOutlined } from '@ant-design/icons'; // Importar el ícono de recarga

const StudentsView: React.FC = () => {
  const {
    students,
    isLoading, // isLoading para la carga de la lista
    error, // error para la carga de la lista
    fetchStudents, // Para forzar una recarga manual si es necesario
    fetchAddStudents,
    fetchUpdStudents,
    refetchStudents,
    fetchDelStudents,
  } = useStudents();

  // Estado para controlar la visibilidad del modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Estado para almacenar el estudiante que se está editando (null para agregar)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Función para abrir el modal en modo agregar
  const handleAddClick = () => {
    setEditingStudent(null); // Asegurarse de que no hay datos iniciales
    setIsModalVisible(true);
  };

  // Función para abrir el modal en modo editar
  const handleEditClick = (student: Student) => {
    setEditingStudent(student); // Cargar los datos del estudiante a editar
    setIsModalVisible(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingStudent(null); // Limpiar el estudiante en edición al cerrar
  };

  // Función que se pasa al modal para manejar el envío del formulario
  const handleSubmitForm = async (values: StudentInput) => {
    try {
      if (editingStudent) {
        // Si hay un estudiante en edición, llamar a updateStudent
        await fetchUpdStudents({id:editingStudent.id, studentData:values});
        message.success('Estudiante actualizado exitosamente');
      } else {
        // Si no hay estudiante en edición, llamar a addStudent
        await fetchAddStudents(values);
        message.success('Estudiante agregado exitosamente');
      }
      handleCloseModal(); // Cerrar el modal después del éxito
      refetchStudents(); // Refrescar la lista para mostrar los cambios
    } catch (err: any) {
      // Mostrar el error de la mutación (viene del store/hook)
      message.error(error || 'Ocurrió un error al guardar el estudiante');
      // No cerramos el modal para que el usuario pueda corregir
      throw err; // Re-lanzar para que el formulario sepa que hubo un error
    }
  };

  const handleDelete = async (id: number) => { // Especificar tipo number para id
     if (window.confirm('¿Estás seguro de que quieres eliminar este estudiante?')) {
       try {
        // await deleteStudent(id);
         message.success('Estudiante eliminado exitosamente');
         await fetchDelStudents(id);
         refetchStudents(); // Refrescar la lista
       } catch (err) {
         message.error(error || 'Ocurrió un error al eliminar el estudiante');
       }
     }
  };


 

  if (isLoading && students.length === 0) return <p>Cargando...</p>;
  // Mostrar error de carga inicial si no hay datos
  if (error && students.length === 0) return <p style={{ color: 'red' }}>Error al cargar estudiantes: {error}</p>;

  

  return (
    <div>
      

      {/* Renderizado condicional para carga y error */}
      {isLoading && students.length === 0 && <p>Cargando...</p>}
      {error && students.length === 0 && <p style={{ color: 'red' }}>Error al cargar estudiantes: {error}</p>}

      {/* Mostrar la tabla solo si no está cargando y no hay error inicial */}
      {(!isLoading || students.length > 0) && !error && (
        <StudentsTable
          students={students}
          loading={isLoading} // Usamos isLoading para la carga de la tabla
          onAddStudent={handleAddClick} // Pasar la función para abrir el modal en modo agregar
          onEdit={handleEditClick} // Pasar la función para abrir el modal en modo editar
          onDelete={handleDelete}
        />
      )}

      {/* Renderizar el modal */}
      <StudentFormModal
        isVisible={isModalVisible}
        initialData={editingStudent}
        onClose={handleCloseModal}
        onSubmit={handleSubmitForm}
        isLoading={isLoading} // Usamos isMutating para el estado de carga del formulario
      />

      {/* Opcional: Mostrar error de mutación si existe y el modal no está visible */}
      {/* {mutationError && !isModalVisible && <p style={{ color: 'red' }}>Error: {mutationError}</p>} */}
    </div>
  );
};

export default StudentsView;