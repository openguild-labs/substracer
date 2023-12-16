import React from 'react';
import DescriptionItem from './DescriptionItem';
import SolidColorButton from './SolidColorButton';
import {
  CanvasBarChartConfig,
  CanvasLayerSettingComponent,
  TextAlignmentValue,
  TextStyleConfig,
} from '@core/models';
import { useLayerConfig } from '@core/index';
import { Checkbox, Divider, InputNumber } from 'antd';
import { TwitterPicker } from 'react-color';
import FontStyleSetting from './FontStyleSetting';

const CanvasLayerBarChartSetting: CanvasLayerSettingComponent<any, CanvasBarChartConfig> = ({
  layer,
}) => {
  const { config, handleUpdateConfig } = useLayerConfig<CanvasBarChartConfig>(layer);
  return (
    <div>
      <h4>Bar Chart Setting</h4>
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title={'Bar width'}
        content={
          <InputNumber
            value={config.barWidth}
            onChange={value => handleUpdateConfig('barWidth', value)}
          />
        }
      />
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title={'Bar Height'}
        content={
          <InputNumber
            value={config.barHeight}
            onChange={value => handleUpdateConfig('barHeight', value)}
          />
        }
      />
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Show Label"
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
        title="Show Bar Value"
        content={
          <Checkbox
            checked={config.barValueShown}
            onChange={e => handleUpdateConfig('barValueShown', e.target.checked)}
          />
        }
      />
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Apply one color for all bar"
        content={
          <Checkbox
            checked={config.oneColorMode}
            onChange={e => handleUpdateConfig('oneColorMode', e.target.checked)}
          />
        }
      />
      {config.oneColorMode && (
        <React.Fragment>
          <DescriptionItem
            textStyle={{
              fontWeight: 'normal',
            }}
            title="Bar Color"
            content={
              <SolidColorButton
                value={config.barColor}
                onValueChanged={value => handleUpdateConfig('barColor', value)}
              />
            }
          />
          <br />
          <TwitterPicker
            triangle="hide"
            color={config.barColor}
            onChange={e => handleUpdateConfig('barColor', e.hex)}
          />
        </React.Fragment>
      )}
      <Divider />
      <h4>Label</h4>
      <FontStyleSetting
        align={(config.labelStyle?.fontStyle.textAlign as any) || 'initial'}
        color={config.labelStyle?.fontStyle.color as string}
        fontSize={config.labelStyle?.fontStyle.fontSize as number}
        fontWeight={500}
        fontFamily={config.labelStyle?.fontStyle.fontFamily as string}
        onAlignChange={value =>
          handleUpdateConfig('labelStyle', {
            ...config.labelStyle,
            fontStyle: {
              ...config.labelStyle?.fontStyle,
              textAlign: value,
            },
          } as TextStyleConfig)
        }
        onFontWeightChange={value =>
          handleUpdateConfig('labelStyle', {
            ...config.labelStyle,
            fontStyle: {
              ...config.labelStyle?.fontStyle,
              fontWeight: value,
            },
          } as TextStyleConfig)
        }
        onFontFamilyChange={value =>
          handleUpdateConfig('labelStyle', {
            ...config.labelStyle,
            fontStyle: {
              ...config.labelStyle?.fontStyle,
              fontFamily: value,
            },
          } as TextStyleConfig)
        }
        onColorChange={value =>
          handleUpdateConfig('labelStyle', {
            ...config.labelStyle,
            fontStyle: {
              ...config.labelStyle?.fontStyle,
              color: value,
            } as TextStyleConfig,
          })
        }
        onFontSizeChange={value =>
          handleUpdateConfig('labelStyle', {
            ...config.labelStyle,
            fontStyle: {
              ...config.labelStyle?.fontStyle,
              fontSize: value,
            } as TextStyleConfig,
          })
        }
      />
      <h4>Bar Value</h4>
      <FontStyleSetting
        align={config.barValueStyle?.fontStyle.textAlign as TextAlignmentValue}
        color={config.barValueStyle?.fontStyle.color as string}
        fontWeight={500}
        fontFamily={config.barValueStyle?.fontStyle.fontFamily as string}
        fontSize={config.barValueStyle?.fontStyle.fontSize as number}
        onAlignChange={value =>
          handleUpdateConfig('barValueStyle', {
            ...config.barValueStyle,
            fontStyle: {
              ...config.barValueStyle?.fontStyle,
              textAlign: value,
            },
          } as TextStyleConfig)
        }
        onFontWeightChange={value =>
          handleUpdateConfig('barValueStyle', {
            ...config.barValueStyle,
            fontStyle: {
              ...config.barValueStyle?.fontStyle,
              fontWeight: value,
            },
          } as TextStyleConfig)
        }
        onFontFamilyChange={value =>
          handleUpdateConfig('barValueStyle', {
            ...config.barValueStyle,
            fontStyle: {
              ...config.barValueStyle?.fontStyle,
              fontFamily: value,
            },
          } as TextStyleConfig)
        }
        onColorChange={value =>
          handleUpdateConfig('barValueStyle', {
            ...config.barValueStyle,
            fontStyle: {
              ...config.barValueStyle?.fontStyle,
              color: value,
            } as TextStyleConfig,
          })
        }
        onFontSizeChange={value =>
          handleUpdateConfig('barValueStyle', {
            ...config.barValueStyle,
            fontStyle: {
              ...config.barValueStyle?.fontStyle,
              fontSize: value,
            } as TextStyleConfig,
          })
        }
      />
    </div>
  );
};

export default CanvasLayerBarChartSetting;
