/* eslint-disable jsx-a11y/alt-text */
import { SocialPlatformStr } from '@core/models/social';
import React from 'react';

type Props = {
  platform: SocialPlatformStr;
  style?: React.CSSProperties;
  width?: number;
};

const SocialIcon = ({ platform, style, width }: Props) => {
  return (
    <img
      src={`social-logo/${platform}_logo.webp`}
      width={width || 30}
      style={{ borderRadius: 50, ...style }}
    />
  );
};

export default SocialIcon;
