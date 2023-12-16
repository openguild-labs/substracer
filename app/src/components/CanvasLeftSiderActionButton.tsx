import { CanvasAction } from '@constants/canvasActionList';
import { MIDDLE_STYLE } from '@constants/responsive';
import { GLOBAL_THEME_COLOR } from '@constants/theme';
import React from 'react';

type Props = {
  action: CanvasAction;
  isSelected?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
};

const CanvasLeftSiderActionButton = ({ action, style, isSelected, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      style={{ ...MIDDLE_STYLE, flexDirection: 'column', margin: '10px 0px', ...style }}>
      <div className={isSelected ? 'canvas-action selected-canvas-action' : 'canvas-action'}>
        {action.icon}
      </div>
      <div style={{ marginTop: 5 }}>
        <span style={{ fontSize: 11, color: GLOBAL_THEME_COLOR.$dark_text_color }}>
          {action.actionName}
        </span>
      </div>
    </div>
  );
};

export default CanvasLeftSiderActionButton;
