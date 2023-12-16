// import { BRAND_LOGO_CONSTRAST, BRAND_NAME } from '@/constants/brand';
import React from 'react';
// import { animated, Spring } from 'react-spring';
import ReactLoading from 'react-loading';

import { GLOBAL_THEME_COLOR } from '@constants/index';

type Props = {
  style?: React.CSSProperties;
};

const SplashScreen = ({ style }: Props) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      height: '80vh',
      width: '100%',
      flexDirection: 'column',
      ...style,
    }}>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ReactLoading
        type={'cylon'}
        color={GLOBAL_THEME_COLOR.$highlight_color}
        height={'10%'}
        width={'10%'}
      />
    </div>
  </div>
);

export default SplashScreen;
