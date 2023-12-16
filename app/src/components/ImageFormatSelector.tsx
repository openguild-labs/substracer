import React from 'react';
import { ImageFormat } from '@core/models';
import { Select } from 'antd';

type Props = {
  value: ImageFormat;
  onChange: (value: ImageFormat) => void;
};

const ImageFormatSelector = ({ value, onChange }: Props) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      options={[
        { label: 'PNG', value: ImageFormat.PNG },
        { label: 'SVG', value: ImageFormat.SVG },
        { label: 'JPEG', value: ImageFormat.JPEG },
      ]}
    />
  );
};

export default ImageFormatSelector;
