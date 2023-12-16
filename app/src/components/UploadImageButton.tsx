import { UploadOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import React, { useState } from 'react';
import UploadImageModal from './UploadImageModal';
import { FileImageItem } from '@core/models';

type Props = ButtonProps & {
  singleFile?: boolean;
  onImageUpload: (uploadedImageItems: FileImageItem[]) => void;
};

const UploadImageButton = ({ singleFile, onImageUpload, ...props }: Props) => {
  const [openUploadModal, setOpenUploadModal] = useState<boolean>(false);
  const handleUploadImage = () => {
    setOpenUploadModal(true);
  };
  return (
    <div>
      <Button
        type="primary"
        style={{ width: '100%', marginTop: 10 }}
        onClick={handleUploadImage}
        {...props}>
        <UploadOutlined />
        Upload image
      </Button>
      <UploadImageModal
        actionTitle="Upload"
        singleFile={singleFile}
        onUpload={onImageUpload}
        open={openUploadModal}
        setOpen={open => setOpenUploadModal(open)}
      />
    </div>
  );
};

export default UploadImageButton;
