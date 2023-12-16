import { EditOutlined } from '@ant-design/icons';
import { MIDDLE_STYLE } from '@constants/responsive';
import { CanvasLayerInfo } from '@core/models';
import { useModalStore } from '@stores/useModalStore';
import { Button } from 'antd';
import React from 'react';

type Props = {
  layer: CanvasLayerInfo;
};

const ChartDataEditorButton = ({ layer }: Props) => {
  const { openModal } = useModalStore();
  return (
    <Button
      style={{ ...MIDDLE_STYLE, justifyContent: 'space-between' }}
      type="primary"
      onClick={() =>
        openModal('chartDataEditorModal', {
          selectedLayerId: layer.id,
        })
      }>
      Open Data Editor <EditOutlined style={{ margin: 0, marginLeft: 10 }} />
    </Button>
  );
};

export default ChartDataEditorButton;
