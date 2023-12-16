import React from 'react';
import { MIDDLE_STYLE } from '@constants/responsive';
import { Button, Divider, Space } from 'antd';
import { useCanvasStore } from '@stores/useCanvasStore';
import { CanvasLayerType } from '@core/models/canvas-type';
import {
  CANVAS_BACKGROUND_LAYER_ID,
  DEFAULT_CANVAS_ARROW_ANNOTATION_CONFIG,
} from '@utils/canvas-template';
import RenderLayerIcon from './RenderLayerIcon';
import { useCanvasUtility } from '@stores/useCanvasUtility';
import { useCanvasTemplate } from '@stores/useCanvasTemplate';
import { generateRandomRgbaStr, makeid } from '@utils/string.util';
import { Sphere3dShapes } from '@assets/3d_shapes/Sphere';
import { CubeOne3dShapes } from '@assets/3d_shapes/Cube-1';
import { CubeTwo3dShapes } from '@assets/3d_shapes/Cube-2';
import { Cylinder3dShapes } from '@assets/3d_shapes/Cylinder';
import { Pill3dShapes } from '@assets/3d_shapes/Pill';
import { RoundCubeOne3dShapes } from '@assets/3d_shapes/RoundCube-1';
import { RoundCubeTwo3dShapes } from '@assets/3d_shapes/RoundCube-2';
import { Cone3dShapes } from '@assets/3d_shapes/Cone';
import ImageItemCard from './ImageItemCard';
import { FileImageItem } from '@core/models';
import { fetchImageBuffer } from '@utils/canvas.util';

type Props = {};

const SiderAnnotationAciton = (props: Props) => {
  const { addNewLayer } = useCanvasStore();
  const { getNextLayerId } = useCanvasUtility();
  const { getDefaultImageLayer } = useCanvasTemplate();
  const {
    getDefaultTextAnnotationLayer,
    getDefaultCircleAnnotationLayer,
    getDefaultSquareAnnotationLayer,
    getDefaultArrowAnnotationLayer,
  } = useCanvasTemplate();

  const handleAddAnnotation = (annotationKey: CanvasLayerType) => {
    const nextIdIndex = getNextLayerId(annotationKey);
    let newLayerId = '';
    let layerName = '';
    switch (annotationKey) {
      case CanvasLayerType.ArrowAnnotation:
        newLayerId = `arrow-${nextIdIndex}`;
        layerName = `Arrow ${nextIdIndex}`;
        addNewLayer(
          newLayerId,
          getDefaultArrowAnnotationLayer(
            newLayerId,
            layerName,
            CANVAS_BACKGROUND_LAYER_ID,
            DEFAULT_CANVAS_ARROW_ANNOTATION_CONFIG,
            400,
            400,
            undefined,
            undefined
          )
        );
        break;
      case CanvasLayerType.TextAnnotation:
        newLayerId = `text-${nextIdIndex}`;
        layerName = `Text ${nextIdIndex}`;
        addNewLayer(
          newLayerId,
          getDefaultTextAnnotationLayer(
            newLayerId,
            layerName,
            CANVAS_BACKGROUND_LAYER_ID,
            {
              value: 'Click to edit text',
              fontStyle: {
                fontSize: 50,
                fontWeight: 'bold',
                color: 'red',
              },
              fontStrokeWidth: 2,
              fontStrokeColor: 'white',
            },
            400,
            50,
            undefined,
            undefined
          )
        );
        break;
      case CanvasLayerType.PointerAnnotation:
      case CanvasLayerType.SquareAnnotation:
        newLayerId = `square-${nextIdIndex}`;
        layerName = `Square ${nextIdIndex}`;
        addNewLayer(
          newLayerId,
          getDefaultSquareAnnotationLayer(
            newLayerId,
            layerName,
            CANVAS_BACKGROUND_LAYER_ID,
            generateRandomRgbaStr(),
            400,
            400,
            undefined,
            undefined,
            {
              lockAspectRatio: true,
            }
          )
        );
        break;
      case CanvasLayerType.CircleAnnotation:
        newLayerId = `circle-${nextIdIndex}`;
        layerName = `Circle ${nextIdIndex}`;
        addNewLayer(
          newLayerId,
          getDefaultCircleAnnotationLayer(
            newLayerId,
            layerName,
            CANVAS_BACKGROUND_LAYER_ID,
            generateRandomRgbaStr(),
            400,
            400,
            undefined,
            undefined,
            {
              lockAspectRatio: true,
            }
          )
        );
        break;
      case CanvasLayerType.EmojiAnnotation:
      case CanvasLayerType.LineAnnotation:
        break;
    }
  };

  const onImageUploaded = (fileImageItems: FileImageItem[]) => {
    for (const fileImageItem of fileImageItems) {
      const id = getNextLayerId(CanvasLayerType.NormalImage);
      const newLayerId = `3d-annotation-${id}`;
      const layerName = `3D Annotation ${id}`;
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
        extension: 'jpeg',
        name: `3D Shape ${makeid(5)}`,
      },
    ]);
  };

  return (
    <div style={{ textAlign: 'left', paddingBottom: 100 }}>
      <h4>Annotations</h4>
      {[
        {
          key: CanvasLayerType.ArrowAnnotation,
          name: 'Arrow',
        },
        {
          key: CanvasLayerType.TextAnnotation,
          name: 'Text',
        },
        {
          key: CanvasLayerType.SquareAnnotation,
          name: 'Square',
        },
        {
          key: CanvasLayerType.CircleAnnotation,
          name: 'Circle',
        },
      ].map(item => (
        <div onClick={() => handleAddAnnotation(item.key)} style={{ marginBottom: 10 }}>
          <Button style={{ ...MIDDLE_STYLE, width: '100%', justifyContent: 'flex-start' }}>
            <RenderLayerIcon type={item.key} /> {item.name}
          </Button>
        </div>
      ))}
      <Divider />
      <h4>3D Shapes</h4>
      <Space style={{ flexWrap: 'wrap' }}>
        {[
          ...Sphere3dShapes,
          ...CubeOne3dShapes,
          ...CubeTwo3dShapes,
          ...Cylinder3dShapes,
          ...Pill3dShapes,
          ...RoundCubeOne3dShapes,
          ...RoundCubeTwo3dShapes,
          ...Cone3dShapes,
        ].map(imageBackground => (
          <React.Fragment>
            <ImageItemCard
              onClick={data => handleTemplateImageClicked(data)}
              style={{
                width: 60,
                height: '100%',
                margin: 0,
              }}
              data={imageBackground}
            />
          </React.Fragment>
        ))}
      </Space>
    </div>
  );
};

export default SiderAnnotationAciton;
