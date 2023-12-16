import { MIDDLE_STYLE } from '@constants/responsive';
import { GLOBAL_THEME_COLOR } from '@constants/theme';
import React from 'react';

type Props = {
  items: { title: any; value: number }[];
  isSelected: (value: number) => boolean;
  onChanged: (value: number) => void;
};

const QuickAdjustButton = ({ items, isSelected, onChanged }: Props) => {
  return (
    <div style={{ ...MIDDLE_STYLE, marginRight: 5 }}>
      {items.map(item => (
        <div
          className={
            isSelected(item.value) ? 'quick-adjust-button-selected' : 'quick-adjust-button'
          }
          onClick={() => onChanged(item.value)}
          style={{
            height: 30,
            width: 30,
            borderRadius: 5,
            fontWeight: 'bold',
            cursor: 'pointer',
            margin: '0px 2px',
            border: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
            ...MIDDLE_STYLE,
          }}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default QuickAdjustButton;
