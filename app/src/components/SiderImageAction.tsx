import React from "react";
import UploadImageButton from "./UploadImageButton";
import { FileImageItem } from "@core/models";
import { useCanvasStore } from "@stores/useCanvasStore";
import { CanvasLayerType } from "@core/models/canvas-type";
import { CANVAS_BACKGROUND_LAYER_ID } from "@utils/canvas-template";
import { fetchImageBuffer } from "@utils/canvas.util";
import { useCanvasTemplate } from "@stores/useCanvasTemplate";
import { SOCIAL_LOGOS } from "@assets/social-icons";
import ImageItemCard from "./ImageItemCard";
import { makeid } from "@utils/string.util";
import { Button, Divider, Popover, Space, Tooltip } from "antd";
import { useCanvasUtility } from "@stores/useCanvasUtility";
import EmojiPicker from "emoji-picker-react";
import { SOCIAL_LOGOS_3D } from "@assets/3d-social-icons";

type Props = {};

const SiderImageAction = (props: Props) => {
  const { addNewLayer } = useCanvasStore();
  const { getNextLayerId } = useCanvasUtility();
  const { getDefaultImageLayer, getDefaultEmojiAnnotationLayer } =
    useCanvasTemplate();

  const onImageUploaded = (fileImageItems: FileImageItem[]) => {
    for (const fileImageItem of fileImageItems) {
      const id = getNextLayerId(CanvasLayerType.NormalImage);
      const newLayerId = `image-${id}`;
      const layerName = `Image ${id}`;
      addNewLayer(
        newLayerId,
        getDefaultImageLayer(
          newLayerId,
          layerName,
          CANVAS_BACKGROUND_LAYER_ID,
          fileImageItem,
          200,
          200,
          undefined,
          undefined
        )
      );
    }
  };

  const handleTemplateImageClicked = async (imageUrl: string) => {
    const { arrayBuffer, base64 } = await fetchImageBuffer(imageUrl);
    onImageUploaded([
      {
        id: Date.now() + Math.floor(Math.random() * 100000),
        data: arrayBuffer,
        url: `data:jpeg;base64,${base64}`,
        extension: "jpeg",
        name: `Background Image ${makeid(5)}`,
      },
    ]);
  };

  const handleAddEmojiClicked = (value: string) => {
    const id = getNextLayerId(CanvasLayerType.EmojiAnnotation);
    const newLayerId = `Emoji-icon-${id}`;
    const layerName = `Emoji-icon ${id}`;
    addNewLayer(
      newLayerId,
      getDefaultEmojiAnnotationLayer(
        newLayerId,
        layerName,
        CANVAS_BACKGROUND_LAYER_ID,
        {
          value,
          fontStyle: {
            fontSize: 50,
          },
        },
        100,
        100,
        undefined,
        undefined
      )
    );
  };

  return (
    <div style={{ textAlign: "left", paddingBottom: 100 }}>
      <h4>Images</h4>
      <UploadImageButton onImageUpload={onImageUploaded} />
      <h4>Emoji</h4>
      <Space style={{ flexWrap: "wrap" }}>
        {["🙂", "🎉", "✅", "🙌", "🔥", "🙏", "⭐️"].map((emoji) => (
          <Tooltip title="Click to add emoji">
            <div
              onClick={() => handleAddEmojiClicked(emoji)}
              style={{
                fontSize: 32,
                cursor: "pointer",
              }}
            >
              {emoji}
            </div>
          </Tooltip>
        ))}
      </Space>
      <Popover
        placement="right"
        content={
          <EmojiPicker
            onEmojiClick={(emoji) => handleAddEmojiClicked(emoji.unified)}
            autoFocusSearch={false}
          />
        }
      >
        <Button style={{ width: "100%", marginTop: 20 }}>
          View more emojis
        </Button>
      </Popover>
      <Divider />
      <h4>3D Social Icons</h4>
      <Space size={"middle"} style={{ flexWrap: "wrap" }}>
        {SOCIAL_LOGOS_3D.map((logo) => (
          <div>
            <ImageItemCard
              onClick={(data) => handleTemplateImageClicked(data)}
              style={{
                width: 60,
                height: 60,
                cursor: "pointer",
                margin: 0,
              }}
              data={logo}
            />
          </div>
        ))}
      </Space>
      <Divider />
      <h4>Social Icons</h4>
      <Space size={"middle"} style={{ flexWrap: "wrap" }}>
        {SOCIAL_LOGOS.map((logo) => (
          <div>
            <ImageItemCard
              onClick={(data) => handleTemplateImageClicked(data)}
              style={{
                width: 60,
                height: 60,
                cursor: "pointer",
                margin: 0,
              }}
              data={logo}
            />
          </div>
        ))}
      </Space>
    </div>
  );
};

export default SiderImageAction;
