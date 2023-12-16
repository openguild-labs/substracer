/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
import React from 'react';
import CanvasLayer from './CanvasLayer';
import { CanvasEmojiAnnotationConfig, CanvasLayerComponent } from '@core/models/canvas-type';
import { useLayerConfig } from '@core/index';

const CanvasEmojiAnnotationLayer: CanvasLayerComponent<any, CanvasEmojiAnnotationConfig> = ({
  layer,
  ...props
}) => {
  const { config } = useLayerConfig<CanvasEmojiAnnotationConfig>(layer);
  return (
    <CanvasLayer layer={layer} {...props}>
      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: layer.height }}>
          {config.value.length === 5
            ? String.fromCodePoint(parseInt(config.value, 16))
            : config.value}
        </div>
      </div>
    </CanvasLayer>
  );
};

export default CanvasEmojiAnnotationLayer;
