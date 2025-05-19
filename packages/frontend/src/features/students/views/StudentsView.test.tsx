import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import StudentsView from './StudentsView';

describe('StudentsView', () => {
  it('debe mostrar el título de la lista de estudiantes', () => {
    render(<StudentsView />);
    expect(screen.getByText(/Lista de Estudiantes/i)).toBeInTheDocument();
  });

  it('debe mostrar el botón "Nuevo Estudiante"', () => {
    render(<StudentsView />);
    expect(screen.getByText(/Nuevo Estudiante/i)).toBeInTheDocument();
  });
});