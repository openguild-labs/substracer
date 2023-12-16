/** Layer Components */
import CanvasImageLayer from "./CanvasImageLayer";
import CanvasPieChartLayer from "./CanvasPieChartLayer";
import CanvasBarChartLayer from "./CanvasBarChartLayer";
import CanvasContainerLayer from "./CanvasSquareAnnotationLayer";
import CanvasTextAnnotationLayer from "./CanvasTextAnnotationLayer";
import CanvasChartLayoutLayer from "./CanvasChartLayoutLayer";
import CanvasLineChartLayer from "./CanvasLineChartLayer";
import CanvasArrowAnnotationLayer from "./CanvasArrowAnnotationLayer";
import CanvasSquareAnnotationLayer from "./CanvasSquareAnnotationLayer";
import CanvasPHProductLayer from "./CanvasPHProductLayer";
/** Setting Components */
import CanvasContributionChartLayerSetting from "./CanvasLayerContributionChartSetting";
import CanvasLayerGeneralSetting from "./CanvasLayerGeneralSetting";
import CanvasLayerGeneralChartSetting from "./CanvasLayerGeneralChartSetting";
import CanvasLayerBackgroundSetting from "./CanvasLayerBackgroundSetting";
import CanvasLayerLineChartSetting from "./CanvasLayerLineChartSetting";
import CanvasLayerContainerSetting from "./CanvasLayerContainerSetting";
import CanvasLayerFontFamilySetting from "./CanvasLayerTextSetting";
import CanvasLayerFontStyleSetting from "./CanvasLayerFontStyleSetting";
import CanvasLayerPieChartSetting from "./CanvasLayerPieChartSetting";
import CanvasLayerBarChartSetting from "./CanvasLayerBarChartSetting";
import CanvasLayerExportSetting from "./CanvasLayerExportSetting";
import CanvasLayerArrowSetting from "./CanvasLayerArrowSetting";
import CanvasLayerSvgSetting from "./CanvasLayerSvgSetting";
import CanvasChartAxisSetting from "./CanvasChartAxisSetting";
import CanvasLayerOrderSetting from "./CanvasLayerOrderSetting";
import Transfrom3DSetting from "./Transform3DSetting";
import CanvasEmojiAnnotationLayer from "./CanvasEmojiAnnotationLayer";
import {
  CanvasLayerComponentMap,
  CanvasLayerComponentSettingMap,
} from "@core/models";
import CanvasLayerEmojiSetting from "./CanvasLayerEmojiSetting";

export const layerRegistryHashMap: CanvasLayerComponentMap = {
  [CanvasSquareAnnotationLayer.name]: CanvasSquareAnnotationLayer,
  [CanvasImageLayer.name]: CanvasImageLayer,
  [CanvasPieChartLayer.name]: CanvasPieChartLayer,
  [CanvasBarChartLayer.name]: CanvasBarChartLayer,
  [CanvasContainerLayer.name]: CanvasContainerLayer,
  [CanvasTextAnnotationLayer.name]: CanvasTextAnnotationLayer,
  [CanvasChartLayoutLayer.name]: CanvasChartLayoutLayer,
  [CanvasLineChartLayer.name]: CanvasLineChartLayer,
  [CanvasArrowAnnotationLayer.name]: CanvasArrowAnnotationLayer,
  [CanvasEmojiAnnotationLayer.name]: CanvasEmojiAnnotationLayer,
  [CanvasPHProductLayer.name]: CanvasPHProductLayer,
};

export const layerSettingRegistryHashMap: CanvasLayerComponentSettingMap = {
  [CanvasLayerGeneralSetting.name]: CanvasLayerGeneralSetting,
  [CanvasLayerGeneralChartSetting.name]: CanvasLayerGeneralChartSetting,
  [CanvasLayerBackgroundSetting.name]: CanvasLayerBackgroundSetting,
  [CanvasLayerLineChartSetting.name]: CanvasLayerLineChartSetting,
  [CanvasLayerContainerSetting.name]: CanvasLayerContainerSetting,
  [CanvasLayerFontFamilySetting.name]: CanvasLayerFontFamilySetting,
  [CanvasLayerFontStyleSetting.name]: CanvasLayerFontStyleSetting,
  [CanvasLayerPieChartSetting.name]: CanvasLayerPieChartSetting,
  [CanvasLayerBarChartSetting.name]: CanvasLayerBarChartSetting,
  [CanvasContributionChartLayerSetting.name]:
    CanvasContributionChartLayerSetting,
  [CanvasLayerExportSetting.name]: CanvasLayerExportSetting,
  [CanvasLayerArrowSetting.name]: CanvasLayerArrowSetting,
  [CanvasLayerSvgSetting.name]: CanvasLayerSvgSetting,
  [CanvasChartAxisSetting.name]: CanvasChartAxisSetting,
  [CanvasLayerOrderSetting.name]: CanvasLayerOrderSetting,
  [CanvasLayerEmojiSetting.name]: CanvasLayerEmojiSetting,
  [Transfrom3DSetting.name]: Transfrom3DSetting,
};
