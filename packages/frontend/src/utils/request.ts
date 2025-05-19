import axios from 'axios';

// Funciones puras para operaciones HTTP (reutilizadas de CoursesServices)
export const fetchData = async <T>(url: string): Promise<T> => {
    const response = await axios.get(url);
    return response.data;
  };
  
 export const postData = async <T, R>(url: string, data: T): Promise<R> => {
  console.log(data)
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };
  
  export const putData = async <T, R>(url: string, data: T): Promise<R> => {
    const response = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  };
  
  export const deleteData = async (url: string): Promise<boolean> => {
    // Axios delete no siempre devuelve un cuerpo, pero puede lanzar un error si falla.
    // El status 204 (No Content) es común para un delete exitoso.
    await axios.delete(url);
    return true; // Asumimos éxito si no hay error.
  };