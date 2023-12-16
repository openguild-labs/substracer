export type SocialPlatformStr =
  | 'facebook'
  | 'instagram'
  | 'google'
  | 'unsplash'
  | 'linkedin'
  | 'twitter'
  | 'gumroad'
  | 'github'
  | 'producthunt';

export type SizePreset = {
  title: string;
  width: number;
  height: number;
};

export type SizePresetItem = {
  icon: React.ReactNode;
  name: string;
  presets: SizePreset[];
};
