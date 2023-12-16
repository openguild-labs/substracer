import { CanvasLayerComponentProps } from "@core/models";
import { useCanvasUtility } from "@stores/useCanvasUtility";
import React from "react";
import { layerRegistryHashMap } from "./canvas/layer-canvas-registry";
import { useCanvasStore } from "@stores/useCanvasStore";

type Props = {
  layerId: string;
};

const RenderCanvasLayer = ({ layerId }: Props) => {
  const { layers } = useCanvasStore();
  const { renderableComponent } = useCanvasUtility();
  return (
    <React.Fragment>
      {renderableComponent(layerId) &&
        layerRegistryHashMap[layers[layerId].layerComponent] &&
        React.createElement(
          layerRegistryHashMap[layers[layerId].layerComponent],
          {
            layer: layers[layerId],
          } as CanvasLayerComponentProps
        )}
    </React.Fragment>
  );
};

export default RenderCanvasLayer;
