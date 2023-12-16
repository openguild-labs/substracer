import React from 'react';
import { Input } from 'antd';
import {
  CanvasLayerSettingComponent,
  CanvasTextAnnotationConfig,
  useLayerConfig,
} from '@core/index';

const CanvasLayerFontFamilySetting: CanvasLayerSettingComponent<
  any,
  CanvasTextAnnotationConfig
> = ({ layer }) => {
  const { config, handleUpdateConfig } = useLayerConfig(layer);
  return (
    <div>
      <h4>Text</h4>
      <Input
        value={config.value}
        onChange={e => handleUpdateConfig('value', e.target.value)}
        style={{ marginBottom: 10 }}
      />
    </div>
  );
};

export default CanvasLayerFontFamilySetting;
