import { paths } from "../../../config/routes";
import { fetchData, postData, putData, deleteData } from "../../../utils/request";

// Definición de tipos para Matrículas (Clases)
export interface Class {
  id: number;
  student_id: number;
  course_id: number;
  initial_date: string;
}

export interface ClassInput {
  student_id: number;
  course_id: number;
  initial_date: string;
}

export interface ClassUpdateInput {
  id: number;
  classData: Partial<ClassInput>;
}

// URL base de la API para clases/matrículas
const API_URL = paths.api.root;

// Funciones específicas para clases/matrículas
const getAll = (params?: { studentId?: number; courseId?: number }): Promise<Class[]> => {
  let url = `${API_URL}/classes`;
  const query: string[] = [];
  if (params?.studentId) query.push(`studentId=${params.studentId}`);
  if (params?.courseId) query.push(`courseId=${params.courseId}`);
  if (query.length) url += `?${query.join('&')}`;
  return fetchData<Class[]>(url);
};

const getById = (id: number): Promise<Class> =>
  fetchData<Class>(`${API_URL}/classes/${id}`);

const create = (classData: ClassInput): Promise<Class> =>
  postData<ClassInput, Class>(`${API_URL}/classes`, classData);

const update = ({ id, classData }: ClassUpdateInput): Promise<Class> =>
  putData<Partial<ClassInput>, Class>(`${API_URL}/classes/${id}`, classData);

const remove = (id: number): Promise<boolean> =>
  deleteData(`${API_URL}/classes/${id}`);

// Exportación del objeto de servicios
export const ClassesServices = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};

export default ClassesServices;