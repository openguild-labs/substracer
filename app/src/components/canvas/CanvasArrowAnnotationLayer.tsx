import React from 'react';
import CanvasLayer from './CanvasLayer';
import { CanvasArrowAnnotationConfig, CanvasLayerComponent } from '@core/models';
import { ARROWS } from '@assets/arrows';
import { useLayerConfig } from '@core/index';

const CanvasArrowAnnotationLayer: CanvasLayerComponent = ({ layer, ...props }) => {
  const { config } = useLayerConfig<CanvasArrowAnnotationConfig>(layer);
  return (
    <CanvasLayer layer={layer} {...props}>
      {React.createElement(ARROWS[config.arrowType], {
        ...config.svgProps,
        width: '100%',
        height: '100%',
      })}
    </CanvasLayer>
  );
};

export default CanvasArrowAnnotationLayer;
