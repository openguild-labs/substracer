import React, { useState } from 'react';
import DescriptionItem from './DescriptionItem';
import SolidColorButton from './SolidColorButton';
import { InputNumber, Select, Tooltip } from 'antd';
import FontPicker from 'react-fontpicker-ts';
import 'react-fontpicker-ts/dist/index.css';
import { TextAlignmentValue } from '@core/models';

type Props = {
  color: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  align?: TextAlignmentValue;
  fontStrokeWidth?: number;
  fontStrokeColor?: string;
  onFontWeightChange: (value: number) => void;
  onFontFamilyChange: (value: string) => void;
  onColorChange: (value: string) => void;
  onAlignChange?: (value: TextAlignmentValue) => void;
  onFontSizeChange: (value: number) => void;
  onFontStrokeWidth?: (value: number) => void;
  onFontStrokeColor?: (value: string) => void;
};

const FontStyleSetting = ({
  color,
  align,
  fontFamily,
  fontSize,
  fontWeight,
  fontStrokeColor,
  fontStrokeWidth,
  onAlignChange,
  onFontFamilyChange,
  onFontWeightChange,
  onColorChange,
  onFontSizeChange,
  onFontStrokeColor,
  onFontStrokeWidth,
}: Props) => {
  const [weights, setWeights] = useState<string[]>([]);
  return (
    <div>
      <FontPicker
        autoLoad
        defaultValue={fontFamily || 'Inter'}
        fontVariants={fontVariants => {
          const weights = fontVariants.variants.map(variant => (variant as string).split(',')[1]);
          setWeights(weights);
        }}
        value={(font: string) => {
          onFontFamilyChange(font);
        }}
      />
      {weights.length > 0 && (
        <DescriptionItem
          title="Bold"
          textStyle={{ fontWeight: 'normal' }}
          content={
            <Select
              onChange={value => onFontWeightChange(value)}
              value={fontWeight}
              options={weights.map(weight => ({
                label: weight,
                value: weight,
              }))}
            />
          }
        />
      )}
      <DescriptionItem
        textStyle={{ fontWeight: 'normal' }}
        title="Color"
        content={<SolidColorButton value={color} onValueChanged={value => onColorChange(value)} />}
      />
      <DescriptionItem
        textStyle={{ fontWeight: 'normal' }}
        title="Size"
        content={<InputNumber value={fontSize} onChange={value => onFontSizeChange(value || 0)} />}
      />
      {align && onAlignChange && (
        <DescriptionItem
          title="Align"
          content={
            <React.Fragment>
              {(
                [] as {
                  value: TextAlignmentValue;
                  name: string;
                  icon: React.ReactElement;
                }[]
              ).map(item => (
                <Tooltip title={item.name}>
                  <div onClick={() => onAlignChange(item.value)}>{item.icon}</div>
                </Tooltip>
              ))}
            </React.Fragment>
          }
        />
      )}
      {fontStrokeWidth && onFontStrokeWidth && (
        <DescriptionItem
          textStyle={{ fontWeight: 'normal' }}
          title="Stroke width"
          content={
            <InputNumber
              value={fontStrokeWidth}
              onChange={value => onFontStrokeWidth(value || 0)}
            />
          }
        />
      )}
      {fontStrokeColor && onFontStrokeColor && (
        <DescriptionItem
          textStyle={{ fontWeight: 'normal' }}
          title="Stroke color"
          content={
            <SolidColorButton
              value={fontStrokeColor}
              onValueChanged={value => onFontStrokeColor(value)}
            />
          }
        />
      )}
    </div>
  );
};

export default FontStyleSetting;
