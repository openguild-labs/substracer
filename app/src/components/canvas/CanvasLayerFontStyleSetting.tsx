/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { CanvasLayerSettingComponent, CanvasTextAnnotationConfig } from '@core/models';
import { useLayerConfig } from '@core/index';
import FontStyleSetting from './FontStyleSetting';

const CanvasLayerFontStyleSetting: CanvasLayerSettingComponent<any, CanvasTextAnnotationConfig> = ({
  layer,
}) => {
  const { config, handleUpdateConfig } = useLayerConfig<CanvasTextAnnotationConfig>(layer);

  return (
    <div>
      <h4>Font style</h4>
      <FontStyleSetting
        color={config.fontStyle.color as string}
        fontWeight={config.fontStyle.fontWeight as number}
        fontFamily={config.fontStyle.fontFamily as string}
        fontSize={config.fontStyle.fontSize as number}
        fontStrokeColor={config.fontStrokeColor as string}
        fontStrokeWidth={config.fontStrokeWidth as number}
        onFontFamilyChange={value =>
          handleUpdateConfig('fontStyle', {
            ...config.fontStyle,
            fontFamily: value,
          } as React.CSSProperties)
        }
        onFontWeightChange={value =>
          handleUpdateConfig('fontStyle', {
            ...config.fontStyle,
            fontWeight: value,
          } as React.CSSProperties)
        }
        onColorChange={value =>
          handleUpdateConfig('fontStyle', {
            ...config.fontStyle,
            color: value,
          } as React.CSSProperties)
        }
        onFontSizeChange={value =>
          handleUpdateConfig('fontStyle', {
            ...config.fontStyle,
            fontSize: value,
          } as React.CSSProperties)
        }
        onFontStrokeColor={value => handleUpdateConfig('fontStrokeColor', value)}
        onFontStrokeWidth={value => handleUpdateConfig('fontStrokeWidth', value)}
      />
    </div>
  );
};

export default CanvasLayerFontStyleSetting;
