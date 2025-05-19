import React from 'react';
import { Layout, Card } from 'antd';
import { Route, Routes } from 'react-router-dom'; // Remove createBrowserRouter and RouterProvider
import './MainContent.css'; // Importa el archivo CSS
import loadable from '@loadable/component'; // Import loadable
import routes from '../../../config/routes';

const { Header, Content } = Layout;


const Students = loadable(() => import('../../students/views/StudentsView'));
const Classes = loadable(() => import('../../students/views/StudentsView'));
const Courses = loadable(() => import('../../students/views/StudentsView'));

const MainContent: React.FC = () => {
  return (
    <Layout className="site-layout">
      <Header className="site-layout-background" style={{ padding: 0 }} />
      <Content style={{ margin: '0 16px' }}>
        <div style={{ padding: 24, minHeight: 360 }}>
          <Routes>
          {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            {/* Aquí puedes agregar más rutas para otras vistas */}
          </Routes>
        </div>
      </Content>
    </Layout>
  );
};

export default MainContent;