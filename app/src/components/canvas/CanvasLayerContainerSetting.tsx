import React from "react";
import DescriptionItem from "../DescriptionItem";
import SolidColorButton from "./SolidColorButton";
import { CanvasLayerSettingComponent } from "@core/models";
import { useCanvasStore } from "@stores/useCanvasStore";
import { InputNumber } from "antd";
import { MIDDLE_STYLE } from "@constants/responsive";
import QuickAdjustButton from "../QuickAdjustButton";
import { TbBorderRadius, TbSquareOff } from "react-icons/tb";
import BoxShadowSelectorButton from "./BoxShadowSelectorButton";

const CanvasLayerContainerSetting: CanvasLayerSettingComponent = ({
  layer,
}) => {
  const { updateLayer } = useCanvasStore();
  return (
    <div>
      <DescriptionItem
        title="Border color"
        textStyle={{ fontWeight: "normal" }}
        content={
          <SolidColorButton
            value={layer.cssStyles?.borderColor || ""}
            onValueChanged={(value) =>
              updateLayer(layer.id, {
                cssStyles: {
                  ...layer.cssStyles,
                  borderColor: value,
                },
              })
            }
          />
        }
      />
      <DescriptionItem
        title="Border width"
        textStyle={{ fontWeight: "normal" }}
        content={
          <div style={{ ...MIDDLE_STYLE }}>
            <QuickAdjustButton
              items={[
                {
                  title: (
                    <>
                      <TbSquareOff />
                    </>
                  ),
                  value: 0,
                },
                { title: "S", value: 2 },
                { title: "M", value: 5 },
                { title: "L", value: 10 },
              ]}
              isSelected={(value) =>
                (layer.cssStyles?.borderWidth || 0) === value
              }
              onChanged={(value) =>
                updateLayer(layer.id, {
                  cssStyles: {
                    ...layer.cssStyles,
                    borderWidth: value,
                  },
                })
              }
            />
          </div>
        }
      />
      <DescriptionItem
        title="Border radius"
        textStyle={{ fontWeight: "normal" }}
        content={
          <div style={{ ...MIDDLE_STYLE }}>
            <InputNumber
              suffix={<TbBorderRadius />}
              value={layer.cssStyles?.borderRadius || 0}
              onChange={(value) =>
                updateLayer(layer.id, {
                  cssStyles: {
                    ...layer.cssStyles,
                    borderRadius: value || 0,
                  },
                })
              }
            />
          </div>
        }
      />
      <DescriptionItem
        title="Shadow"
        textStyle={{ fontWeight: "normal" }}
        content={
          <BoxShadowSelectorButton
            value={layer.cssStyles?.boxShadow || "unset"}
            onChanged={(value) =>
              updateLayer(layer.id, {
                cssStyles: {
                  ...layer.cssStyles,
                  boxShadow: value || "unset",
                },
              })
            }
          />
        }
      />
    </div>
  );
};

export default CanvasLayerContainerSetting;
