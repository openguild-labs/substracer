export type ComponentChildrenType = React.ReactNode | React.ReactNode[] | React.ReactElement;

export enum ImageFormat {
  PNG = 'png',
  SVG = 'svg',
  JPEG = 'jpeg',
}

export type TextAlignmentValue =
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | 'center'
  | 'justify'
  | 'match-parent';
