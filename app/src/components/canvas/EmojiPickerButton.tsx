import React from 'react';

import { Button, Popover } from 'antd';
import EmojiPicker, { Emoji, EmojiStyle } from 'emoji-picker-react';
import { MIDDLE_STYLE } from '@constants/responsive';

type Props = {
  value: string;
  disabled?: boolean;
  onEmojiPicked: (emoji: string) => void;
};

const EmojiPickerButton = ({ value, onEmojiPicked, disabled }: Props) => {
  return (
    <Popover
      placement="left"
      content={
        <EmojiPicker onEmojiClick={emoji => onEmojiPicked(emoji.unified)} autoFocusSearch={false} />
      }
      trigger="click">
      <Button disabled={disabled} style={{ marginLeft: 10, ...MIDDLE_STYLE }}>
        <Emoji unified={value} emojiStyle={EmojiStyle.APPLE} size={22} />{' '}
        <span style={{ marginLeft: 10, fontWeight: 'normal' }}>Click to change emoji</span>
      </Button>
    </Popover>
  );
};

export default EmojiPickerButton;
