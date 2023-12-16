/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { MIDDLE_STYLE } from "@constants/responsive";
import { FileImageItem } from "@core/models";
import { Resizable } from "re-resizable";
import Draggable from "react-draggable";
import { delay } from "@utils/date.util";
import {
  CanvasBackgroundVariant,
  CanvasLayerComponentProps,
  CanvasSolidBackground,
} from "@core/models/canvas-type";
import CanvasLayerStatusBar from "./CanvasLayerStatusBar";
import { GLOBAL_THEME_COLOR, STRIPE_BOX_SHADOW } from "@constants/theme";
import { useCanvasUtility } from "@stores/useCanvasUtility";
import { MdRotateRight } from "react-icons/md";
import { getAngle } from "@utils/rotatable.util";
import { CANVAS_BACKGROUND_LAYER_ID } from "@utils/canvas-template";
import { useCanvasStore } from "@stores/useCanvasStore";
import { getCenterX, getCenterY } from "@utils/canvas.util";

const FLOATING_LAYER: React.CSSProperties = {
  position: "absolute",
};

type Props = CanvasLayerComponentProps;

const CustomSideHandle = () => {
  return (
    <div style={{ ...MIDDLE_STYLE }}>
      <div className="canvas-layer-side-handle "></div>
    </div>
  );
};

const CanvasLayer = ({ layer, floating, children }: Props) => {
  const canvasLayerRef = useRef<HTMLDivElement | null>(null);
  const {
    selectedLayers,
    hiddenLayers,
    layerIdsInOrder,
    layers,
    updateLayer,
    verticalLineRef,
    horizontalLineRef,
  } = useCanvasStore();
  const selected = useMemo(
    () => selectedLayers[layer.id],
    [selectedLayers, layer]
  );
  const hidden = useMemo(() => hiddenLayers[layer.id], [hiddenLayers, layer]);
  const [updating, setUpdating] = useState<number>(+new Date());
  const { onLayerClicked, onLayerSizeChanged } = useCanvasUtility();
  const [disabled, resizable, draggable, rotatable] = useMemo(
    () => [!layer.editable, layer.resizable, layer.draggable, layer.rotatable],
    [layer]
  );
  const ref = useRef<Resizable | null>(null);
  const [draggableDisabled, setDraggableDisabled] = useState<boolean>(false);
  const [clickableDisabled, setClickableDisabled] = useState<boolean>(false);
  const resizableDisabled = useMemo(
    () => disabled || !resizable || selected,
    [disabled, resizable, selected]
  );
  const backgroundImage = useMemo(
    () =>
      layer.background.type === CanvasBackgroundVariant.Image
        ? (layer.background.value as FileImageItem)
        : GLOBAL_THEME_COLOR.$secondary_color,
    [layer.background]
  );
  const backgroundColor = useMemo(
    () =>
      layer.background.type === CanvasBackgroundVariant.Solid ||
      layer.background.type === CanvasBackgroundVariant.Gradient
        ? (layer.background.value as unknown as CanvasSolidBackground)
        : undefined,
    [layer.background]
  );

  const handleOnLayerClicked = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!clickableDisabled) {
      onLayerClicked(layer.id);
    }
  };

  const handleStartRotate: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const element = canvasLayerRef.current;
    if (!element) return;
    if (e.button !== 0) return;
    const { clientX, clientY } = e;
    const rect = element.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    const startVector = {
      x: clientX - center.x,
      y: clientY - center.y,
    };
    const onMove = (e: any) => {
      e.stopPropagation();
      const { clientX, clientY } = e;
      const rotateVector = {
        x: clientX - center.x,
        y: clientY - center.y,
      };
      const angle = getAngle(startVector, rotateVector);
      updateLayer(layer.id, {
        cssStyles: {
          ...layer.cssStyles,
          transform: `rotate(${angle}deg)`,
        },
      });
    };
    const onUp = async () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      setDraggableDisabled(false);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  const layerZIndex = useMemo(
    () =>
      5 +
      (layerIdsInOrder.length -
        layerIdsInOrder.findIndex((lid) => lid === layer.id)),
    [layerIdsInOrder, layer]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.updateSize({
        width: layer.width,
        height: layer.height,
      });
    }
  }, [layer.width, layer.height]);

  useEffect(() => {
    const canvasBoundingRect =
      layers[
        layer.parentId || CANVAS_BACKGROUND_LAYER_ID
      ]?.ref?.current?.getBoundingClientRect();
    const boundingRect = canvasLayerRef.current?.getBoundingClientRect();
    if (!boundingRect || !canvasBoundingRect) return;
    updateLayer(layer.id, {
      x: boundingRect.x - canvasBoundingRect.x,
      y: boundingRect.y - canvasBoundingRect.y,
    });
  }, [canvasLayerRef.current, updating]);

  useEffect(() => {
    updateLayer(layer.id, {
      ref: canvasLayerRef,
    });
  }, [canvasLayerRef, layer.id, layer.background]);

  useEffect(() => {
    if (
      !canvasLayerRef.current ||
      !layers[CANVAS_BACKGROUND_LAYER_ID].ref?.current
    )
      return;
    const layerRect = canvasLayerRef.current.getBoundingClientRect();
    const backgroundLayerRect =
      layers[CANVAS_BACKGROUND_LAYER_ID].ref.current.getBoundingClientRect();
    const [backgroundLayerCenterX, backgroundLayerCenterY] = [
      getCenterX(backgroundLayerRect),
      getCenterY(backgroundLayerRect),
    ];
    const [layerCenterX, layerCenterY] = [
      getCenterX(layerRect),
      getCenterY(layerRect),
    ];

    const offset = 5;
    const inRange = (item: number, min: number, max: number) =>
      item <= max && item >= min;
    const verticalLine = verticalLineRef?.current;
    const horizontalLine = horizontalLineRef?.current;
    if (verticalLine)
      if (
        inRange(
          layerCenterX,
          backgroundLayerCenterX - offset,
          backgroundLayerCenterX + offset
        )
      ) {
        verticalLine.style.visibility = "visible";
      } else {
        verticalLine.style.visibility = "hidden";
      }
    if (horizontalLine)
      if (
        inRange(
          layerCenterY,
          backgroundLayerCenterY - offset,
          backgroundLayerCenterY + offset
        )
      ) {
        horizontalLine.style.visibility = "visible";
      } else {
        horizontalLine.style.visibility = "hidden";
      }
  }, [canvasLayerRef, updating]);

  useEffect(() => {
    const verticalLine = verticalLineRef?.current;
    const horizontalLine = horizontalLineRef?.current;
    if (verticalLine) verticalLine.style.visibility = "hidden";
    if (horizontalLine) horizontalLine.style.visibility = "hidden";
  }, [selectedLayers]);

  return !hidden ? (
    <Draggable
      defaultPosition={{
        x: 0,
        y: 0,
      }}
      onDrag={(e) => {
        e.stopPropagation();
        setUpdating(+new Date());
      }}
      scale={0.5}
      disabled={disabled || !draggable || draggableDisabled}
    >
      <div
        className="no-styles"
        onClick={handleOnLayerClicked}
        onDrag={(e) => e.stopPropagation()}
        style={{
          ...MIDDLE_STYLE,
          flexDirection: "column",
          position: "relative",
          zIndex: layerZIndex,
          width: "fit-content",

          ...(floating ? FLOATING_LAYER : {}),
        }}
      >
        <div
          style={{
            transform: `rotate3d(${layer.transform3dStyles?.x || 0}, ${
              layer.transform3dStyles?.y || 0
            }, ${layer.transform3dStyles?.z || 0}, ${
              layer.transform3dStyles?.a
            }deg)`,
          }}
        >
          {!disabled && selected && (
            <div
              style={{
                position: "absolute",
                top: -70,
                zIndex: 200,
                left: 0,
                right: 0,
              }}
            >
              <CanvasLayerStatusBar layer={layer} />
            </div>
          )}
          {rotatable && !disabled && selected && (
            <div
              style={{
                position: "absolute",
                bottom: -60,
                zIndex: 200,
                left: 0,
                right: 0,
              }}
            >
              <div style={{ ...MIDDLE_STYLE }}>
                <div
                  onMouseEnter={() => setDraggableDisabled(true)}
                  onMouseDown={handleStartRotate}
                  style={{
                    ...MIDDLE_STYLE,
                    padding: 5,
                    borderRadius: 50,
                    color: GLOBAL_THEME_COLOR.$highlight_color,
                    fontSize: 35,
                    backgroundColor: GLOBAL_THEME_COLOR.$primary_color,
                    boxShadow: STRIPE_BOX_SHADOW,
                    border: `1px solid ${GLOBAL_THEME_COLOR.$highlight_color}`,
                    cursor: "grab",
                  }}
                >
                  <MdRotateRight />
                </div>
              </div>
            </div>
          )}
          <Resizable
            ref={ref}
            resizeRatio={layer.width / layer.height}
            lockAspectRatio={layer.lockAspectRatio}
            onResizeStop={async (
              e,
              dir,
              ref,
              { height: deltaHeight, width: deltaWidth }
            ) => {
              e.stopPropagation();
              if (layer.resizable)
                onLayerSizeChanged(
                  layer.id,
                  layer.width + deltaWidth,
                  layer.height + deltaHeight
                );
              await delay(100);
              setDraggableDisabled(false);
              setClickableDisabled(false);
            }}
            onResizeStart={(e) => {
              e.stopPropagation();
              setUpdating(+new Date());
              setDraggableDisabled(true);
              setClickableDisabled(true);
            }}
            handleComponent={
              !disabled && selected
                ? {
                    bottom: <CustomSideHandle />,
                    top: <CustomSideHandle />,
                  }
                : {}
            }
            handleClasses={
              !disabled && selected
                ? {
                    bottomLeft: "canvas-layer-corner-handle bottom-left",
                    bottomRight: "canvas-layer-corner-handle bottom-right",
                    topRight: "canvas-layer-corner-handle top-right",
                    topLeft: "canvas-layer-corner-handle top-left",
                  }
                : {}
            }
            style={{
              ...MIDDLE_STYLE,
              boxSizing: "border-box",
              cursor: selected ? "grab" : "pointer",
              position: "relative",
            }}
            enable={{
              bottom: resizableDisabled,
              bottomLeft: resizableDisabled,
              bottomRight: resizableDisabled,
              left: resizableDisabled,
              right: resizableDisabled,
              top: resizableDisabled,
              topLeft: resizableDisabled,
              topRight: resizableDisabled,
            }}
            className={`${
              !disabled && selected ? "canvas-item-selected" : "canvas-item"
            }`}
          >
            <div ref={canvasLayerRef} style={{ width: "100%", height: "100%" }}>
              <div
                style={{
                  ...MIDDLE_STYLE,
                  background: backgroundColor,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                  aspectRatio: layer.width / layer.height,
                  flexDirection: "column",
                  cursor: "pointer",
                  border: layer.cssStyles?.borderWidth
                    ? `${layer.cssStyles?.borderWidth}px solid ${layer.cssStyles?.borderColor}`
                    : "unset",
                  ...layer.cssStyles,

                  ...(layer.background.type ===
                  CanvasBackgroundVariant["Mesh Gradient"]
                    ? layer.background.value
                    : {}),
                }}
              >
                {layer.background.type === CanvasBackgroundVariant.Image &&
                  backgroundImage && (
                    <img
                      draggable={false}
                      id="non-draggable-image"
                      src={`${(layer.background.value as FileImageItem)?.url}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        pointerEvents: "none",
                        zIndex: -1,
                      }}
                    />
                  )}
                {children}
                {layer.id === CANVAS_BACKGROUND_LAYER_ID && (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 1000,
                      right: 0,
                      bottom: 0,
                      width: "fit-content",
                      height: "fit-content",
                    }}
                  >
                    <div
                      style={{
                        boxShadow: STRIPE_BOX_SHADOW,
                        backgroundColor: GLOBAL_THEME_COLOR.$dark_primary_color,
                        padding: "10px 25px",
                        borderRadius: 10,
                        margin: 20,
                      }}
                    >
                      <h3
                        style={{
                          color: GLOBAL_THEME_COLOR.$text_color_contrast,
                        }}
                      >
                        <span style={{ fontWeight: "normal" }}>
                          Powered by{" "}
                        </span>
                        https://substracer
                      </h3>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Resizable>
        </div>
      </div>
    </Draggable>
  ) : (
    <></>
  );
};

export default CanvasLayer;
