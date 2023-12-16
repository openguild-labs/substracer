import AppBar from '@components/AppBar';
import CanvasStudioLayout from '@components/CanvasStudioLayout';
import { ModalContainer } from '@components/index';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import React from 'react';

type Props = {};

const StudioScreen = (props: Props) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppBar />
      <Content style={{ height: '100vh', overflow: 'auto' }}>
        <CanvasStudioLayout />
      </Content>
      <ModalContainer />
    </Layout>
  );
};

export default StudioScreen;
