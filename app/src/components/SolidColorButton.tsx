import { GLOBAL_THEME_COLOR } from '@constants/theme';
import { generateRandomRgbaStr } from '@utils/string.util';
import { Button, Popover, Tooltip } from 'antd';
import React from 'react';
import { ChromePicker } from 'react-color';

type Props = {
  value: string;
  onValueChanged: (value: string) => void;
};

const SolidColorButton = ({ value, onValueChanged }: Props) => {
  return (
    <Popover
      arrow
      trigger={'click'}
      content={
        <div>
          <Button
            style={{ width: '100%', marginBottom: 10 }}
            onClick={() => {
              onValueChanged(generateRandomRgbaStr());
            }}>
            Generate ✨
          </Button>
          <ChromePicker color={value} onChange={e => onValueChanged(e.hex)} />
        </div>
      }>
      <Tooltip title="Change background color">
        <div
          style={{
            width: 50,
            cursor: 'pointer',
            height: 30,
            borderRadius: 5,
            border: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
            backgroundColor: value,
          }}
        />
      </Tooltip>
    </Popover>
  );
};

export default SolidColorButton;
