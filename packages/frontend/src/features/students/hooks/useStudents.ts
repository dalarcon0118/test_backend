import { useEffect } from 'react';
import useDataFetcher from '../../../hooks/useDataFetcher'; // Asegúrate de que la ruta sea correcta
import { StudentsServices, Student, StudentInput, StudentUpdateInput } from '../services/StudentsServices'; // Asegúrate de que la ruta sea correcta

// Este hook se encargará de usar useDataFetcher para obtener la lista
// y sincronizarla con el store de Zustand.
const useStudents = () => {
  // Usamos useDataFetcher para la lógica de fetch, carga y error
  const [studentsData, status, fetchStudents, refetchStudents] = useDataFetcher<any, Student[]>(
    StudentsServices.getAll 
  );
  const [, statusAdd, fetchAddStudents] = useDataFetcher<any, any>(StudentsServices.create);
  const [, statusUpd, fetchUpdStudents] = useDataFetcher<any, any>(StudentsServices.update);
  const [, statusDel, fetchDelStudents] = useDataFetcher<any, any>(StudentsServices.delete);


  // Obtenemos las acciones del store de Zustand para actualizar el estado global
  

  

  // Efecto inicial para cargar los estudiantes cuando el hook se monta
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]); // Dependencia fetchStudents para evitar re-ejecución innecesaria

  // Retornamos el estado del store y las funciones de fetch/refetch del useDataFetcher
  // Las acciones de mutación (add, update, delete) se obtendrían directamente del store
  // en los componentes que las necesiten.
  return {
    // Estado del store (sincronizado con useDataFetcher para la lista)
    students: studentsData || [],
    isLoading: status.isLoading || statusAdd.isLoading || statusUpd.isLoading || statusDel.isLoading,
    error:status.errorMessage || statusAdd.errorMessage || statusUpd.errorMessage  || statusDel.errorMessage,

    // Funciones de fetch/refetch del useDataFetcher
    fetchStudents, // Para forzar una recarga manual si es necesario
    fetchAddStudents,
    fetchUpdStudents,
    fetchDelStudents,
    refetchStudents, // Alias para fetchStudents con los últimos parámetros (en este caso, ninguno)

   
  };
};

export default useStudents;