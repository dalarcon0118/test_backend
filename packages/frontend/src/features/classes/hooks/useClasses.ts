import { useEffect, useCallback, useState } from 'react';
import { ClassesServices, Class, ClassInput, ClassUpdateInput } from '../services/Classes.services';
import useStudents from '../../students/hooks/useStudents';
import useCourses from '../../courses/useCourse';
import useDataFetcher from '../../../hooks/useDataFetcher';

const useClasses = () => {
  // Hooks para cargar estudiantes y cursos
  const { students, isLoading: loadingStudents, error: errorStudents, fetchStudents } = useStudents();
  const { courses, isLoading: loadingCourses, error: errorCourses, fetchCourses } = useCourses();

  // Filtros
  const [studentId, setStudentId] = useState<number | undefined>();
  const [courseId, setCourseId] = useState<number | undefined>();

  // Hook genérico para cargar clases
  const [classes, status, fetchClasses, refetch] = useDataFetcher<any,any>(ClassesServices.getAll);
  
  useEffect(() => {
    fetchClasses({ studentId, courseId });
  }, [ studentId, courseId]);

  // CRUD actions
  const addClass = useCallback(async (input: ClassInput) => {
    await ClassesServices.create(input);
    await refetch();
  }, [fetch]);

  const updateClass = useCallback(async (input: ClassUpdateInput) => {
    await ClassesServices.update(input);
    await refetch();
  }, [fetch]);

  const deleteClass = useCallback(async (id: number) => {
    await ClassesServices.delete(id);
    await refetch();
  }, [fetch]);

  // Cargar estudiantes y cursos al montar
  // (asume que estos hooks ya hacen fetch automático, si no, descomenta las siguientes líneas)
  // useEffect(() => {
  //   fetchStudents();
  //   fetchCourses();
  // }, [fetchStudents, fetchCourses]);

  return {
    classes,
    students,
    courses,
    isLoading: status.isLoading || loadingStudents || loadingCourses,
    error: status.errorMessage || errorStudents || errorCourses,
    fetchClasses,
    addClass,
    updateClass,
    deleteClass,
    setStudentId,
    setCourseId,
    studentId,
    courseId,
    refetch,
  };
};

export default useClasses;