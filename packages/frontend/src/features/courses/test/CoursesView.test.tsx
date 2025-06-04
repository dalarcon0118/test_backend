import React from 'react';
import { render, screen } from '@testing-library/react';
import CoursesView from '../views/CoursesView';

describe('CoursesView', () => {
  it('debe mostrar el título de gestión de cursos', () => {
    render(<CoursesView />);
    expect(screen.getByText(/Gestión de Cursos/i)).toBeInTheDocument();
  });

  it('debe mostrar el botón "Nuevo Curso"', () => {
    render(<CoursesView />);
    expect(screen.getByText(/Nuevo Curso/i)).toBeInTheDocument();
  });
});