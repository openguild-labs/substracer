import React from "react";
import { CanvasLayerComponent } from "@core/models";
import CanvasLayer from "./CanvasLayer";
import RenderCanvasChildLayer from "../RenderCanvasChildLayer";
import { MIDDLE_STYLE } from "@constants/responsive";
import { useCanvasStore } from "@stores/useCanvasStore";
import RenderCanvasLayer from "../RenderCanvasLayer";
import { useCanvasUtility } from "@stores/useCanvasUtility";

const CanvasChartLayoutLayer: CanvasLayerComponent = ({
  layer,
  children,
  ...props
}) => {
  const { preview } = useCanvasStore();
  const { getChildLayerId } = useCanvasUtility();

  return (
    <CanvasLayer layer={layer} {...props}>
      <div
        style={{
          padding: "10px 0px",
          ...MIDDLE_STYLE,
          flexDirection: "column",
        }}
      >
        {preview ? (
          <React.Fragment>
            <RenderCanvasChildLayer parentLayer={layer} componentName="title" />
            <RenderCanvasChildLayer
              parentLayer={layer}
              componentName="subtitle"
            />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <RenderCanvasLayer layerId={getChildLayerId(layer, "title")} />
            <RenderCanvasLayer layerId={getChildLayerId(layer, "subtitle")} />
          </React.Fragment>
        )}
      </div>
      <div style={{ position: "relative", height: "100%" }}>{children}</div>
    </CanvasLayer>
  );
};

export default CanvasChartLayoutLayer;
