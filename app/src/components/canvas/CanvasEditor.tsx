/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useCanvasStore } from "@stores/useCanvasStore";
import { CanvasLayerInfo } from "@core/models/canvas-type";
import { CANVAS_BACKGROUND_LAYER_ID } from "@utils/canvas-template";
import CanvasEditorZoomView from "./CanvasEditorZoomView";
import { renderCanvasLayerChildComponents } from "@utils/canvas.util";
import { layerRegistryHashMap } from "./layer-canvas-registry";
import { MIDDLE_STYLE } from "@constants/responsive";
import { GLOBAL_THEME_COLOR } from "@constants/theme";

type Props = {
  externalLayers?: Record<string, CanvasLayerInfo>;
  disabled?: boolean;
};

const CanvasEditor = ({ externalLayers, disabled }: Props) => {
  const { layers, setVerticalLineRef, setHorizontalLineRef } = useCanvasStore();
  const verticalLineRef = useRef<HTMLDivElement | null>(null);
  const horizontalLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setHorizontalLineRef(horizontalLineRef);
  }, [horizontalLineRef]);

  useEffect(() => {
    setVerticalLineRef(verticalLineRef);
  }, [verticalLineRef]);

  return (
    <CanvasEditorZoomView>
      <div style={{ position: "absolute", width: "100%", height: "100%" }}>
        {
          <React.Fragment>
            <div
              style={{
                position: "absolute",
                top: 0,
                zIndex: 1,
                width: "100%",
                height: "100%",
                left: 0,
                right: 0,
                ...MIDDLE_STYLE,
              }}
            >
              <div
                ref={verticalLineRef}
                style={{
                  visibility: "hidden",
                  border: `2px solid ${GLOBAL_THEME_COLOR.$light_highlight_color}`,
                  borderRadius: 10,
                  height: "100%",
                }}
              ></div>
            </div>
            <div
              style={{
                position: "absolute",
                top: 0,
                zIndex: 1,
                width: "100%",
                height: "100%",
                left: 0,
                right: 0,
                ...MIDDLE_STYLE,
              }}
            >
              <div
                ref={horizontalLineRef}
                style={{
                  visibility: "hidden",
                  border: `2px solid ${GLOBAL_THEME_COLOR.$light_highlight_color}`,
                  borderRadius: 10,
                  width: "100%",
                }}
              ></div>
            </div>
          </React.Fragment>
        }
      </div>
      {renderCanvasLayerChildComponents({
        layers: externalLayers || layers,
        registry: layerRegistryHashMap,
        cond: (layer) =>
          layer.id !== CANVAS_BACKGROUND_LAYER_ID &&
          layer.parentId === CANVAS_BACKGROUND_LAYER_ID,
        disabled,
      })}
    </CanvasEditorZoomView>
  );
};

export default CanvasEditor;
