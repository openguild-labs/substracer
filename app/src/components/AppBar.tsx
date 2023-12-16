import React, { useState } from "react";
import { Button, Layout, Space } from "antd";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import { DownloadOutlined } from "@ant-design/icons";
// import { MdRedo, MdUndo } from 'react-icons/md';
import { MIDDLE_STYLE } from "@constants/responsive";
import { makeid } from "@utils/string.util";
import { useCanvasStore } from "@stores/useCanvasStore";
import { CANVAS_BACKGROUND_LAYER_ID } from "@utils/canvas-template";
import { ImageFormat, useCanvasDataExport } from "@core/index";
import ImageFormatSelector from "./ImageFormatSelector";

type Props = {};

const AppBar = (props: Props) => {
  const { layers } = useCanvasStore();
  const [format, setFormat] = useState(ImageFormat.PNG);
  const { handleDownloadImage } = useCanvasDataExport();

  // const handleUndo = () => {};

  // const handleRedo = () => {};

  return (
    <Layout.Header
      style={{
        padding: "0px 40px",
        display: "flex",
        height: 80,
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: `1px solid ${GLOBAL_THEME_COLOR.$border_color}`,
      }}
    >
      <a href="https://lowlevlers.co" style={{ ...MIDDLE_STYLE }}>
        <img
          src="/substracer-logo.png"
          style={{ height: 40, marginRight: 10 }}
          alt="UpChart Logo"
        />
      </a>
      <Space>
        <ImageFormatSelector
          value={format}
          onChange={(value) => setFormat(value)}
        />
        <Button
          type="primary"
          onClick={() =>
            handleDownloadImage(
              layers[CANVAS_BACKGROUND_LAYER_ID].ref,
              `UpChart_Canvas_${makeid(5)}`,
              format
            )
          }
        >
          <DownloadOutlined />
          Download Image
        </Button>
      </Space>
    </Layout.Header>
  );
};

export default AppBar;
