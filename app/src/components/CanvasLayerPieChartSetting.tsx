import React from 'react';
import { CanvasLayerSettingComponent, CanvasPieChartConfig } from '@core/models/canvas-type';
import DescriptionItem from './DescriptionItem';
import { Checkbox, InputNumber } from 'antd';
import { useLayerConfig } from '@core/index';

const CanvasLayerPieChartSetting: CanvasLayerSettingComponent<any, CanvasPieChartConfig> = ({
  layer,
}) => {
  const { config, handleUpdateConfig } = useLayerConfig<CanvasPieChartConfig>(layer);
  return (
    <div>
      <h4>Pie Chart Setting</h4>
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Label"
        content={
          <Checkbox
            checked={config.labelShown}
            onChange={e => handleUpdateConfig('labelShown', e.target.checked)}
          />
        }
      />
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Corner Radius"
        content={
          <InputNumber
            min={2}
            max={200}
            value={config.cornerRadius}
            onChange={value => handleUpdateConfig('cornerRadius', value)}
          />
        }
      />
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Donut Mode"
        content={
          <Checkbox
            checked={config.donutMode}
            onChange={e => handleUpdateConfig('donutMode', e.target.checked)}
          />
        }
      />
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Padding"
        content={
          <InputNumber
            min={0}
            max={100}
            value={config.donutPadding}
            onChange={value => handleUpdateConfig('donutPadding', value)}
          />
        }
      />
      {config.donutMode && (
        <DescriptionItem
          textStyle={{
            fontWeight: 'normal',
          }}
          title="Donut Thickness"
          content={
            <InputNumber
              min={2}
              max={200}
              value={config.donutThickness}
              onChange={value => handleUpdateConfig('donutThickness', value)}
            />
          }
        />
      )}
    </div>
  );
};

export default CanvasLayerPieChartSetting;
