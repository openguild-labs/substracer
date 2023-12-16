import { CanvasLayerComponentProps, CanvasLayerInfo } from "@core/models";
import { useCanvasUtility } from "@stores/useCanvasUtility";
import React from "react";
import { layerRegistryHashMap } from "./canvas/layer-canvas-registry";

type Props = {
  parentLayer: CanvasLayerInfo;
  componentName: string;
};

const RenderCanvasChildLayer = ({ parentLayer, componentName }: Props) => {
  const { getChildLayerId } = useCanvasUtility();
  return parentLayer.childSet ? (
    <React.Fragment>
      {React.createElement(
        layerRegistryHashMap[
          parentLayer.childSet[getChildLayerId(parentLayer, componentName)]
            .layerComponent
        ],
        {
          layer:
            parentLayer.childSet[getChildLayerId(parentLayer, componentName)],
        } as CanvasLayerComponentProps
      )}
    </React.Fragment>
  ) : (
    <></>
  );
};

export default RenderCanvasChildLayer;
