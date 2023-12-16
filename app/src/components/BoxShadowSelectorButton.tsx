import { boxShadowCssStyles } from '@constants/boxShadow';
import { GLOBAL_THEME_COLOR } from '@constants/theme';
import { Popover, Space, Tooltip } from 'antd';
import React from 'react';

type Props = {
  value: string;
  onChanged: (value: string) => void;
};

const BoxShadowSelectorButton = (props: Props) => {
  return (
    <Tooltip title="Click to change shadow">
      <Popover
        trigger={'click'}
        placement="left"
        content={
          <div style={{ maxWidth: 300 }}>
            <h3>Box Shadow</h3>
            <Space style={{ flexWrap: 'wrap' }}>
              {boxShadowCssStyles.map(boxShadowCssStyle => (
                <div>
                  <div
                    onClick={() => props.onChanged(boxShadowCssStyle)}
                    style={{
                      cursor: 'pointer',
                      boxShadow: boxShadowCssStyle,
                      border: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
                      borderRadius: 5,
                      height: 50,
                      width: 50,
                    }}></div>
                </div>
              ))}
            </Space>
          </div>
        }>
        <div
          style={{
            cursor: 'pointer',
            boxShadow: props.value,
            border: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
            borderRadius: 5,
            height: 40,
            width: 40,
          }}></div>
      </Popover>
    </Tooltip>
  );
};

export default BoxShadowSelectorButton;
