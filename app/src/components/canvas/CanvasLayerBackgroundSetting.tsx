import { Select } from "antd";
import React from "react";
import BackgroundMeshGradientSetting from "./BackgroundMeshGradientSetting";
import BackgroundGradientSetting from "./BackgroundGradientSetting";
import BackgroundImageSetting from "./BackgroundImageSetting";
import BackgroundSolidSetting from "./BackgroundSolidSetting";
import { useCanvasStore } from "@stores/useCanvasStore";
import {
  CanvasBackgroundVariant,
  CanvasLayerId,
  CanvasLayerSettingComponent,
  CanvasMeshGradientBackground,
} from "@core/models/canvas-type";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import { FileImageItem } from "@core/models";

const CanvasLayerBackgroundSetting: CanvasLayerSettingComponent<any> = ({
  layer,
}) => {
  const { updateLayer } = useCanvasStore();
  const onBackgroundColorChange = (
    layerId: CanvasLayerId,
    backgroundColor: string
  ) => {
    updateLayer(layerId, {
      background: {
        type: CanvasBackgroundVariant.Solid,
        value: backgroundColor,
      },
    });
  };
  const onBackgroundVariantChange = (
    layerId: CanvasLayerId,
    backgroundVariant: CanvasBackgroundVariant
  ) => {
    updateLayer(layerId, {
      background: {
        type: backgroundVariant,
        value:
          backgroundVariant === CanvasBackgroundVariant.Solid
            ? GLOBAL_THEME_COLOR.$highlight_color
            : undefined,
      },
    });
  };

  const onBackgroundGradientChange = (
    layerId: CanvasLayerId,
    backgroundColor: string
  ) => {
    updateLayer(layerId, {
      background: {
        type: CanvasBackgroundVariant.Gradient,
        value: backgroundColor,
      },
    });
  };

  const onBackgroundMeshGradientChange = (
    layerId: CanvasLayerId,
    value: CanvasMeshGradientBackground
  ) => {
    updateLayer(layerId, {
      background: {
        type: CanvasBackgroundVariant["Mesh Gradient"],
        value,
      },
    });
  };

  const onBackgroundImageUpload = (
    layerId: CanvasLayerId,
    uploadedFileImageItems: FileImageItem[]
  ) => {
    updateLayer(layerId, {
      background: {
        type: CanvasBackgroundVariant.Image,
        value: uploadedFileImageItems[0],
      },
    });
  };

  return (
    <React.Fragment>
      <h4>Background</h4>
      <Select
        style={{
          width: "100%",
          marginBottom: 10,
        }}
        disabled={!layer.editable}
        onChange={(value) => onBackgroundVariantChange(layer.id, value)}
        value={layer.background.type}
        options={Object.keys(CanvasBackgroundVariant).map((variant) => ({
          label: variant,
          value: (CanvasBackgroundVariant as any)[variant],
        }))}
      />
      {layer.background.type === CanvasBackgroundVariant.Solid && (
        <BackgroundSolidSetting
          layer={layer}
          onValueChanged={onBackgroundColorChange}
        />
      )}
      {layer.background.type === CanvasBackgroundVariant.Image && (
        <BackgroundImageSetting
          layer={layer}
          onImageUpload={onBackgroundImageUpload}
        />
      )}
      {layer.background.type === CanvasBackgroundVariant.Gradient && (
        <BackgroundGradientSetting
          layer={layer}
          onValueChange={onBackgroundGradientChange}
        />
      )}
      {layer.background.type === CanvasBackgroundVariant["Mesh Gradient"] && (
        <BackgroundMeshGradientSetting
          layer={layer}
          onValueChange={onBackgroundMeshGradientChange}
        />
      )}
    </React.Fragment>
  );
};

export default CanvasLayerBackgroundSetting;
