import React from "react";
import DescriptionItem from "./DescriptionItem";
import {
  CanvasLayerInfo,
  CanvasSolidBackground,
} from "@core/models/canvas-type";
import SolidColorButton from "./SolidColorButton";

type Props = {
  layer: CanvasLayerInfo<CanvasSolidBackground>;
  onValueChanged: (layerId: string, value: string) => void;
};

const BackgroundSolidSetting = ({ layer, onValueChanged }: Props) => {
  return (
    <React.Fragment>
      <DescriptionItem
        title="Background Color"
        textStyle={{ fontWeight: "normal" }}
        content={
          <SolidColorButton
            value={layer.background.value}
            onValueChanged={(value) => onValueChanged(layer.id, value)}
          />
        }
      />
      <br />
    </React.Fragment>
  );
};

export default BackgroundSolidSetting;
