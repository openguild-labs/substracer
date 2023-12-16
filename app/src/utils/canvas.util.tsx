import {
  CanvasLayerComponentMap,
  CanvasLayerComponentProps,
  CanvasLayerInfo,
} from "@core/models/canvas-type";
import React, { ReactNode } from "react";
import { Buffer } from "buffer";

export type LayerSet = Record<string, CanvasLayerInfo<any, any>>;

export function iterateObject<T, R>(
  obj: Record<string, T>,
  callback: (item: T, index: number) => R
) {
  return Object.keys(obj).map((key, index) => callback(obj[key], index));
}

export function countExistentialObject<T>(obj: Record<string, T>) {
  return Object.keys(obj).filter((item) => !!item).length;
}

export function round(value: number, precision: number) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export const renderCanvasLayerChildComponents = ({
  layers,
  registry,
  cond,
  disabled,
}: {
  layers: LayerSet;
  registry: CanvasLayerComponentMap;
  cond?: (layer: CanvasLayerInfo) => boolean;
  disabled?: boolean;
}): ReactNode[] => {
  return iterateObject<CanvasLayerInfo<any>, ReactNode>(layers, (layer) => {
    if (!layer.layerComponent) return;
    if (!registry[layer.layerComponent])
      throw new Error(`No component mapping found for ${layer.layerComponent}`);
    return (
      (cond ? cond(layer) : true) && (
        <React.Fragment>
          {React.createElement(registry[layer.layerComponent], {
            disabled: disabled || !layer.editable,
            layer: layer,
            floating: true,
          } as CanvasLayerComponentProps)}
        </React.Fragment>
      )
    );
  });
};

export const fetchImageBuffer = async (imageUrl: string) => {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  return {
    arrayBuffer,
    base64: Buffer.from(arrayBuffer).toString("base64"),
  };
};

export const getCenterX = (rect: DOMRect) => rect.left + rect.width / 2;
export const getCenterY = (rect: DOMRect) => rect.top + rect.height / 2;
