import React from "react";
import { GLOBAL_THEME_COLOR, STRIPE_BOX_SHADOW } from "@constants/theme";
import { DEFAULT_CANVAS_SIZE } from "@constants/size";
import CanvasLayerBackgroundSetting from "@components/canvas/CanvasLayerBackgroundSetting";
import CanvasLayerGeneralSetting from "@components/canvas/CanvasLayerGeneralSetting";
import {
  CanvasArrowAnnotationConfig,
  CanvasBackgroundVariant,
  CanvasBarChartConfig,
  CanvasLayerInfo,
  CanvasLayerType,
  CanvasLineChartConfig,
  CanvasPieChartConfig,
} from "../core/models/canvas-type";
import CanvasSquareAnnotationLayer from "@components/canvas/CanvasSquareAnnotationLayer";
import CanvasLayerContainerSetting from "@components/canvas/CanvasLayerContainerSetting";
import {
  getBarChartMockData,
  getLineChartMockData,
  getPieChartMockData,
} from "@constants/chart-data";
import { generateRandomRgbaStr } from "./string.util";

export const CANVAS_BACKGROUND_LAYER_ID = "canvas-background-layer";
export const CANVAS_SETTING_SET_GENERAL = "General";
export const CANVAS_TRANSFORM_3D = "3D";

export const DEFAULT_CANVAS_BACKGROUND_LAYER: CanvasLayerInfo = {
  layerComponent: CanvasSquareAnnotationLayer.name,
  ref: undefined,
  settingSet: {
    General: [
      CanvasLayerGeneralSetting.name,
      CanvasLayerBackgroundSetting.name,
      CanvasLayerContainerSetting.name,
    ],
  },
  id: CANVAS_BACKGROUND_LAYER_ID,
  name: "Background",
  height: DEFAULT_CANVAS_SIZE[0],
  width: DEFAULT_CANVAS_SIZE[1],
  x: undefined,
  y: undefined,
  background: {
    type: CanvasBackgroundVariant.Solid,
    value: GLOBAL_THEME_COLOR.$highlight_color,
  },
  draggable: false,
  resizable: true,
  deletable: false,
  hideable: false,
  editable: true,
  rotatable: false,
  duplicatable: false,
  type: CanvasLayerType.Canvas,
  parentId: undefined,
};

export const BEAUTIFUL_LAYER_CARD = {
  borderRadius: 20,
  overflow: "hidden",
  boxShadow: STRIPE_BOX_SHADOW,
};

export const DEFAULT_LABEL_CONTAINER_STYLE: React.CSSProperties = {
  background: "white",
  border: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
  boxShadow: STRIPE_BOX_SHADOW,
  borderRadius: 10,
  color: GLOBAL_THEME_COLOR.$dark_text_color,
  fontSize: "0.8em",
  lineHeight: "20px",
  padding: "0 0.4em 0 1em",
  fontWeight: 200,
};

export const DEFAULT_CANVAS_PIE_CHART_CONFIG: CanvasPieChartConfig = {
  cornerRadius: 10,
  donutThickness: 50,
  donutMode: true,
  labelShown: true,
  donutPadding: 0.01,
  ...getPieChartMockData(),
};

export const DEFAULT_CANVAS_BAR_CHART_CONFIG: CanvasBarChartConfig = {
  labelShown: true,
  barHeight: undefined,
  barWidth: undefined,
  barColor: generateRandomRgbaStr(),
  barValueShown: true,
  oneColorMode: false,
  labelStyle: {
    fontStyle: {
      fontSize: 20,
      color: GLOBAL_THEME_COLOR.$text_color,
    },
  },
  barValueStyle: {
    fontStyle: {
      fontSize: 20,
      color: GLOBAL_THEME_COLOR.$text_color,
    },
  },
  ...getBarChartMockData(),
};

export const DEFAULT_CANVAS_LINE_CHART_CONFIG: CanvasLineChartConfig = {
  labelShown: false,
  lineStrokeStyle: {
    strokeWidth: 2,
    backgroundColor: GLOBAL_THEME_COLOR.$highlight_color,
  },
  editLabelPosition: false,
  editSubjectPosition: false,
  subjectType: "circle",
  connectorType: "elbow",
  annotationPosition: {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
  },
  annotationTitle: "Title",
  annotationTitleStyle: {
    fontSize: 25,
  },
  annotationSubtitle: "Example of the line chart subtitle",
  annotationSubtitleStyle: {
    fontSize: 20,
  },
  annotationContainerStyle: DEFAULT_LABEL_CONTAINER_STYLE,
  annotationContainerWidth: 200,
  ...getLineChartMockData(),
};

export const DEFAULT_CANVAS_ARROW_ANNOTATION_CONFIG: CanvasArrowAnnotationConfig =
  {
    arrowType: 0,
    svgProps: {
      height: 50,
      width: 50,
      fill: "black",
      transform: "rotate(30, 0, 0)",
    },
  };
