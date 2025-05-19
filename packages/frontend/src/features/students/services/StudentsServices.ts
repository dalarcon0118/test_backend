import { paths } from "../../../config/routes";
import {deleteData,fetchData,putData,postData} from "../../../utils/request"
// Definición de tipos para Estudiantes
export interface Student {
  id: number; // Asumiendo que el backend devuelve un ID numérico
  name: string;
  email: string;
  birth_date: string; // Basado en el ejemplo de datos
}

export interface StudentInput {
  name: string;
  email: string;
  birth_date: string;
}
export interface StudentUpdateInput {
    id: number,
     studentData: Partial<StudentInput>
}

// URL base de la API para estudiantes
// Usando el puerto 3334 como se especificó para el endpoint de estudiantes
const API_URL = paths.api.root;



// Funciones específicas para estudiantes
const getAll = (): Promise<Student[]> =>
  fetchData<Student[]>(`${API_URL}/students`);

const getById = (id: number): Promise<Student> =>
  fetchData<Student>(`${API_URL}/students/${id}`);

const create = (studentData: StudentInput): Promise<Student> =>
  postData<StudentInput, Student>(`${API_URL}/students`, studentData);

const update = ({id,studentData}:StudentUpdateInput): Promise<Student> =>
  putData<Partial<StudentInput>, Student>(`${API_URL}/students/${id}`, studentData);

const remove = (id: number): Promise<boolean> =>
  deleteData(`${API_URL}/students/${id}`);

// Exportación del objeto de servicios
export const StudentsServices = {
  getAll,
  getById,
  create,
  update,
  delete: remove,
};

export default StudentsServices;

