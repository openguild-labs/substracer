import { palettes } from '@constants/gradient-pallete';
import { MIDDLE_STYLE } from '@constants/responsive';
import { CanvasGradientBackground, CanvasLayerId, CanvasLayerInfo } from '@core/models/canvas-type';
import React from 'react';

const Gradient = (props: any) => {
  const { angle = 0, from, to } = props;

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${from}, ${to})`,
        width: '50px',
        height: '30px',
        borderRadius: 5,
        backgroundSize: '100%',
      }}></div>
  );
};

const Palette = (props: { from: string; to: string; angle: number }) => {
  return <Gradient {...props} />;
};

type Props = {
  layer: CanvasLayerInfo<CanvasGradientBackground>;
  onValueChange: (layerId: CanvasLayerId, value: CanvasGradientBackground) => void;
};

const BackgroundGradientSetting = ({ layer, onValueChange }: Props) => {
  const angle = 135;
  return (
    <React.Fragment>
      <h4>Templates</h4>
      <div
        style={{
          ...MIDDLE_STYLE,
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          paddingBottom: 10,
        }}>
        {palettes.map((pallete, _) => (
          <div
            onClick={() =>
              onValueChange(
                layer.id,
                `linear-gradient(${angle}deg, ${pallete.from}, ${pallete.to})`
              )
            }
            style={{ margin: '5px 5px', cursor: 'pointer' }}>
            <Palette angle={angle} from={pallete.from} to={pallete.to} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default BackgroundGradientSetting;
