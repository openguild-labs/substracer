import { Space, Tooltip } from "antd";
import React, { useMemo } from "react";
import RenderLayerIcon from "../RenderLayerIcon";
import { CanvasLayerInfo } from "@core/models";
import { useCanvasStore } from "@stores/useCanvasStore";
import { MIDDLE_STYLE } from "@constants/responsive";
import { shortenString } from "@utils/string.util";
import CloseLayerButton from "./CloseLayerButton";
import HideLayerButton from "./HideLayerButton";
import { GLOBAL_THEME_COLOR } from "@constants/theme";

type Props = {
  layer: CanvasLayerInfo;
};

const LayerListItem = ({ layer }: Props) => {
  const { selectLayer, hiddenLayers, selectedLayers } = useCanvasStore();
  const selected = useMemo(
    () => selectedLayers[layer.id],
    [selectedLayers, layer]
  );
  const hidden = useMemo(() => hiddenLayers[layer.id], [hiddenLayers, layer]);
  return (
    <div
      onClick={() => selectLayer(layer.id)}
      className={`canvas-layer-item ${
        selectedLayers[layer.id] ? "selected" : ""
      }`}
      style={{
        ...MIDDLE_STYLE,
        justifyContent: "space-between",
        margin: "10px 0px",
      }}
    >
      <Tooltip title={layer.name}>
        <div
          style={{
            ...MIDDLE_STYLE,
            justifyContent: "flex-start",
            marginRight: 20,
          }}
        >
          <RenderLayerIcon type={layer.type} />{" "}
          <span
            style={
              !hidden || selected
                ? {
                    marginLeft: 10,
                  }
                : {
                    marginLeft: 10,
                    color: GLOBAL_THEME_COLOR.$dark_text_color,
                  }
            }
          >
            {shortenString(layer.name, 30)}
          </span>
        </div>
      </Tooltip>
      <Space>
        {layer.deletable && <CloseLayerButton layerId={layer.id} />}
        {layer.hideable && <HideLayerButton layerId={layer.id} />}
      </Space>
    </div>
  );
};

export default LayerListItem;
