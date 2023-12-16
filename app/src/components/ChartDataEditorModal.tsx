import React, { useMemo } from 'react';
import { CanvasLayerComponentProps, CanvasLayerInfo } from '@core/models';
import { useModalStore } from '@stores/useModalStore';
import { Col, Divider, Modal, Row } from 'antd';
import Spreadsheet from './Spreadsheet';
import LoadableContainer from './LoadableContainer';
import { useCanvasStore } from '@stores/useCanvasStore';
import CanvasEditorZoomView from './CanvasEditorZoomView';
import { layerRegistryHashMap } from './layer-canvas-registry';

type Props = {};

const ChartDataEditorModal = (props: Props) => {
  const { layers } = useCanvasStore();
  const { openedModals, closeModal } = useModalStore();
  const { status, extraParams } = useMemo(
    () => openedModals['chartDataEditorModal'],
    [openedModals]
  );
  const selectedLayerId = useMemo<string | undefined>(
    () => extraParams?.selectedLayerId,
    [extraParams]
  );
  const layer = useMemo<CanvasLayerInfo | any>(
    () => (selectedLayerId ? layers[selectedLayerId] : undefined),
    [selectedLayerId, layers]
  );

  return (
    <Modal
      open={status}
      title={`Editor: ${layer?.name}`}
      onOk={() => closeModal('chartDataEditorModal')}
      width={'90%'}
      style={{ position: 'relative' }}
      onCancel={() => closeModal('chartDataEditorModal')}>
      <Divider />
      <LoadableContainer isLoading={!layer} loadComponent={<div>No data provided</div>}>
        <Row gutter={20}>
          <Col span={9} style={{ height: 'fit-content' }}>
            <CanvasEditorZoomView>
              {layer ? (
                React.createElement(layerRegistryHashMap[layer?.layerComponent], {
                  layer: {
                    ...layer,
                    deletable: false,
                    editable: true,
                    draggable: false,
                    resizable: true,
                  },
                  floating: false,
                } as CanvasLayerComponentProps)
              ) : (
                <></>
              )}
            </CanvasEditorZoomView>
          </Col>
          <Col span={15} style={{ height: 'fit-content' }}>
            <Spreadsheet layer={layer as any} />
          </Col>
        </Row>
      </LoadableContainer>
    </Modal>
  );
};

export default ChartDataEditorModal;
