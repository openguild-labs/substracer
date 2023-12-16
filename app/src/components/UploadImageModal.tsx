import React, { useState } from 'react';
import { Button, Divider, Empty, Modal, Skeleton, Space } from 'antd';
import LoadableContainer from '@components/LoadableContainer';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Buffer } from 'buffer';
import { MIDDLE_STYLE } from '@constants/responsive';
import BrowseUnsplashPhotoDrawer from '@components/BrowseUnsplashPhotoDrawer';
import { makeid } from '@utils/string.util';
import axios from 'axios';
import FileImageItemCard from './FileImageItemCard';
import BrowseUnsplashPhotos from './BrowseUnsplashPhoto';
import { useDrawerStore } from '@stores/useDrawerStore';
import { FileImageItem } from '@core/models';

type Props = {
  open: boolean;
  actionTitle: string;
  singleFile?: boolean;
  setOpen: (open: boolean) => void;
  onSingleUpload?: (uploadedFileItem: FileImageItem) => void;
  onUpload?: (uploadedFileItems: FileImageItem[]) => void;
};

const UploadImageModal = ({
  actionTitle,
  singleFile,
  onSingleUpload,
  open,
  setOpen,
  onUpload,
}: Props) => {
  const { closeDrawer } = useDrawerStore();
  const [fileImageItems, setFileImageItems] = useState<FileImageItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageItemClicked = (item: FileImageItem) => {
    setSelectedItems({
      ...selectedItems,
      [item.id]: !selectedItems[item.id],
    });
  };

  const handleSetFileImageItem = (imageItem: FileImageItem) => {
    if (singleFile) {
      setFileImageItems([imageItem]);
    } else {
      setFileImageItems(urls => urls.concat([imageItem]));
    }
  };

  const handleUploadUnsplashImage = async (pics: any[]) => {
    setLoading(true);
    for (let i = 0; i < pics.length; i++) {
      const pic = pics[i];
      const response = await axios.get<ArrayBuffer>(pic.urls.full, {
        responseType: 'arraybuffer',
      });
      const imageItem: FileImageItem = {
        id: Date.now() + Math.floor(Math.random() * 100000),
        extension: 'jpeg',
        name: makeid(10),
        url: `data:jpeg;base64,${Buffer.from(response.data).toString('base64')}`,
        data: response.data,
      };
      handleSetFileImageItem(imageItem);
    }
    closeDrawer();
    setLoading(false);
  };

  const handleUploadImage = async (e: any) => {
    setLoading(true);
    const fileList = e.target.files as FileList;
    const uploadedFiles = [];
    for (let i = 0; i < fileList.length; i++) {
      const fileListItem = fileList.item(i);
      if (fileListItem) {
        uploadedFiles.push(fileListItem);
      }
    }
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const filename = uploadedFiles[i].name;
      const extension = uploadedFiles[i].type;

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function (e) {
        if (!e.target || !e.target.result) return;
        const data = e.target.result as ArrayBuffer;
        const imageItem: FileImageItem = {
          id: Date.now() + Math.floor(Math.random() * 100000),
          extension: extension,
          name: filename,
          url: `data:${extension};base64,${Buffer.from(data).toString('base64')}`,
          data: data,
        };
        handleSetFileImageItem(imageItem);
      };
    }
    setLoading(false);
  };

  const handleClearSelected = () => {
    setFileImageItems(items => (items = items.filter(item => !selectedItems[item.id])));
  };

  const handleCloseModal = () => {
    setFileImageItems([]);
    setOpen(false);
  };

  const handleUpload = async () => {
    handleCloseModal();
    if (onUpload) await onUpload(fileImageItems);
    if (onSingleUpload) await onSingleUpload(fileImageItems[0]);
  };

  return (
    <Modal
      title={`${actionTitle} image`}
      centered
      open={open}
      onOk={handleUpload}
      onCancel={handleCloseModal}
      okText={
        <div>
          <UploadOutlined /> {actionTitle}
        </div>
      }
      width={'100%'}
      style={{ maxWidth: 1000, overflow: 'hidden' }}>
      <div style={{ minHeight: '500px' }}>
        <Divider />
        <React.Fragment>
          <div
            style={{
              ...MIDDLE_STYLE,
              justifyContent: 'space-between',
              marginBottom: 50,
            }}>
            <Space>
              <label className="upload-file-button">
                <input
                  type="file"
                  onChange={handleUploadImage}
                  multiple={!singleFile}
                  accept="image/jpg, image/png, image/jpeg"
                />
                <UploadOutlined style={{ marginRight: 10 }} /> Upload photos
              </label>
              <BrowseUnsplashPhotos />
            </Space>
            <Button onClick={handleClearSelected}>
              <DeleteOutlined /> Remove
            </Button>
          </div>
          <LoadableContainer isLoading={loading} loadComponent={<Skeleton />}>
            <LoadableContainer
              isLoading={fileImageItems.length === 0}
              loadComponent={
                <div style={{ ...MIDDLE_STYLE }}>
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={<span>No images uploaded</span>}
                  />
                </div>
              }>
              <React.Fragment>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {fileImageItems.map(fileImageItem => (
                    <FileImageItemCard
                      onClick={item => handleImageItemClicked(item)}
                      isSelected={selectedItems[fileImageItem.id]}
                      item={fileImageItem}
                    />
                  ))}
                </div>
              </React.Fragment>
            </LoadableContainer>
          </LoadableContainer>
          <BrowseUnsplashPhotoDrawer singleFile={singleFile} onLoad={handleUploadUnsplashImage} />
        </React.Fragment>
      </div>
    </Modal>
  );
};

export default UploadImageModal;
