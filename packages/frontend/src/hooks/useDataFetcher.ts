import { useState, useCallback } from 'react';

// Definimos los tipos para el estado y los parámetros
type StatusType = {
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
};

type FetcherFunction<P, T> = (params?: P) => Promise<T>;

/**
 * Hook personalizado para manejar operaciones de fetch con estado de carga y error
 * @param fetcher Función que realiza la petición asíncrona
 * @returns [data, status, fetch, refetch] - Datos, estado, función para ejecutar y función para refrescar
 */
function useDataFetcher<P, T>(fetcher: FetcherFunction<P, T>) {
  // Estado para almacenar los datos obtenidos
  const [data, setData] = useState<T | null>(null);
  
  // Estado para controlar el estado de la petición
  const [status, setStatus] = useState<StatusType>({
    isLoading: false,
    isError: false,
    errorMessage: null
  });
  
  // Almacenamos los últimos parámetros utilizados para poder hacer refetch
  const [lastParams, setLastParams] = useState<P | undefined>(undefined);

  // Función para ejecutar el fetcher con parámetros
  const fetch = useCallback(async (params?: P) => {
    // Actualizamos el estado a "cargando"
    setStatus({
      isLoading: true,
      isError: false,
      errorMessage: null
    });
    
    try {
      // Guardamos los parámetros para poder hacer refetch después
      setLastParams(params);
      
      // Ejecutamos la función fetcher
      const result = await fetcher(params);
      console.log(result);
      
      // Actualizamos los datos y el estado
      setData(result);
      setStatus({
        isLoading: false,
        isError: false,
        errorMessage: null
      });
      
      return result;
    } catch (error) {
      // En caso de error, actualizamos el estado
      setStatus({
        isLoading: false,
        isError: true,
        errorMessage: error instanceof Error ? error.message : 'Error desconocido'
      });
      
      // Propagamos el error para que pueda ser manejado por el componente
      throw error;
    }
  }, [fetcher]);

  // Función para refrescar los datos usando los últimos parámetros
  const refetch = useCallback(async () => {
    return fetch(lastParams);
  }, [fetch, lastParams]);

  return [data, status, fetch, refetch] as const;
}

export default useDataFetcher;