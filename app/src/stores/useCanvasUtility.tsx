import { CanvasLayerInfo, CanvasLayerType } from '@core/models';
import { iterateObject } from '@utils/canvas.util';
import { useCanvasStore } from './useCanvasStore';

export const useCanvasUtility = () => {
  const { layers, selectLayer, hiddenLayers, updateLayer } = useCanvasStore();
  const getNextLayerId = (type: CanvasLayerType) => {
    let generatedLayerId = 1;
    iterateObject(layers, layer => {
      if (layer.type === type) {
        generatedLayerId++;
      }
    });
    return generatedLayerId.toString();
  };

  const onLayerClicked = (layerId: string) => {
    selectLayer(layerId);
  };

  const onLayerSizeChanged = (layerId: string, width: number, height: number) => {
    updateLayer(layerId, {
      width,
      height,
    });
  };

  const renderableComponent = (layerId: String) => {
    return layers[`${layerId}`] && !hiddenLayers[`${layerId}`];
  };

  const getChildLayerId = (parentLayer: CanvasLayerInfo, childName: string) => {
    return `${parentLayer.id}:${childName}`;
  };

  return {
    getNextLayerId,
    onLayerClicked,
    onLayerSizeChanged,
    renderableComponent,
    getChildLayerId,
  };
};
