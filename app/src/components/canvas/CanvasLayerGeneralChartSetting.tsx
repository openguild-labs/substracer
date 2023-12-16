import React from "react";
import { CanvasLayerSettingComponent } from "@core/models/canvas-type";
import DescriptionItem from "../DescriptionItem";
import { useCanvasStore } from "@stores/useCanvasStore";
import LayerListItem from "./LayerListItem";
import { useCanvasUtility } from "@stores/useCanvasUtility";
import { MIDDLE_STYLE } from "@constants/responsive";
import ChartDataEditorButton from "./ChartDataEditorButton";

const CanvasLayerGeneralChartSetting: CanvasLayerSettingComponent<any> = ({
  layer,
}) => {
  const { layers } = useCanvasStore();
  const { getChildLayerId } = useCanvasUtility();
  return (
    <div>
      <div style={{ ...MIDDLE_STYLE, justifyContent: "space-between" }}>
        <h4>General Setting</h4>
        <ChartDataEditorButton layer={layer} />
      </div>
      {[
        { name: "Title", key: "title" },
        { name: "Subtitle", key: "subtitle" },
      ].map((item) => (
        <DescriptionItem
          textStyle={{ fontWeight: "normal" }}
          title={item.name}
          content={
            layers[getChildLayerId(layer, item.key)] && (
              <LayerListItem layer={layers[getChildLayerId(layer, item.key)]} />
            )
          }
        />
      ))}
    </div>
  );
};

export default CanvasLayerGeneralChartSetting;
