import React from 'react';
import { CanvasLayerSettingComponent, CanvasLineChartConfig } from '@core/models/canvas-type';
import DescriptionItem from './DescriptionItem';
import { Checkbox, Divider, Input, InputNumber, Tooltip } from 'antd';
import { MIDDLE_STYLE } from '@constants/responsive';
import { TbEdit, TbEditOff } from 'react-icons/tb';
import SolidColorButton from './SolidColorButton';
import { useLayerConfig } from '@core/index';

const CanvasLayerLineChartSetting: CanvasLayerSettingComponent<any, CanvasLineChartConfig> = ({
  layer,
}) => {
  const { config, handleUpdateConfig } = useLayerConfig<CanvasLineChartConfig>(layer);
  return (
    <div>
      <h4>Chart Setting</h4>
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Line Curve"
        content={
          <Checkbox
            checked={config.lineCurve}
            onChange={e => handleUpdateConfig('lineCurve', e.target.checked)}
          />
        }
      />
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Line Color"
        content={
          <SolidColorButton
            value={config.lineStrokeStyle.backgroundColor as string}
            onValueChanged={value =>
              handleUpdateConfig('lineStrokeStyle', {
                ...config.lineStrokeStyle,
                backgroundColor: value,
                color: value,
              } as React.CSSProperties)
            }
          />
        }
      />
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Line Width"
        content={
          <InputNumber
            min={2}
            max={20}
            value={config.lineStrokeStyle.strokeWidth}
            onChange={value =>
              handleUpdateConfig('lineStrokeStyle', {
                ...config.lineStrokeStyle,
                strokeWidth: value,
              } as React.CSSProperties)
            }
          />
        }
      />
      <DescriptionItem
        textStyle={{
          fontWeight: 'normal',
        }}
        title="Grid Columns"
        content={
          <Checkbox
            checked={config.gridColumnsMode}
            onChange={e => handleUpdateConfig('gridColumnsMode', e.target.checked)}
          />
        }
      />
      <DescriptionItem
        title="Area Mode"
        textStyle={{
          fontWeight: 'normal',
        }}
        content={
          <Checkbox
            checked={config.areaMode}
            onChange={e => handleUpdateConfig('areaMode', e.target.checked)}
          />
        }
      />
      {config.areaMode && (
        <DescriptionItem
          textStyle={{
            fontWeight: 'normal',
          }}
          title="Area Color"
          content={
            <SolidColorButton
              value={config.areaStyle?.backgroundColor as string}
              onValueChanged={value =>
                handleUpdateConfig('areaStyle', {
                  ...config.areaStyle,
                  backgroundColor: value,
                } as React.CSSProperties)
              }
            />
          }
        />
      )}
      <Divider />
      <div style={{ ...MIDDLE_STYLE, justifyContent: 'space-between' }}>
        <h4>Annotation</h4>
        <Checkbox
          checked={config.labelShown}
          onChange={e => handleUpdateConfig('labelShown', e.target.checked)}
        />
      </div>
      {config.labelShown && (
        <React.Fragment>
          <DescriptionItem
            textStyle={{
              fontWeight: 'normal',
            }}
            title="Edit Annotation Position"
            content={
              <Tooltip
                title={
                  !(config.editLabelPosition && config.editSubjectPosition)
                    ? 'Edit annotation position'
                    : 'Turn off edit mode'
                }>
                {config.editLabelPosition && config.editSubjectPosition ? (
                  <TbEditOff
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleUpdateConfig('editLabelPosition', false);
                      handleUpdateConfig('editSubjectPosition', false);
                    }}
                  />
                ) : (
                  <TbEdit
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleUpdateConfig('editLabelPosition', true);
                      handleUpdateConfig('editSubjectPosition', true);
                    }}
                  />
                )}
              </Tooltip>
            }
          />
          <DescriptionItem
            textStyle={{
              fontWeight: 'normal',
            }}
            title="Width"
            content={
              <InputNumber
                value={config.annotationContainerWidth}
                onChange={value => handleUpdateConfig('annotationContainerWidth', value)}
              />
            }
          />
          <DescriptionItem
            textStyle={{
              fontWeight: 'normal',
            }}
            title="Title"
            content={
              <Input
                allowClear
                value={config.annotationTitle}
                onChange={e => handleUpdateConfig('annotationTitle', e.target.value)}
              />
            }
          />
          <DescriptionItem
            textStyle={{
              fontWeight: 'normal',
            }}
            title="Subtitle"
            content={
              <Input.TextArea
                rows={3}
                allowClear
                value={config.annotationSubtitle}
                onChange={e => handleUpdateConfig('annotationSubtitle', e.target.value)}
              />
            }
          />
        </React.Fragment>
      )}
    </div>
  );
};

export default CanvasLayerLineChartSetting;
