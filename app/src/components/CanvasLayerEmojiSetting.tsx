import React from 'react';
import { CanvasEmojiAnnotationConfig, CanvasLayerSettingComponent } from '@core/models';
import EmojiPickerButton from './EmojiPickerButton';
import { useLayerConfig } from '@core/index';
import { MIDDLE_STYLE } from '@constants/responsive';

const CanvasLayerEmojiSetting: CanvasLayerSettingComponent = ({ layer }) => {
  const { config, handleUpdateConfig } = useLayerConfig<CanvasEmojiAnnotationConfig>(layer);
  return (
    <div style={{ ...MIDDLE_STYLE, justifyContent: 'space-between' }}>
      <h4>Emoji Setting</h4>
      <EmojiPickerButton
        value={config.value}
        onEmojiPicked={emoji => handleUpdateConfig('value', emoji)}
      />
    </div>
  );
};

export default CanvasLayerEmojiSetting;
