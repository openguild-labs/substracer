import CanvasImageLayer from "@components/canvas/CanvasImageLayer";
import CanvasLayerBackgroundSetting from "@components/canvas/CanvasLayerBackgroundSetting";
import CanvasLayerContainerSetting from "@components/canvas/CanvasLayerContainerSetting";
import CanvasLayerFontStyleSetting from "@components/canvas/CanvasLayerFontStyleSetting";
import CanvasLayerGeneralChartSetting from "@components/canvas/CanvasLayerGeneralChartSetting";
import CanvasLayerGeneralSetting from "@components/canvas/CanvasLayerGeneralSetting";
import CanvasLayerLineChartSetting from "@components/canvas/CanvasLayerLineChartSetting";
import CanvasLayerFontFamilySetting from "@components/canvas/CanvasLayerTextSetting";
import CanvasLineChartLayer from "@components/canvas/CanvasLineChartLayer";
import CanvasTextAnnotationLayer from "@components/canvas/CanvasTextAnnotationLayer";
import CanvasSquareAnnotationLayer from "@components/canvas/CanvasSquareAnnotationLayer";
import CanvasPieChartLayer from "@components/canvas/CanvasPieChartLayer";
import CanvasBarChartLayer from "@components/canvas/CanvasBarChartLayer";
import CanvasLayerPieChartSetting from "@components/canvas/CanvasLayerPieChartSetting";
import CanvasLayerOrderSetting from "@components/canvas/CanvasLayerOrderSetting";
import CanvasLayerBarChartSetting from "@components/canvas/CanvasLayerBarChartSetting";
import CanvasArrowAnnotationLayer from "@components/canvas/CanvasArrowAnnotationLayer";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import {
  BarChartData,
  CanvasArrowAnnotationConfig,
  CanvasBackgroundVariant,
  CanvasBarChartConfig,
  CanvasEmojiAnnotationConfig,
  CanvasImageLayerConfig,
  CanvasLayerId,
  CanvasLayerInfo,
  CanvasLayerType,
  CanvasLineChartConfig,
  CanvasPHProductConfig,
  CanvasPieChartConfig,
  CanvasTextAnnotationConfig,
  FileImageItem,
  LineChartData,
} from "@core/models";
import {
  BEAUTIFUL_LAYER_CARD,
  CANVAS_SETTING_SET_GENERAL,
  CANVAS_TRANSFORM_3D,
  DEFAULT_CANVAS_BAR_CHART_CONFIG,
  DEFAULT_CANVAS_LINE_CHART_CONFIG,
  DEFAULT_CANVAS_PIE_CHART_CONFIG,
} from "@utils/canvas-template";
import { useCanvasStore } from "./useCanvasStore";
import CanvasLayerArrowSetting from "@components/canvas/CanvasLayerArrowSetting";
import CanvasLayerSvgSetting from "@components/canvas/CanvasLayerSvgSetting";
import CanvasChartAxisSetting from "@components/canvas/CanvasChartAxisSetting";
import Transform3DSetting from "@components/canvas/Transform3DSetting";
import CanvasLayerEmojiSetting from "@components/canvas/CanvasLayerEmojiSetting";
import CanvasEmojiAnnotationLayer from "@components/canvas/CanvasEmojiAnnotationLayer";
import CanvasPHProductLayer from "@components/canvas/CanvasPHProductLayer";

export const useCanvasTemplate = () => {
  const { addNewLayer } = useCanvasStore();

  const getDefaultChartChildset = (
    id: string,
    name: string,
    textValue: string,
    description: string
  ) => {
    const chartTitleId = `${id}:title`;
    const chartSubtitleId = `${id}:subtitle`;
    return {
      [chartTitleId]: addNewLayer(
        chartTitleId,
        getDefaultTextAnnotationLayer(
          chartTitleId,
          `${name} - Title`,
          id,
          {
            value: textValue,
            fontStyle: {
              margin: 0,
              fontSize: 30,
              color: GLOBAL_THEME_COLOR.$text_color,
              fontWeight: "bold",
            },
          },
          400,
          70,
          undefined,
          undefined,
          {
            deletable: false,
            draggable: false,
            resizable: true,
          }
        )
      ),
      [chartSubtitleId]: addNewLayer(
        chartSubtitleId,
        getDefaultTextAnnotationLayer(
          chartSubtitleId,
          `${name} - Subtitle`,
          id,
          {
            value: description,
            fontStyle: {
              margin: 0,
              fontSize: 20,
              color: GLOBAL_THEME_COLOR.$dark_text_color,
            },
          },
          400,
          50,
          undefined,
          undefined,
          {
            deletable: false,
            draggable: false,
            resizable: true,
          }
        )
      ),
    };
  };

  const getDefaultPieChartLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    width: number,
    height: number,
    x: number | undefined,
    y: number | undefined
  ): CanvasLayerInfo<any, CanvasPieChartConfig> => {
    return {
      layerComponent: CanvasPieChartLayer.name,
      ref: undefined,
      settingSet: {
        [CANVAS_SETTING_SET_GENERAL]: [
          CanvasLayerOrderSetting.name,
          CanvasLayerGeneralSetting.name,
          CanvasLayerBackgroundSetting.name,
          CanvasLayerContainerSetting.name,
        ],
        [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
        Chart: [
          CanvasLayerGeneralChartSetting.name,
          CanvasLayerPieChartSetting.name,
        ],
      },
      type: CanvasLayerType.PieChart,
      background: {
        type: CanvasBackgroundVariant.Solid,
        value: GLOBAL_THEME_COLOR.$background_color,
      },
      cssStyles: BEAUTIFUL_LAYER_CARD,
      height,
      width,
      x,
      y,
      id,
      name,
      deletable: true,
      draggable: true,
      resizable: true,
      editable: true,
      rotatable: true,
      hideable: true,
      duplicatable: true,
      parentId,
      childSet: getDefaultChartChildset(
        id,
        name,
        "Pie Chart Title",
        "Description of the chart"
      ),
      extra: DEFAULT_CANVAS_PIE_CHART_CONFIG,
    };
  };

  const getDefaultLineChartLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    width: number,
    height: number,
    chartTitle: string,
    chartDescription: string,
    data: LineChartData[],
    x: number | undefined,
    y: number | undefined
  ): CanvasLayerInfo<any, CanvasLineChartConfig> => {
    return {
      layerComponent: CanvasLineChartLayer.name,
      ref: undefined,
      settingSet: {
        [CANVAS_SETTING_SET_GENERAL]: [
          CanvasLayerOrderSetting.name,
          CanvasLayerGeneralSetting.name,
          CanvasLayerBackgroundSetting.name,
          CanvasLayerContainerSetting.name,
        ],
        [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
        Chart: [
          CanvasLayerGeneralChartSetting.name,
          CanvasChartAxisSetting.name,
          CanvasLayerLineChartSetting.name,
        ],
      },
      type: CanvasLayerType.LineChart,
      background: {
        type: CanvasBackgroundVariant.Solid,
        value: GLOBAL_THEME_COLOR.$background_color,
      },
      cssStyles: BEAUTIFUL_LAYER_CARD,
      height,
      width,
      x,
      y,
      id,
      name,
      deletable: true,
      draggable: true,
      resizable: true,
      editable: true,
      rotatable: true,
      hideable: true,
      duplicatable: true,
      extra: { ...DEFAULT_CANVAS_LINE_CHART_CONFIG, data },
      parentId,
      childSet: getDefaultChartChildset(id, name, chartTitle, chartDescription),
    };
  };

  const getDefaultBarChartLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    width: number,
    height: number,
    chartTitle: string,
    chartDescription: string,
    data: BarChartData[],
    x: number | undefined,
    y: number | undefined
  ): CanvasLayerInfo<any, CanvasBarChartConfig> => {
    return {
      layerComponent: CanvasBarChartLayer.name,
      ref: undefined,
      settingSet: {
        [CANVAS_SETTING_SET_GENERAL]: [
          CanvasLayerOrderSetting.name,
          CanvasLayerGeneralSetting.name,
          CanvasLayerBackgroundSetting.name,
          CanvasLayerContainerSetting.name,
        ],
        [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
        Chart: [
          CanvasLayerGeneralChartSetting.name,
          CanvasLayerBarChartSetting.name,
        ],
      },
      type: CanvasLayerType.BarChart,
      background: {
        type: CanvasBackgroundVariant.Solid,
        value: GLOBAL_THEME_COLOR.$background_color,
      },
      cssStyles: BEAUTIFUL_LAYER_CARD,
      height,
      width,
      x,
      y,
      id,
      name,
      deletable: true,
      draggable: true,
      resizable: true,
      editable: true,
      rotatable: true,
      hideable: true,
      duplicatable: true,
      extra: { ...DEFAULT_CANVAS_BAR_CHART_CONFIG, data },
      parentId,
      childSet: getDefaultChartChildset(id, name, chartTitle, chartDescription),
    };
  };

  const getDefaultImageLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    fileImageItem: FileImageItem,
    height: number,
    width: number,
    x: number | undefined,
    y: number | undefined
  ): CanvasLayerInfo<any, CanvasImageLayerConfig> => ({
    layerComponent: CanvasImageLayer.name,
    ref: undefined,
    settingSet: {
      [CANVAS_SETTING_SET_GENERAL]: [
        CanvasLayerOrderSetting.name,
        CanvasLayerGeneralSetting.name,
        CanvasLayerBackgroundSetting.name,
        CanvasLayerContainerSetting.name,
      ],
      [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
    },
    type: CanvasLayerType.NormalImage,
    background: {
      type: CanvasBackgroundVariant.Transparent,
      value: undefined,
    },
    extra: {
      fileImageItem,
    },
    lockAspectRatio: false,
    deletable: true,
    draggable: true,
    resizable: true,
    editable: true,
    rotatable: true,
    hideable: true,
    duplicatable: true,
    height,
    width,
    x,
    y,
    id,
    name,
    parentId,
  });

  const getDefaultArrowAnnotationLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    config: CanvasArrowAnnotationConfig,
    width: number,
    height: number,
    x: number | undefined,
    y: number | undefined,
    override?: Partial<CanvasLayerInfo<any, CanvasArrowAnnotationConfig>>
  ): CanvasLayerInfo<CanvasArrowAnnotationConfig> => ({
    layerComponent: CanvasArrowAnnotationLayer.name,
    ref: undefined,
    settingSet: {
      [CANVAS_SETTING_SET_GENERAL]: [
        CanvasLayerOrderSetting.name,
        CanvasLayerGeneralSetting.name,
        CanvasLayerBackgroundSetting.name,
        CanvasLayerContainerSetting.name,
      ],
      [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
      Arrow: [CanvasLayerArrowSetting.name, CanvasLayerSvgSetting.name],
    },
    id,
    background: {
      type: CanvasBackgroundVariant.Transparent,
      value: undefined,
    },
    deletable: true,
    draggable: true,
    resizable: true,
    editable: true,
    hideable: true,
    duplicatable: true,
    rotatable: true,
    height,
    width,
    x,
    y,
    name,
    type: CanvasLayerType.ArrowAnnotation,
    extra: config,
    parentId,
    ...override,
  });

  const getDefaultPHCardLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    config: CanvasPHProductConfig,
    width: number,
    height: number,
    x: number | undefined,
    y: number | undefined,
    override?: Partial<CanvasLayerInfo<any, CanvasPHProductConfig>>
  ): CanvasLayerInfo<CanvasPHProductConfig> => ({
    layerComponent: CanvasPHProductLayer.name,
    ref: undefined,
    settingSet: {
      [CANVAS_SETTING_SET_GENERAL]: [
        CanvasLayerOrderSetting.name,
        CanvasLayerGeneralSetting.name,
        CanvasLayerBackgroundSetting.name,
        CanvasLayerContainerSetting.name,
      ],
      [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
    },
    id,
    background: {
      type: CanvasBackgroundVariant.Transparent,
      value: undefined,
    },
    deletable: true,
    draggable: true,
    resizable: true,
    editable: true,
    hideable: true,
    duplicatable: true,
    rotatable: true,
    height,
    width,
    x,
    y,
    name,
    type: CanvasLayerType.ProductHuntCard,
    extra: config,
    parentId,
    ...override,
  });

  const getDefaultTextAnnotationLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    config: CanvasTextAnnotationConfig,
    width: number,
    height: number,
    x: number | undefined,
    y: number | undefined,
    override?: Partial<CanvasLayerInfo<any, CanvasTextAnnotationConfig>>
  ): CanvasLayerInfo<any, CanvasTextAnnotationConfig> => ({
    layerComponent: CanvasTextAnnotationLayer.name,
    ref: undefined,
    settingSet: {
      [CANVAS_SETTING_SET_GENERAL]: [
        CanvasLayerOrderSetting.name,
        CanvasLayerGeneralSetting.name,
        CanvasLayerBackgroundSetting.name,
        CanvasLayerContainerSetting.name,
      ],
      [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
      Font: [
        CanvasLayerFontFamilySetting.name,
        CanvasLayerFontStyleSetting.name,
      ],
    },
    id,
    background: {
      type: CanvasBackgroundVariant.Transparent,
      value: undefined,
    },
    deletable: true,
    draggable: true,
    resizable: true,
    editable: true,
    hideable: true,
    rotatable: true,
    duplicatable: true,
    height,
    width,
    x,
    y,
    name,
    type: CanvasLayerType.TextAnnotation,
    extra: config,
    parentId,
    ...override,
  });

  const getDefaultEmojiAnnotationLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    config: CanvasEmojiAnnotationConfig,
    width: number,
    height: number,
    x: number | undefined,
    y: number | undefined,
    override?: Partial<CanvasLayerInfo<any, CanvasEmojiAnnotationConfig>>
  ): CanvasLayerInfo<any, CanvasEmojiAnnotationConfig> => ({
    layerComponent: CanvasEmojiAnnotationLayer.name,
    ref: undefined,
    settingSet: {
      [CANVAS_SETTING_SET_GENERAL]: [
        CanvasLayerOrderSetting.name,
        CanvasLayerGeneralSetting.name,
        CanvasLayerBackgroundSetting.name,
        CanvasLayerContainerSetting.name,
      ],
      [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
      Emoji: [CanvasLayerEmojiSetting.name],
    },
    id,
    background: {
      type: CanvasBackgroundVariant.Transparent,
      value: undefined,
    },
    lockAspectRatio: true,
    deletable: true,
    draggable: true,
    resizable: true,
    editable: true,
    hideable: true,
    rotatable: true,
    duplicatable: true,
    height,
    width,
    x,
    y,
    name,
    type: CanvasLayerType.EmojiAnnotation,
    extra: config,
    parentId,
    ...override,
  });

  const getDefaultSquareAnnotationLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    color: string,
    width: number,
    height: number,
    x: number | undefined,
    y: number | undefined,
    override?: Partial<CanvasLayerInfo<any, CanvasTextAnnotationConfig>>
  ): CanvasLayerInfo<any, CanvasTextAnnotationConfig> => ({
    layerComponent: CanvasSquareAnnotationLayer.name,
    ref: undefined,
    settingSet: {
      [CANVAS_SETTING_SET_GENERAL]: [
        CanvasLayerOrderSetting.name,
        CanvasLayerGeneralSetting.name,
        CanvasLayerBackgroundSetting.name,
        CanvasLayerContainerSetting.name,
      ],
      [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
    },
    id,
    name,
    height,
    width,
    x,
    y,
    background: {
      type: CanvasBackgroundVariant.Solid,
      value: color,
    },
    deletable: true,
    draggable: true,
    resizable: true,
    rotatable: true,
    editable: true,
    hideable: true,
    duplicatable: true,
    type: CanvasLayerType.SquareAnnotation,
    parentId,
    ...override,
  });

  const getDefaultCircleAnnotationLayer = (
    id: string,
    name: string,
    parentId: CanvasLayerId | undefined,
    color: string,
    width: number,
    height: number,
    x: number | undefined,
    y: number | undefined,
    override?: Partial<CanvasLayerInfo<any, CanvasTextAnnotationConfig>>
  ): CanvasLayerInfo<any, CanvasTextAnnotationConfig> => ({
    layerComponent: CanvasSquareAnnotationLayer.name,
    ref: undefined,
    settingSet: {
      [CANVAS_SETTING_SET_GENERAL]: [
        CanvasLayerOrderSetting.name,
        CanvasLayerGeneralSetting.name,
        CanvasLayerBackgroundSetting.name,
        CanvasLayerContainerSetting.name,
      ],
      [CANVAS_TRANSFORM_3D]: [Transform3DSetting.name],
    },
    id,
    name,
    height,
    width,
    x,
    y,
    background: {
      type: CanvasBackgroundVariant.Solid,
      value: color,
    },
    deletable: true,
    draggable: true,
    resizable: true,
    editable: true,
    rotatable: true,
    hideable: true,
    duplicatable: true,
    cssStyles: {
      borderRadius: "50%",
    },
    type: CanvasLayerType.CircleAnnotation,
    parentId,
    ...override,
  });

  return {
    getDefaultImageLayer,
    getDefaultLineChartLayer,
    getDefaultArrowAnnotationLayer,
    getDefaultTextAnnotationLayer,
    getDefaultSquareAnnotationLayer,
    getDefaultCircleAnnotationLayer,
    getDefaultPieChartLayer,
    getDefaultBarChartLayer,
    getDefaultChartChildset,
    getDefaultEmojiAnnotationLayer,
    getDefaultPHCardLayer,
  };
};
