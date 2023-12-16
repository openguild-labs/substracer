/* eslint-disable react-hooks/exhaustive-deps */
import { useCanvasStore } from '@stores/useCanvasStore';
import { useModalStore } from '@stores/useModalStore';
import { Divider, Modal } from 'antd';
import React, { useEffect, useMemo } from 'react';

type Props = {};

const IntegrationActionModal = (props: Props) => {
  const { setPreviewMode } = useCanvasStore();
  const { openedModals, closeModal } = useModalStore();
  const actionComponent = useMemo(() => {
    return openedModals['integrationActionModal'].extraParams?.actionComponent;
  }, [openedModals['integrationActionModal']]);
  const integrationName = useMemo(() => {
    return openedModals['integrationActionModal'].extraParams?.integrationName;
  }, [openedModals['integrationActionModal']]);

  useEffect(() => {
    setPreviewMode(!!openedModals['integrationActionModal'].status);
  }, [openedModals['integrationActionModal']]);

  return openedModals['integrationActionModal'] ? (
    <Modal
      destroyOnClose
      title={integrationName}
      onCancel={() => closeModal('integrationActionModal')}
      footer={[]}
      width={'fit-content'}
      open={openedModals['integrationActionModal'].status}>
      <Divider />
      {actionComponent && React.createElement(actionComponent)}
    </Modal>
  ) : (
    <></>
  );
};

export default IntegrationActionModal;
