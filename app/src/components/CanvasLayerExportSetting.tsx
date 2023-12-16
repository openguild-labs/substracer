import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { CanvasLayerComponent, ImageFormat } from '@core/models';
import { useCanvasDataExport } from '@core/hooks/useCanvasDataExport';
import { Button, Divider, Space } from 'antd';
import { MIDDLE_STYLE } from '@constants/responsive';
import ImageFormatSelector from './ImageFormatSelector';

const CanvasLayerExportSetting: CanvasLayerComponent = ({ layer }) => {
  const [format, setFormat] = useState(ImageFormat.PNG);

  const { handleDownloadImage } = useCanvasDataExport();

  const handleExportLayer = () => {
    handleDownloadImage(layer.ref, layer.name, format);
  };

  return (
    <div style={{ ...MIDDLE_STYLE, flexDirection: 'column' }}>
      <Divider />
      <Space>
        <ImageFormatSelector value={format} onChange={value => setFormat(value)} />
        <Button onClick={handleExportLayer} type="primary" style={{ width: '100%' }}>
          <DownloadOutlined />
          Export layer
        </Button>
      </Space>
    </div>
  );
};

export default CanvasLayerExportSetting;
