import React from 'react';
import { MIDDLE_STYLE } from '@constants/responsive';
import { CanvasLayerSettingComponent } from '@core/models';
import { useCanvasStore } from '@stores/useCanvasStore';
import { Button, Space } from 'antd';
import { reorder } from '@utils/draggable.util';

const CanvasLayerOrderSetting: CanvasLayerSettingComponent = ({ layer }) => {
  const { layerIdsInOrder, updateLayerIdsInOrder } = useCanvasStore();

  const handleMoveDown: React.MouseEventHandler<HTMLSpanElement> = e => {
    const layerIndex = layerIdsInOrder.findIndex(lid => lid === layer.id);
    const items = reorder(
      layerIdsInOrder,
      layerIndex,
      Math.min(layerIndex + 1, layerIdsInOrder.length - 1)
    );
    updateLayerIdsInOrder(items);
  };

  const handleMoveUp: React.MouseEventHandler<HTMLSpanElement> = e => {
    const layerIndex = layerIdsInOrder.findIndex(lid => lid === layer.id);
    const items = reorder(layerIdsInOrder, layerIndex, Math.max(layerIndex - 1, 1));
    updateLayerIdsInOrder(items);
  };

  const handleMoveFront: React.MouseEventHandler<HTMLSpanElement> = e => {
    const layerIndex = layerIdsInOrder.findIndex(lid => lid === layer.id);
    const items = reorder(layerIdsInOrder, layerIndex, 1);
    updateLayerIdsInOrder(items);
  };

  const handleMoveBottom: React.MouseEventHandler<HTMLSpanElement> = e => {
    const layerIndex = layerIdsInOrder.findIndex(lid => lid === layer.id);
    const items = reorder(layerIdsInOrder, layerIndex, layerIdsInOrder.length - 1);
    updateLayerIdsInOrder(items);
  };

  return (
    <div>
      <h4>Layer Order</h4>
      <Space direction="vertical" style={{ ...MIDDLE_STYLE }}>
        <Space style={{ ...MIDDLE_STYLE }}>
          <Button style={{ ...MIDDLE_STYLE }} onClick={handleMoveFront}>
            Front
          </Button>
          <Button style={{ ...MIDDLE_STYLE }} onClick={handleMoveBottom}>
            Back
          </Button>
          <Button style={{ ...MIDDLE_STYLE }} onClick={handleMoveUp}>
            Top
          </Button>
          <Button style={{ ...MIDDLE_STYLE }} onClick={handleMoveDown}>
            Bottom
          </Button>
        </Space>
      </Space>
    </div>
  );
};

export default CanvasLayerOrderSetting;
