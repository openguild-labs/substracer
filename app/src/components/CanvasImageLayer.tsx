/* eslint-disable jsx-a11y/alt-text */

import React from 'react';
import CanvasLayer from './CanvasLayer';
import { CanvasImageLayerConfig, CanvasLayerComponent } from '@core/models/canvas-type';
import { useLayerConfig } from '@core/index';

const CanvasImageLayer: CanvasLayerComponent<any, CanvasImageLayerConfig> = props => {
  const { layer } = props;
  const { config } = useLayerConfig(layer);
  return (
    <CanvasLayer {...props}>
      <img
        draggable={false}
        id="non-draggable-image"
        src={`${config.fileImageItem?.url}`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </CanvasLayer>
  );
};

export default CanvasImageLayer;
