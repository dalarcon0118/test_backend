import { paths } from '../../../config/routes';
import { fetchData, postData, putData, deleteData } from '../../../utils/request';

// Definición de tipos
export interface Course {
  id: number;
  name: string;
  description: string | null;
}

export interface CourseInput {
  name: string;
  description?: string;
}

// URL base de la API
const API_URL = paths.api.root;
// Funciones específicas para cursos
const getAll = (): Promise<Course[]> =>
  fetchData<Course[]>(`${API_URL}/courses`);

const getById = (id: number): Promise<Course> =>
  fetchData<Course>(`${API_URL}/courses/${id}`);

const create = async (courseData: CourseInput): Promise<Course> => {
  try {
    return await postData<CourseInput, Course>(`${API_URL}/courses`, courseData);
  } catch (error: any) {
    // Si la respuesta contiene errores de validación, extrae el mensaje
    if (error.response && error.response.data && Array.isArray(error.response.data.errors)) {
      // Puedes concatenar todos los mensajes o solo mostrar el primero
      const messages = error.response.data.errors.map((err: any) => err.message).join(', ');
      throw new Error(messages);
    }
    // Si no es un error de validación, relanza el error original
    throw error;
  }
};

const update = async ({ id, courseData }: { id: number; courseData: CourseInput }): Promise<Course> =>
  putData<CourseInput, Course>(`${API_URL}/courses/${id}`, courseData);

const remove = (id: number): Promise<boolean> =>
  deleteData(`${API_URL}/courses/${id}`);

// Exportación del objeto de servicios
export const CoursesServices = {
  getAll,
  getById,
  create,
  update,
  delete: remove
};

export default CoursesServices;