import SocialIcon from '@components/SocialIcon';
import { SizePresetItem } from '@core/models';

export const listOfPresets: SizePresetItem[] = [
  {
    icon: <SocialIcon platform="facebook" />,
    name: 'Facebook',
    presets: [
      {
        title: 'News Feed',
        width: 1200,
        height: 1200,
      },
      {
        title: 'Stories',
        width: 1080,
        height: 1920,
      },
      {
        title: 'Cover Photo',
        width: 1660,
        height: 624,
      },
      {
        title: 'Open Graph',
        width: 2400,
        height: 1260,
      },
    ],
  },
  {
    icon: <SocialIcon platform="instagram" />,
    name: 'Instagram',
    presets: [
      {
        title: 'Feed - Square',
        width: 1080,
        height: 1080,
      },
      {
        title: 'Feed - Potrait',
        width: 1080,
        height: 1350,
      },
      {
        title: 'Stories',
        width: 1080,
        height: 1920,
      },
      {
        title: 'Reels',
        width: 1080,
        height: 1920,
      },
    ],
  },
  {
    icon: <SocialIcon platform="linkedin" />,
    name: 'Linkedin',
    presets: [
      {
        title: 'Feed',
        width: 1080,
        height: 1080,
      },
      {
        title: 'Cover Photo (Business)',
        width: 2256,
        height: 382,
      },
      {
        title: 'Cover Photo (Personal)',
        width: 1584,
        height: 396,
      },
      {
        title: 'Stories',
        width: 1080,
        height: 1920,
      },
    ],
  },
  {
    icon: <SocialIcon platform="twitter" />,
    name: 'Twitter',
    presets: [
      {
        title: 'One Image',
        width: 2400,
        height: 1350,
      },
      {
        title: 'Two Images',
        width: 2800,
        height: 3200,
      },
      {
        title: 'Cover Photo',
        width: 2400,
        height: 800,
      },
      {
        title: 'Open Graph',
        width: 2400,
        height: 1260,
      },
    ],
  },
];
