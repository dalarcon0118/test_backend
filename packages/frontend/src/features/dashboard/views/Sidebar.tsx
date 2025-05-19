import React from 'react';
import { Menu } from 'antd';
import {
  UserAddOutlined,
  BookOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { paths } from '../../../config/routes';

const Sidebar: React.FC = () => {
  const navigate = useNavigate(); // Usa el hook useNavigate

  return (
    <div>
      <div style={{ padding: '16px', textAlign: 'center' }}>
        <img src="https://administracionescolar.mx/wp-content/uploads/2023/03/6911306-scaled-2560x1280.jpg" alt="Gestión de Estudiantes" style={{ width: '80%', borderRadius: '8px' }} />
        <p>Gestión de Estudiantes</p>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<UserAddOutlined />} onClick={() => navigate(paths.root)}>
          Inicio
        </Menu.Item>
        <Menu.Item key="2" icon={<UserAddOutlined />} onClick={() => navigate(paths.students)}>
          Add Students
        </Menu.Item>
        <Menu.Item key="3" icon={<BookOutlined />} onClick={() => navigate(paths.courses)}>
          Add Course
        </Menu.Item>
        <Menu.Item key="4" icon={<CalendarOutlined />} onClick={() => navigate(paths.classes)}>
          Add Classes
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;