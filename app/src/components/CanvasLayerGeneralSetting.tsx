import React from 'react';
import { useCanvasStore } from '@stores/useCanvasStore';
import { CanvasLayerId, CanvasLayerInfo } from '@core/models/canvas-type';
import { MIDDLE_STYLE } from '@constants/responsive';
import { InputNumber, Space } from 'antd';
import { GLOBAL_THEME_COLOR } from '@constants/theme';
import SizePresetButton from './SizePresetButton';
import PaddingSetting from './PaddingSetting';
import ToggleLockButton from './ToggleLockButton';

type Props = {
  layer: CanvasLayerInfo<any>;
};

const CanvasLayerGeneralSetting = ({ layer }: Props) => {
  const { updateLayer } = useCanvasStore();
  const onWidthChange = (layerId: CanvasLayerId, value: number) => {
    updateLayer(layerId, {
      width: value,
    });
  };

  const onHeightChange = (layerId: CanvasLayerId, value: number) => {
    updateLayer(layerId, {
      height: value,
    });
  };
  return (
    <React.Fragment>
      <h4>Size</h4>
      <Space style={{ ...MIDDLE_STYLE, justifyContent: 'space-evenly' }}>
        <InputNumber
          controls={false}
          prefix={
            <div
              style={{
                fontWeight: 'bold',
                borderRight: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
                paddingRight: 10,
                marginRight: 10,
              }}>
              W
            </div>
          }
          disabled={!layer.editable}
          min={50}
          max={5000}
          value={layer.width}
          onChange={value => onWidthChange(layer.id, value || 0)}
        />
        <ToggleLockButton
          value={!!layer.lockAspectRatio}
          lockText="Lock Aspect Ratio"
          unlockText="Unlock Aspect Ratio"
          onLockToggle={isToggled =>
            updateLayer(layer.id, {
              lockAspectRatio: isToggled,
            })
          }
        />
        <InputNumber
          controls={false}
          prefix={
            <div
              style={{
                fontWeight: 'bold',
                borderRight: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
                paddingRight: 10,
                marginRight: 10,
              }}>
              H
            </div>
          }
          disabled={!layer.editable}
          min={50}
          max={5000}
          value={layer.height}
          onChange={value => onHeightChange(layer.id, value || 0)}
        />
      </Space>
      <div style={{ margin: '15px 0px' }}>
        <SizePresetButton />
      </div>
      <PaddingSetting layer={layer} />
    </React.Fragment>
  );
};

export default CanvasLayerGeneralSetting;
