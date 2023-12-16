import React from 'react';
import {
  BarChartData,
  ChartData,
  ComponentChildrenType,
  DataColumn,
  FileImageItem,
  LineChartData,
  Node as ProductHuntProductNode,
  PieChartData,
} from '@core/models';
import { AnnotationPosition, LineChartProvidedProps } from './line-chart';
import { LayerSet } from '@utils/canvas.util';
import { GraphData, GraphSettings } from './github';

export enum CanvasBackgroundVariant {
  Transparent = 'transparent-background',
  Solid = 'solid-background',
  Gradient = 'gradient-background',
  'Mesh Gradient' = 'mesh-gradient-background',
  Image = 'image-background',
}

export type CanvasImageBackground = FileImageItem;

export type CanvasSolidBackground = string;

export type CanvasGradientBackground = string;

export type CanvasMeshGradientBackground = {
  backgroundImage: string;
  backgroundColor: string;
};

export type TextStyleConfig = {
  fontStyle: React.CSSProperties;
  fontStrokeWidth?: number;
  fontStrokeColor?: string;
};

export type CanvasTextAnnotationConfig = TextStyleConfig & {
  value: string;
};

export type CanvasEmojiAnnotationConfig = TextStyleConfig & {
  value: string;
};

export type CanvasImageLayerConfig = {
  fileImageItem: FileImageItem;
};

export type CanvasChartGeneralConfig<T extends ChartData> = {
  data: T[];
  columns: Record<string, DataColumn>;
};

export interface CanvasPieChartConfig extends CanvasChartGeneralConfig<PieChartData> {
  labelShown: boolean;
  cornerRadius: number;
  donutMode: boolean;
  donutThickness: number;
  donutPadding: number;
}

export interface CanvasGithubContributionChartConfig {
  data: GraphData;
  settings: GraphSettings;
}

export interface CanvasBarChartConfig extends CanvasChartGeneralConfig<BarChartData> {
  labelShown: boolean;
  labelStyle: TextStyleConfig;
  barValueStyle: TextStyleConfig;
  barValueShown: boolean;
  oneColorMode: boolean;
  barColor: string;
  barWidth: number | undefined;
  barHeight: number | undefined;
}

export interface CanvasLineChartConfig extends CanvasChartGeneralConfig<LineChartData> {
  labelShown: boolean;
  lineStrokeStyle: React.CSSProperties;
  areaStyle?: React.CSSProperties;
  areaMode?: boolean;
  lineCurve?: boolean;
  gridColumnsMode?: boolean;
  hideXAxis?: boolean;
  hideYAxis?: boolean;
  axisStyle?: React.CSSProperties;
  editLabelPosition: boolean;
  editSubjectPosition: boolean;
  annotationTitle: string;
  annotationTitleStyle: React.CSSProperties;
  annotationSubtitle: string;
  annotationSubtitleStyle: React.CSSProperties;
  annotationContainerStyle: React.CSSProperties;
  annotationContainerWidth: number;
  connectorType: LineChartProvidedProps['connectorType'];
  subjectType: LineChartProvidedProps['subjectType'];
  annotationPosition: AnnotationPosition;
}

export interface CanvasPHProductConfig extends ProductHuntProductNode {
  rank?: number;
}

export interface CanvasSvgGraphicConfig {
  svgProps?: React.SVGProps<SVGSVGElement>;
}

export interface CanvasArrowAnnotationConfig extends CanvasSvgGraphicConfig {
  arrowType: number;
}

export type CanvasLayerComponentProps<T = any, E = any> = {
  layer: CanvasLayerInfo<T, E>;
  floating?: boolean;
  disabled?: boolean;
  children?: ComponentChildrenType;
};

export type CanvasLayerComponent<T = any, E = any> = (
  props: CanvasLayerComponentProps<T, E>
) => JSX.Element;

export type CanvasBackground<T> = {
  value: T;
  type: CanvasBackgroundVariant;
};

export type CanvasLayerSettingComponent<T = any, E = any> = (props: {
  layer: CanvasLayerInfo<T, E>;
}) => JSX.Element;
export type CanvasLayerId = string;

export enum CanvasLayerType {
  NormalImage = 'normal-image',
  Canvas = 'canvas',
  ChartLayout = 'chart-layout',
  LineChart = 'line-chart',
  BarChart = 'bar-chart',
  PieChart = 'pie-chart',
  AreaChart = 'area-chart',
  ArrowAnnotation = 'arrow-annotation',
  TextAnnotation = 'text-annotation',
  PointerAnnotation = 'pointer-annotation',
  SquareAnnotation = 'square-annotation',
  LineAnnotation = 'line-annotation',
  CircleAnnotation = 'circle-annotation',
  EmojiAnnotation = 'emoji-annotation',
  GithubContributionChart = 'github-contribution-chart',
  ProductHuntCard = 'product-hunt-card',
}

export type CanvasLayerComponentMap = Record<string, CanvasLayerComponent>;
export type CanvasLayerComponentSettingMap = Record<string, CanvasLayerSettingComponent>;

export type CanvasLayerInfo<T = any, E = any> = {
  layerComponent: string;
  ref?: React.MutableRefObject<HTMLDivElement | null> | undefined;
  settingSet: Record<string, string[]>;
  id: string;
  name: string;
  height: number;
  width: number;
  x: number | undefined;
  y: number | undefined;
  editable: boolean;
  deletable: boolean;
  hideable: boolean;
  duplicatable: boolean;
  background: CanvasBackground<T>;
  type: CanvasLayerType;
  resizable: boolean;
  draggable: boolean;
  rotatable: boolean;
  parentId?: CanvasLayerId | undefined;
  childSet?: LayerSet;
  children?: ComponentChildrenType;
  lockAspectRatio?: boolean;
  constrainSetting?: {
    padding?: boolean;
    border?: boolean;
  };
  cssStyles?: React.CSSProperties;
  transform3dStyles?: {
    a?: number;
    x?: number;
    y?: number;
    z?: number;
  };
  extra?: E;
  preview?: boolean;
};
