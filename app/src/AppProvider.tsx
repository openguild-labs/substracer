import SnackbarWrapper from '@components/SnackbarWrapper';
import { ConfigProvider } from 'antd';
import React from 'react';
import { ANT_DESIGN_THEME } from './constants';

type Props = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: Props) => {
  return (
    <ConfigProvider theme={ANT_DESIGN_THEME}>
      <SnackbarWrapper>
        <React.Fragment>{children}</React.Fragment>
      </SnackbarWrapper>
    </ConfigProvider>
  );
};

export default AppProvider;
