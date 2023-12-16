import { Button, Col, Divider, Popover, Row } from 'antd';
import React from 'react';
import { TbRuler } from 'react-icons/tb';
import { MIDDLE_STYLE } from '@constants/responsive';
import { listOfPresets } from '@constants/listOfPresets';
import { SizePreset } from '@core/models';
import { useCanvasStore } from '@stores/useCanvasStore';
import { iterateObject } from '@utils/canvas.util';

type Props = {};

const SizePresetButton = (props: Props) => {
  const { layers, selectedLayers, updateLayer } = useCanvasStore();

  const handlePresetClicked = (preset: SizePreset) => {
    iterateObject(layers, layer => {
      if (selectedLayers[layer.id]) {
        updateLayer(layer.id, {
          width: preset.width,
          height: preset.height,
        });
      }
    });
  };

  const SizePresetPopover = () => {
    return (
      <div style={{ minWidth: 400, maxWidth: 600, padding: '30px 30px' }}>
        <h3 style={{ margin: 0 }}>Size Presets</h3>
        <Divider />
        <Row gutter={30}>
          {listOfPresets.map(item => (
            <Col span={12}>
              <div style={{ ...MIDDLE_STYLE, justifyContent: 'flex-start' }}>
                {item.icon}
                <h4 style={{ marginLeft: 10, fontWeight: 'normal' }}>{item.name}</h4>
              </div>
              {item.presets.map(preset => (
                <div
                  onClick={() => handlePresetClicked(preset)}
                  className="size-preset-btn"
                  style={{ ...MIDDLE_STYLE, justifyContent: 'space-between', fontSize: 'smaller' }}>
                  <div style={{ fontWeight: 'bold' }}>{preset.title} </div>
                  <span>
                    {preset.width}x{preset.height}
                  </span>
                </div>
              ))}
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  return (
    <Popover trigger={'click'} content={<SizePresetPopover />} placement="left">
      <Button style={{ width: '100%' }}>
        <TbRuler /> Choose size presets
      </Button>
    </Popover>
  );
};

export default SizePresetButton;
