import React from "react";
import { Col, Row } from "antd";
import CanvasEditor from "./CanvasEditor";
import CanvasLayerSetting from "./CanvasLayerSetting";
import CanvasLeftSider from "./CanvasLeftSider";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import { useCanvasStore } from "@stores/useCanvasStore";
import { countExistentialObject } from "@utils/canvas.util";

type Props = {};

const CanvasStudioLayout = (props: Props) => {
  const { fullScreenMode, selectedLayers } = useCanvasStore();
  return (
    <div>
      <Row>
        <Col
          span={6}
          style={{
            borderRight: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
          }}
        >
          <CanvasLeftSider />
        </Col>
        <Col
          span={
            countExistentialObject(selectedLayers) === 0 || fullScreenMode
              ? 18
              : 12
          }
          style={{ position: "relative" }}
        >
          <CanvasEditor />
        </Col>
        <Col
          span={
            countExistentialObject(selectedLayers) === 0 || fullScreenMode
              ? 0
              : 6
          }
          style={{
            borderLeft: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
            height: "calc(100vh - 80px)",
            overflow: "auto",
          }}
        >
          <CanvasLayerSetting />
        </Col>
      </Row>
    </div>
  );
};

export default CanvasStudioLayout;
