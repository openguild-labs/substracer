import { CanvasLayerComponent } from '@core/models/canvas-type';
import React from 'react';
import CanvasLayer from './CanvasLayer';

const CanvasSquareAnnotationLayer: CanvasLayerComponent<any, any> = ({ layer, ...props }) => {
  return <CanvasLayer layer={layer} {...props}></CanvasLayer>;
};

export default CanvasSquareAnnotationLayer;
