/* eslint-disable react-hooks/exhaustive-deps */
import { useModalStore } from '@stores/useModalStore';
import { Modal } from 'antd';
import CodeEditor from '@uiw/react-textarea-code-editor';
import React, { useEffect } from 'react';
import { CanvasLayerInfo } from '@core/models';
import { useCanvasStore } from '@stores/useCanvasStore';
import { iterateObject } from '@utils/canvas.util';

type Props = {};

const ViewLayerTemplateModal = (props: Props) => {
  const { layers } = useCanvasStore();
  const { openedModals, closeModal } = useModalStore();
  const [code, setCode] = React.useState(``);

  useEffect(() => {
    const values: Record<string, Omit<CanvasLayerInfo, 'ref' | 'children'>> = {};
    iterateObject(layers, _layer => {
      const { ref, children, ...restAttributes } = _layer;
      values[_layer.id] = restAttributes;
    });
    setCode(JSON.stringify(values, null, 4));
  }, [openedModals['viewTemplateModal']]);
  return (
    <Modal
      onOk={() => closeModal('viewTemplateModal')}
      onCancel={() => closeModal('viewTemplateModal')}
      width={'50%'}
      open={openedModals['viewTemplateModal'].status}>
      <CodeEditor
        value={code}
        language="json"
        onChange={evn => setCode(evn.target.value)}
        padding={15}
        style={{
          fontSize: 14,
          backgroundColor: '#f5f5f5',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </Modal>
  );
};

export default ViewLayerTemplateModal;
