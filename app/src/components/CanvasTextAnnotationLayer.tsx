/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import React, { useEffect } from 'react';
import CanvasLayer from './CanvasLayer';
import { CanvasLayerComponent, CanvasTextAnnotationConfig } from '@core/models/canvas-type';
import { useLayerConfig } from '@core/index';
import { generateTextStroke } from '@utils/css.util';

const CanvasTextAnnotationLayer: CanvasLayerComponent<any, CanvasTextAnnotationConfig> = ({
  layer,
  ...props
}) => {
  const { config, handleUpdateConfig } = useLayerConfig<CanvasTextAnnotationConfig>(layer);

  useEffect(() => {
    handleUpdateConfig('fontStyle', {
      ...config.fontStyle,
      textShadow: generateTextStroke(config.fontStrokeColor, config.fontStrokeWidth),
    } as React.CSSProperties);
  }, [config.fontStrokeColor, config.fontStrokeWidth]);

  return (
    <CanvasLayer layer={layer} {...props}>
      <div style={config.fontStyle}>{config.value}</div>
    </CanvasLayer>
  );
};

export default CanvasTextAnnotationLayer;
