import React, { useMemo } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useCanvasStore } from '@stores/useCanvasStore';
import { Tooltip } from 'antd';
import { iterateObject } from '@utils/canvas.util';
import { CanvasLayerId } from '@core/models';

type Props = {
  layerId: string;
};

const HideLayerButton = ({ layerId }: Props) => {
  const { layers, toggleHiddenLayer, hiddenLayers } = useCanvasStore();
  const hidden = useMemo(() => hiddenLayers[layerId], [hiddenLayers, layerId]);

  const handleToggleHideLayer = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    layerId: CanvasLayerId
  ) => {
    e.stopPropagation();
    const collectedLayers: CanvasLayerId[] = [];
    iterateObject(layers, layer => {
      if (layer.id.includes(layerId)) {
        collectedLayers.push(layer.id);
      }
    });
    for (const id of collectedLayers) {
      toggleHiddenLayer(id);
    }
  };
  return (
    <Tooltip title={hidden ? 'Show layer' : 'Hide layer'}>
      {hidden ? (
        <EyeInvisibleOutlined
          onClick={e => handleToggleHideLayer(e, layerId)}
          style={{ margin: 0 }}
        />
      ) : (
        <EyeOutlined onClick={e => handleToggleHideLayer(e, layerId)} style={{ margin: 0 }} />
      )}
    </Tooltip>
  );
};

export default HideLayerButton;
