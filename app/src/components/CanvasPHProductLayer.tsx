import { CanvasLayerComponent, CanvasPHProductConfig } from '@core/models';
import React from 'react';
import CanvasLayer from './CanvasLayer';
import ProductHuntCard from './ProductHuntCard';
import { useLayerConfig } from '@core/index';

const CanvasPHProductLayer: CanvasLayerComponent<CanvasPHProductConfig> = ({ layer, ...props }) => {
  const { config } = useLayerConfig<CanvasPHProductConfig>(layer);
  return (
    <CanvasLayer layer={layer} {...props}>
      <ProductHuntCard data={config} />
    </CanvasLayer>
  );
};

export default CanvasPHProductLayer;
