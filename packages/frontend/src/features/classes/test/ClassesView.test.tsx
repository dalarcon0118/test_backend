import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ClassesView from '../views/ClassesView';
import '@testing-library/jest-dom';

describe('ClassesView', () => {
  it('debe mostrar el título de gestión de matrículas', () => {
    render(<ClassesView />);
    expect(screen.getByText(/Gestión de Matrículas/i)).toBeInTheDocument();
  });

  it('debe mostrar el botón "Agregar matrícula"', () => {
    render(<ClassesView />);
    expect(screen.getByText(/Agregar matrícula/i)).toBeInTheDocument();
  });

  it('al hacer clic en "Agregar matrícula" debe mostrar el modal y validar campos requeridos', async () => {
    render(<ClassesView />);
    // Abrir el modal
    fireEvent.click(screen.getByText(/Agregar matrícula/i));
    expect(await screen.findByText(/Agregar Matrícula/i)).toBeInTheDocument();

    // Intentar enviar sin llenar campos
    fireEvent.click(screen.getByText(/Guardar/i));
    expect(await screen.findAllByText(/Selecciona un estudiante/i)).toHaveLength(1);
    expect(await screen.findAllByText(/Selecciona un curso/i)).toHaveLength(1);
    expect(await screen.findAllByText(/Selecciona la fecha de matrícula/i)).toHaveLength(1);

    // Llenar los campos (simulación básica, puedes mejorar con mocks de datos)
    const estudianteSelect = screen.getByLabelText(/Estudiante/i);
    fireEvent.mouseDown(estudianteSelect);
    const estudianteOption = await screen.findAllByRole('option');
    fireEvent.click(estudianteOption[0]);

    const cursoSelect = screen.getByLabelText(/Curso/i);
    fireEvent.mouseDown(cursoSelect);
    const cursoOption = await screen.findAllByRole('option');
    fireEvent.click(cursoOption[0]);

    // Simular selección de fecha (puedes mejorar con un mock de DatePicker)
    // Aquí solo se verifica que el campo existe
    expect(screen.getByLabelText(/Fecha de matrícula/i)).toBeInTheDocument();
  });
});