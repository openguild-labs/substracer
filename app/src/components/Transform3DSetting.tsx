import React from 'react';
import { CanvasLayerSettingComponent } from '@core/models';
import DescriptionItem from './DescriptionItem';
import { Slider } from 'antd';
import { useCanvasStore } from '@stores/useCanvasStore';

const Transfrom3DSetting: CanvasLayerSettingComponent = ({ layer }) => {
  const { updateLayer } = useCanvasStore();
  return (
    <div>
      <h4>3D Transform</h4>
      <DescriptionItem
        title="Intensity"
        content={
          <Slider
            min={0}
            max={90}
            step={5}
            style={{ width: '100%' }}
            onChange={value =>
              updateLayer(layer.id, {
                ...layer,
                transform3dStyles: {
                  ...layer.transform3dStyles,
                  a: value,
                },
              })
            }
            value={layer.transform3dStyles?.a || 0}
          />
        }
      />
      <DescriptionItem
        title="Tilt X"
        content={
          <Slider
            min={-45}
            max={45}
            style={{ width: '100%' }}
            onChange={value =>
              updateLayer(layer.id, {
                ...layer,
                transform3dStyles: {
                  ...layer.transform3dStyles,
                  x: value,
                },
              })
            }
            value={layer.transform3dStyles?.x || 0}
          />
        }
      />
      <DescriptionItem
        title="Tilt Y"
        content={
          <Slider
            min={-45}
            max={45}
            style={{ width: '100%' }}
            onChange={value =>
              updateLayer(layer.id, {
                ...layer,
                transform3dStyles: {
                  ...layer.transform3dStyles,
                  y: value,
                },
              })
            }
            value={layer.transform3dStyles?.y || 0}
          />
        }
      />
      <DescriptionItem
        title="Tilt Z"
        content={
          <Slider
            min={-45}
            max={45}
            style={{ width: '100%' }}
            onChange={value =>
              updateLayer(layer.id, {
                ...layer,
                transform3dStyles: {
                  ...layer.transform3dStyles,
                  z: value,
                },
              })
            }
            value={layer.transform3dStyles?.z || 0}
          />
        }
      />
    </div>
  );
};

export default Transfrom3DSetting;
