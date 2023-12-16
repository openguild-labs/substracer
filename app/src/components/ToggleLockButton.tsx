import { Tooltip } from 'antd';
import React from 'react';
import { TbLink, TbLock } from 'react-icons/tb';

type Props = {
  value: boolean;
  lockText: string;
  unlockText: string;
  onLockToggle: (isToggled: boolean) => void;
};

const ToggleLockButton = ({ onLockToggle, value, lockText, unlockText }: Props) => {
  return (
    <Tooltip title={value ? unlockText : lockText}>
      {value ? (
        <TbLock style={{ cursor: 'pointer' }} onClick={() => onLockToggle(false)} />
      ) : (
        <TbLink style={{ cursor: 'pointer' }} onClick={() => onLockToggle(true)} />
      )}
    </Tooltip>
  );
};

export default ToggleLockButton;
