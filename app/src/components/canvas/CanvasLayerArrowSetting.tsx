import { ARROWS } from '@assets/arrows';
import { GLOBAL_THEME_COLOR } from '@constants/theme';
import { useLayerConfig } from '@core/index';
import { CanvasArrowAnnotationConfig, CanvasLayerSettingComponent } from '@core/models';
import { Space } from 'antd';
import React from 'react';

const CanvasLayerArrowSetting: CanvasLayerSettingComponent = ({ layer }) => {
  const { config, handleUpdateConfig } = useLayerConfig<CanvasArrowAnnotationConfig>(layer);
  return (
    <div>
      <h4>Arrow</h4>
      <Space style={{ flexWrap: 'wrap' }}>
        {ARROWS.map((arrowComponent, index) => (
          <React.Fragment>
            <div
              onClick={() => handleUpdateConfig('arrowType', index)}
              style={{
                borderRadius: 10,
                border:
                  config.arrowType === index
                    ? `3px solid ${GLOBAL_THEME_COLOR.$highlight_color}`
                    : `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
                padding: '20px',
                width: 'fit-content',
                cursor: 'pointer',
              }}>
              {React.createElement(arrowComponent, {
                height: 50,
                width: 50,
                fill: 'black',
                transform: 'rotate(30, 0, 0)',
              })}
            </div>
          </React.Fragment>
        ))}
      </Space>
    </div>
  );
};

export default CanvasLayerArrowSetting;
