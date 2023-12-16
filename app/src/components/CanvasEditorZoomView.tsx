/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { MIDDLE_STYLE } from '@constants/responsive';
import { GLOBAL_THEME_COLOR } from '@constants/theme';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Button, Space } from 'antd';
import { TbLayoutSidebar, TbZoomIn, TbZoomOut } from 'react-icons/tb';
import { ComponentChildrenType } from '@core/models';
import { ExpandOutlined, SearchOutlined } from '@ant-design/icons';
import { useModalStore } from '@stores/useModalStore';
import { useCanvasStore } from '@stores/useCanvasStore';
import { BiRefresh } from 'react-icons/bi';

type Props = {
  children: ComponentChildrenType;
  style?: React.CSSProperties;
};

const CanvasEditorZoomView = ({ children, style }: Props) => {
  const { toggleFullScreenMode, fullScreenMode } = useCanvasStore();
  const { openModal } = useModalStore();
  const handleViewTemplate = () => {
    openModal('viewTemplateModal');
  };

  const handleFullScreen = () => {
    toggleFullScreenMode();
  };

  return (
    <TransformWrapper
      smooth
      disablePadding
      initialScale={0.5}
      minScale={0.1}
      maxScale={5}
      centerOnInit>
      {({ zoomIn, zoomOut, resetTransform, instance, ...rest }) => (
        <React.Fragment>
          <Space
            style={{
              position: 'absolute',
              top: 0,
              zIndex: 1000,
              left: 20,
              margin: '15px 15px',
            }}>
            <Button onClick={() => zoomIn()}>
              <TbZoomIn />
            </Button>
            <Button onClick={() => zoomOut()}>
              <TbZoomOut />
            </Button>
            <Button onClick={() => resetTransform()}>
              <BiRefresh />
              Restart
            </Button>
            <Button onClick={handleViewTemplate} style={{ width: '100%' }}>
              <SearchOutlined />
              Inspect
            </Button>
            <Button onClick={handleFullScreen} style={{ width: '100%' }}>
              {fullScreenMode ? <TbLayoutSidebar /> : <ExpandOutlined />}
              Full Screen
            </Button>
          </Space>
          <TransformComponent
            contentStyle={{ width: '100%', height: '100%' }}
            wrapperStyle={{
              width: '100%',
              height: '100%',
              backgroundColor: GLOBAL_THEME_COLOR.$secondary_color,
              backgroundImage: `radial-gradient(${GLOBAL_THEME_COLOR.$dark_secondary_color} 8%, transparent 0)`,
              backgroundSize: '20px 20px',
            }}>
            <div
              style={{
                ...MIDDLE_STYLE,
                height: 'calc(100vh - 80px)',
                width: '100%',
                position: 'relative',
                objectFit: 'cover',
                ...style,
              }}>
              <div
                style={{
                  flexDirection: 'column',
                }}>
                {children}
              </div>
            </div>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
  );
};

export default CanvasEditorZoomView;
