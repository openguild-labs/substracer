import React, { useMemo } from "react";
import { useCanvasStore } from "@stores/useCanvasStore";
import { Divider, Space, Tabs, Tag } from "antd";
import CloseLayerButton from "./CloseLayerButton";
import { MIDDLE_STYLE } from "@constants/responsive";
import HideLayerButton from "./HideLayerButton";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import CanvasLayerExportSetting from "./CanvasLayerExportSetting";
import DuplicateButton from "./DuplicateButton";
import { layerSettingRegistryHashMap } from "@components/canvas/layer-canvas-registry";

type Props = {};

const CanvasLayerSetting = (props: Props) => {
  const { layers, selectedLayers, hiddenLayers } = useCanvasStore();
  const selectedLayerInfos = useMemo(
    () =>
      Object.keys(layers)
        .filter((layer) => selectedLayers[layer])
        .map((layerId) => layers[layerId]),
    [layers, selectedLayers]
  );

  return (
    <div>
      {selectedLayerInfos.map((layerInfo) => (
        <React.Fragment>
          <div
            style={{
              display: "block",
              textAlign: "left",
              padding: "0px 20px 0px 30px",
            }}
          >
            <div style={{ ...MIDDLE_STYLE, justifyContent: "space-between" }}>
              <h3>{layerInfo.name}</h3>
              <Space>
                {layerInfo.deletable && (
                  <CloseLayerButton layerId={layerInfo.id} />
                )}
                {layerInfo.hideable && (
                  <HideLayerButton layerId={layerInfo.id} />
                )}
                {layerInfo.hideable && (
                  <DuplicateButton layerId={layerInfo.id} />
                )}
              </Space>
            </div>
            <Space>
              <Tag
                color={
                  layerInfo.resizable
                    ? "blue"
                    : GLOBAL_THEME_COLOR.$dark_text_color
                }
                style={{ margin: "0px 2px", borderRadius: 30 }}
              >
                Resizable
              </Tag>
              <Tag
                color={
                  layerInfo.draggable
                    ? "blue"
                    : GLOBAL_THEME_COLOR.$dark_text_color
                }
                style={{ margin: "0px 2px", borderRadius: 30 }}
              >
                Draggable
              </Tag>
              {hiddenLayers[layerInfo.id] && (
                <Tag
                  color={"red"}
                  style={{ margin: "0px 2px", borderRadius: 30 }}
                >
                  Hidden
                </Tag>
              )}
            </Space>
            <Divider />
            <Tabs
              items={Object.keys(layerInfo.settingSet || {}).map((tab) => ({
                key: tab,
                label: tab,
                children: (
                  <React.Fragment>
                    {layerInfo.settingSet[tab].map((component, index) => (
                      <React.Fragment>
                        {index > 0 && <Divider />}
                        {React.createElement(
                          layerSettingRegistryHashMap[component],
                          {
                            layer: layerInfo,
                          }
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ),
              }))}
            />
            <CanvasLayerExportSetting layer={layerInfo} />
          </div>
          <Divider />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CanvasLayerSetting;
