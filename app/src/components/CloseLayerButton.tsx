import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useCanvasStore } from '@stores/useCanvasStore';
import { CANVAS_BACKGROUND_LAYER_ID } from '@utils/canvas-template';
import { Tooltip } from 'antd';
import { iterateObject } from '@utils/canvas.util';
import { CanvasLayerId } from '@core/models';

type Props = {
  layerId: string;
};

const CloseLayerButton = ({ layerId }: Props) => {
  const { layers, layerIdsInOrder, selectLayer, updateLayerIdsInOrder } = useCanvasStore();
  const handleCloseLayer = (layerId: CanvasLayerId) => {
    const collectedLayers: CanvasLayerId[] = [layerId];
    iterateObject(layers, layer => {
      if (layer.id?.includes(`${layerId}:`)) {
        collectedLayers.push(layer.id);
      }
    });
    let updatedLayerIdsInOrder: CanvasLayerId[] = layerIdsInOrder;
    for (const id of collectedLayers) {
      delete layers[id];
      updatedLayerIdsInOrder = updatedLayerIdsInOrder.filter(_id => _id !== id);
    }
    selectLayer(CANVAS_BACKGROUND_LAYER_ID);
    updateLayerIdsInOrder(updatedLayerIdsInOrder);
  };
  return (
    <Tooltip title="Remove layer">
      <DeleteOutlined onClick={() => handleCloseLayer(layerId)} style={{ margin: 0 }} />
    </Tooltip>
  );
};

export default CloseLayerButton;
