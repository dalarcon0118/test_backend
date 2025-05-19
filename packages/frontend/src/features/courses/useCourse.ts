import { useEffect } from 'react';
import useDataFetcher from '../../hooks/useDataFetcher'; // Ajusta la ruta si es necesario
import { CoursesServices, Course, CourseInput } from './services/CoursesServices'; // Ajusta la ruta si es necesario

// Hook personalizado para manejar cursos usando useDataFetcher
const useCourse = () => {
  // Obtener todos los cursos
  const [coursesData, status, fetchCourses, refetchCourses] = useDataFetcher<any, Course[]>(
    CoursesServices.getAll
  );
  // Crear curso
  const [, statusAdd, fetchAddCourse] = useDataFetcher<any, any>(CoursesServices.create);
  // Actualizar curso
  const [, statusUpd, fetchUpdCourse] = useDataFetcher<any, any>(CoursesServices.update);
  // Eliminar curso
  const [, statusDel, fetchDelCourse] = useDataFetcher<number | any, any>(CoursesServices.delete);

  // Cargar cursos al montar el hook
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses: coursesData || [],
    isLoading: status.isLoading || statusAdd.isLoading || statusUpd.isLoading || statusDel.isLoading,
    error: status.errorMessage || statusAdd.errorMessage || statusUpd.errorMessage || statusDel.errorMessage,
    fetchCourses,
    fetchAddCourse,
    fetchUpdCourse,
    fetchDelCourse,
    refetchCourses,
  };
};

export default useCourse;