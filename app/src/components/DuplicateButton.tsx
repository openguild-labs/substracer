import { CopyOutlined } from '@ant-design/icons';
import { CanvasLayerInfo } from '@core/models';
import { useCanvasStore } from '@stores/useCanvasStore';
import { useCanvasUtility } from '@stores/useCanvasUtility';
import React from 'react';

type Props = {
  layerId: string;
};

const DuplicateButton = ({ layerId }: Props) => {
  const { addNewLayer, layers } = useCanvasStore();
  const { getNextLayerId } = useCanvasUtility();
  const handleDuplicate = () => {
    const newLayerId = `${layers[layerId].id}_copy_${getNextLayerId(layers[layerId].type)}`;
    const newLayerName = `${layers[layerId].name} (Copy ${getNextLayerId(layers[layerId].type)})`;
    const updatedChildSet: Record<string, CanvasLayerInfo> = {};
    for (const childKey of Object.keys(layers[layerId].childSet || {})) {
      const child: any = layers[layerId].childSet?.[childKey];
      const newChildId = childKey.replace(layerId, newLayerId);
      const newChildName = `${child?.name} (Copy ${getNextLayerId(child.type)})`;
      updatedChildSet[newChildId] = addNewLayer(newChildId, {
        ...(child as any),
        id: newChildId,
        name: newChildName,
      });
    }
    addNewLayer(newLayerId, {
      ...layers[layerId],
      id: newLayerId,
      name: newLayerName,
    });
  };
  return (
    <div>
      <CopyOutlined onClick={handleDuplicate} />
    </div>
  );
};

export default DuplicateButton;
