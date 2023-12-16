import { CanvasLayerSettingComponent, CanvasSvgGraphicConfig } from '@core/models';
import React, { ReactSVGElement } from 'react';
import DescriptionItem from './DescriptionItem';
import SolidColorButton from './SolidColorButton';
import { useLayerConfig } from '@core/index';
import { InputNumber } from 'antd';

const CanvasLayerSvgSetting: CanvasLayerSettingComponent = ({ layer }) => {
  const { config, handleUpdateConfig } = useLayerConfig<CanvasSvgGraphicConfig>(layer);
  return (
    <div>
      <h4>Graphic Setting</h4>
      <DescriptionItem
        title="Fill color"
        textStyle={{ fontWeight: 'normal' }}
        content={
          <SolidColorButton
            value={config.svgProps?.fill as string}
            onValueChanged={value =>
              handleUpdateConfig('svgProps', {
                ...config.svgProps,
                fill: value,
              } as React.SVGProps<ReactSVGElement>)
            }
          />
        }
      />
      <DescriptionItem
        title="Stroke color"
        textStyle={{ fontWeight: 'normal' }}
        content={
          <SolidColorButton
            value={config.svgProps?.stroke as string}
            onValueChanged={value =>
              handleUpdateConfig('svgProps', {
                ...config.svgProps,
                stroke: value,
              } as React.SVGProps<ReactSVGElement>)
            }
          />
        }
      />
      <DescriptionItem
        title="Stroke width"
        textStyle={{ fontWeight: 'normal' }}
        content={
          <InputNumber
            value={config.svgProps?.strokeWidth as string}
            onChange={value =>
              handleUpdateConfig('svgProps', {
                ...config.svgProps,
                strokeWidth: value,
              } as React.SVGProps<ReactSVGElement>)
            }
          />
        }
      />
    </div>
  );
};

export default CanvasLayerSvgSetting;
