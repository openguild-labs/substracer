/* eslint-disable react-hooks/exhaustive-deps */
import {
  CanvasLayerId,
  CanvasLayerInfo,
  CanvasMeshGradientBackground,
} from "@core/models/canvas-type";
import { generateJSXMeshGradient } from "@utils/gradient.util";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { TbSparkles } from "react-icons/tb";
import DescriptionItem from "../DescriptionItem";

type Props = {
  layer: CanvasLayerInfo<CanvasMeshGradientBackground>;
  onValueChange: (
    layerId: CanvasLayerId,
    value: CanvasMeshGradientBackground
  ) => void;
};

const BackgroundMeshGradientSetting = ({ layer, onValueChange }: Props) => {
  const generateRandomColor = () => generateJSXMeshGradient(6);
  const [background, setBackground] = useState<CanvasMeshGradientBackground>(
    layer.background.value || generateRandomColor()
  );

  useEffect(() => {
    onValueChange(layer.id, background);
  }, [background]);

  return (
    <React.Fragment>
      <DescriptionItem
        title="Background Color"
        textStyle={{ fontWeight: "normal" }}
        content={
          <div
            style={{
              marginTop: 10,
              width: "50px",
              height: "50px",
              borderRadius: 10,
              ...background,
            }}
          />
        }
      />
      <Button
        style={{ width: "100%", marginTop: 10 }}
        onClick={() => setBackground(generateRandomColor())}
      >
        <TbSparkles />
        Generate
      </Button>
    </React.Fragment>
  );
};

export default BackgroundMeshGradientSetting;
