import React from 'react';
import { InputNumber, Space } from 'antd';
import ToggleLockButton from './ToggleLockButton';
import { GLOBAL_THEME_COLOR } from '@constants/theme';

type Props = {
  xKeys: string[];
  yKeys: string[];
  isConstraint: boolean;
  getValue: (key: string) => number;
  upadteValue: (key: string, value: number) => void;
  updateAllValue: (keys: string[], value: number) => void;
  updateConstrain: (isToggled: boolean) => void;
};

const TopRightBottomLeftSetting = ({
  getValue,
  upadteValue,
  updateConstrain,
  updateAllValue,
  isConstraint,
  xKeys,
  yKeys,
}: Props) => {
  const handleUpdateValue = (field: string, value: number) => {
    if (isConstraint) {
      updateAllValue([...xKeys, ...yKeys], value);
    } else {
      upadteValue(field, value);
    }
  };
  return (
    <Space>
      <Space direction="vertical">
        {[
          {
            prefix: 'T',
            field: yKeys[0],
          },
          {
            prefix: 'B',
            field: yKeys[1],
          },
        ].map(keyItem => (
          <InputNumber
            prefix={
              <div
                style={{
                  fontWeight: 'bold',
                  borderRight: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
                  paddingRight: 10,
                }}>
                {keyItem.prefix}
              </div>
            }
            style={{ width: '100%' }}
            value={getValue(keyItem.field) || 0}
            onChange={value => handleUpdateValue(keyItem.field, value || 0)}
          />
        ))}
      </Space>
      <ToggleLockButton
        lockText="Constrain Padding"
        unlockText="Unconstrain Padding"
        value={!!isConstraint}
        onLockToggle={updateConstrain}
      />
      <Space direction="vertical">
        {[
          {
            prefix: 'R',
            field: xKeys[0],
          },
          {
            prefix: 'L',
            field: xKeys[1],
          },
        ].map(keyItem => (
          <InputNumber
            prefix={
              <div
                style={{
                  fontWeight: 'bold',
                  borderRight: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
                  paddingRight: 10,
                }}>
                {keyItem.prefix}
              </div>
            }
            style={{ width: '100%' }}
            value={getValue(keyItem.field) || 0}
            onChange={value => handleUpdateValue(keyItem.field, value || 0)}
          />
        ))}
      </Space>
    </Space>
  );
};

export default TopRightBottomLeftSetting;
