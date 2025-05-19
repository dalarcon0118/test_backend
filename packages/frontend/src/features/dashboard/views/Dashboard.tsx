import React from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import MainContent from './MainContent';

const { Sider } = Layout;

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <Sidebar />
      </Sider>
      <MainContent />
    </Layout>
  );
};

export default Dashboard;