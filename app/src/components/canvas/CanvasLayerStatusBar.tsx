import React from "react";
import { MIDDLE_STYLE } from "@constants/responsive";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import RenderLayerIcon from "../RenderLayerIcon";
import { CanvasLayerInfo } from "@core/models/canvas-type";
import { LockFilled } from "@ant-design/icons";

type Props = {
  layer: CanvasLayerInfo;
};

const CanvasLayerStatusBar = ({ layer }: Props) => {
  return (
    <div
      style={{
        ...MIDDLE_STYLE,
      }}
    >
      <div
        style={{
          ...MIDDLE_STYLE,
          borderRadius: 20,
          fontSize: "25px",
          letterSpacing: "0px",
          marginBottom: 20,
          backgroundColor: GLOBAL_THEME_COLOR.$dark_primary_color,
          color: GLOBAL_THEME_COLOR.$text_color_contrast,
          padding: "10px 20px",
        }}
      >
        <span style={{ fontWeight: "bold", ...MIDDLE_STYLE, marginRight: 10 }}>
          <RenderLayerIcon type={layer.type} />
          <span style={{ marginLeft: 10 }}>{layer.name}</span>
        </span>
        {layer.lockAspectRatio && <LockFilled />}
      </div>
    </div>
  );
};

export default CanvasLayerStatusBar;
