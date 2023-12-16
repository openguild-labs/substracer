import React from "react";
import { Col, Row, Space } from "antd";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import { MIDDLE_STYLE } from "@constants/responsive";
import { useCanvasStore } from "@stores/useCanvasStore";
import { CANVAS_ACTIONS, CanvasAction } from "@constants/canvasActionList";
import { iterateObject } from "@utils/canvas.util";

import SiderImageAction from "./SiderImageAction";
import SiderLayerSettingAction from "./SiderComponentSettingAction";
import SiderAnnotationAciton from "./SiderAnnotationAction";
import { ClearOutlined } from "@ant-design/icons";
import CanvasLeftSiderActionButton from "./CanvasLeftSiderActionButton";
// import SiderBrandAction from './SiderBrandAction';

type Props = {};

const CanvasLeftSider = (props: Props) => {
  const { selectedAction, selectAction, resetCanvas } = useCanvasStore();

  const handleResetCanvas = () => {
    resetCanvas();
  };

  return (
    <Row>
      <Col
        span={5}
        style={{
          ...MIDDLE_STYLE,
          flexDirection: "column",
          justifyContent: "space-between",
          borderRight: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
          height: "calc(100vh - 80px)",
          paddingTop: 20,
          overflow: "auto",
        }}
      >
        <Space direction="vertical">
          {iterateObject<CanvasAction, React.ReactNode>(
            CANVAS_ACTIONS,
            (action) => {
              const isSelected = selectedAction === action.id;
              return (
                <CanvasLeftSiderActionButton
                  onClick={() => selectAction(action.id)}
                  action={action}
                  isSelected={isSelected}
                />
              );
            }
          )}
        </Space>
        <Space direction="vertical">
          <CanvasLeftSiderActionButton
            onClick={handleResetCanvas}
            action={
              {
                actionName: "Reset Canvas",
                icon: <ClearOutlined />,
                id: "reset-canvas-action",
              } as any
            }
          />
        </Space>
      </Col>
      <Col
        span={18}
        style={{
          padding: "0px 10px 0px 20px",
          height: "100vh",
          overflow: "auto",
        }}
      >
        {selectedAction === "component-action" && <SiderLayerSettingAction />}
        {selectedAction === "image-action" && <SiderImageAction />}
        {selectedAction === "annotation-action" && <SiderAnnotationAciton />}
      </Col>
    </Row>
  );
};

export default CanvasLeftSider;
