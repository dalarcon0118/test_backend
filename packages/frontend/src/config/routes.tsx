import loadable from '@loadable/component';

// Carga las vistas de manera dinámica
const StudentsView = loadable(() => import('../features/students/views/StudentsView'));
const DefaultView = loadable(() => import('../features/dashboard/views/DefaultView'));

const CoursesView = loadable(() => import('../features/courses/views/CoursesView'));
const ClassesView = loadable(() => import('../features/classes/views/ClassesView'));

// Define las rutas

export const paths  = {
  root: '/',
  students: '/students',
  courses: '/courses',
  classes: '/classes',
  api: {
    root: 'http://localhost:3334/api',
    students: '/students',
    courses: '/courses',
    classes: '/classes',
  },
}
export const routes = [
  {
    path: paths.root,
    element: <DefaultView />,
  },
  {
    path: paths.students,
    element: <StudentsView />,
  },
  {
    path: paths.courses,
    element: <CoursesView />,
  },
  {
    path: paths.classes,
    element: <ClassesView />,
  },
];

export default routes;