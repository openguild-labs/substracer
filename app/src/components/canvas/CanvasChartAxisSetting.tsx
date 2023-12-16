import React from "react";
import FontStyleSetting from "./FontStyleSetting";
import {
  CanvasLayerSettingComponent,
  CanvasLineChartConfig,
} from "@core/models";
import { useLayerConfig } from "@core/index";
import DescriptionItem from "../DescriptionItem";
import SolidColorButton from "./SolidColorButton";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import { InputNumber } from "antd";

const CanvasChartAxisSetting: CanvasLayerSettingComponent<
  CanvasLineChartConfig
> = ({ layer }) => {
  const { config, handleUpdateConfig } =
    useLayerConfig<CanvasLineChartConfig>(layer);
  return (
    <div>
      <h4>Axis</h4>
      <DescriptionItem
        title="Stroke width"
        textStyle={{ fontWeight: "normal" }}
        content={
          <InputNumber
            value={config.axisStyle?.strokeWidth || 0}
            onChange={(value) =>
              handleUpdateConfig("axisStyle", {
                ...config.axisStyle,
                strokeWidth: value,
              } as React.CSSProperties)
            }
          />
        }
      />
      <DescriptionItem
        title="Stroke color"
        textStyle={{ fontWeight: "normal" }}
        content={
          <SolidColorButton
            value={
              config.axisStyle?.stroke || GLOBAL_THEME_COLOR.$highlight_color
            }
            onValueChanged={(value) =>
              handleUpdateConfig("axisStyle", {
                ...config.axisStyle,
                stroke: value,
              } as React.CSSProperties)
            }
          />
        }
      />
      <br />
      <FontStyleSetting
        color={config.axisStyle?.color as string}
        fontFamily={config.axisStyle?.fontFamily as string}
        fontSize={config.axisStyle?.fontSize as number}
        fontWeight={config.axisStyle?.fontWeight as number}
        onColorChange={(value) =>
          handleUpdateConfig("axisStyle", {
            ...config.axisStyle,
            color: value,
          } as React.CSSProperties)
        }
        onFontFamilyChange={(value) =>
          handleUpdateConfig("axisStyle", {
            ...config.axisStyle,
            fontFamily: value,
          } as React.CSSProperties)
        }
        onFontSizeChange={(value) =>
          handleUpdateConfig("axisStyle", {
            ...config.axisStyle,
            fontSize: value,
          } as React.CSSProperties)
        }
        onFontWeightChange={(value) =>
          handleUpdateConfig("axisStyle", {
            ...config.axisStyle,
            fontWeight: value,
          } as React.CSSProperties)
        }
      />
    </div>
  );
};

export default CanvasChartAxisSetting;
