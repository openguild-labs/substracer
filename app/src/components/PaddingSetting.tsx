import React from 'react';
import { useCanvasStore } from '@stores/useCanvasStore';
import { CanvasLayerInfo } from '@core/models';
import TopRightBottomLeftSetting from './TopRightBottomLeftSetting';

type Props = {
  layer: CanvasLayerInfo;
};

const PaddingSetting = ({ layer }: Props) => {
  const { updateLayer } = useCanvasStore();
  return (
    <React.Fragment>
      <h4>Padding</h4>
      <TopRightBottomLeftSetting
        xKeys={['paddingRight', 'paddingLeft']}
        yKeys={['paddingTop', 'paddingBottom']}
        getValue={key => (layer.cssStyles as any)?.[key]}
        upadteValue={(key, value) =>
          updateLayer(layer.id, {
            cssStyles: {
              ...layer.cssStyles,
              [key]: value || 0,
            },
          })
        }
        updateAllValue={(keys, value) => {
          const updatedValues: any = {};
          for (const key of keys) {
            updatedValues[key] = value || 0;
          }
          updateLayer(layer.id, {
            cssStyles: {
              ...layer.cssStyles,
              ...updatedValues,
            },
          });
        }}
        isConstraint={!!layer.constrainSetting?.padding}
        updateConstrain={isToggled =>
          updateLayer(layer.id, {
            constrainSetting: {
              padding: isToggled,
            },
          })
        }
      />
    </React.Fragment>
  );
};

export default PaddingSetting;
