import React from "react";
import FileImageItemCard from "../FileImageItemCard";
import {
  CanvasImageBackground,
  CanvasLayerInfo,
} from "@core/models/canvas-type";
import { FileImageItem } from "@core/models";
import UploadImageButton from "../UploadImageButton";
import { IMAGE_BACKGROUNDS } from "@assets/image-backgrounds";
import ImageItemCard from "../ImageItemCard";
import { Space } from "antd";
import { makeid } from "@utils/string.util";
import { fetchImageBuffer } from "@utils/canvas.util";

type Props = {
  layer: CanvasLayerInfo<CanvasImageBackground>;
  onImageUpload: (layerId: string, uploadedImageItems: FileImageItem[]) => void;
};

const BackgroundImageSetting = ({ layer, onImageUpload }: Props) => {
  const handleTemplateImageClicked = async (imageUrl: string) => {
    const { arrayBuffer, base64 } = await fetchImageBuffer(imageUrl);
    onImageUpload(layer.id, [
      {
        id: Date.now() + Math.floor(Math.random() * 100000),
        data: arrayBuffer,
        url: `data:jpeg;base64,${base64}`,
        extension: "jpeg",
        name: `Background Image ${makeid(5)}`,
      },
    ]);
  };

  return (
    <React.Fragment>
      {!!layer.background.value && (
        <FileImageItemCard
          item={layer.background.value as FileImageItem}
          style={{
            width: "100%",
          }}
          onClick={() => {}}
        />
      )}
      <UploadImageButton
        singleFile
        onImageUpload={(uploadedImageItems) =>
          onImageUpload(layer.id, uploadedImageItems)
        }
      />
      <h4>Template</h4>
      <Space style={{ flexWrap: "wrap" }}>
        {IMAGE_BACKGROUNDS.map((imageBackground) => (
          <React.Fragment>
            <ImageItemCard
              onClick={(data) => handleTemplateImageClicked(data)}
              style={{
                width: 100,
                height: "100%",
                margin: 0,
              }}
              data={imageBackground}
            />
          </React.Fragment>
        ))}
      </Space>
    </React.Fragment>
  );
};

export default BackgroundImageSetting;
