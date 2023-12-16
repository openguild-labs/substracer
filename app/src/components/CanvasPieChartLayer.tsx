/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useMemo } from 'react';
import Pie, { ProvidedProps, PieArcDatum } from '@visx/shape/lib/shapes/Pie';
import { scaleOrdinal } from '@visx/scale';
import { Group } from '@visx/group';
import { animated, useTransition, interpolate } from '@react-spring/web';
import { CanvasLayerComponent, CanvasPieChartConfig, PieChartData } from '@core/models';
import { useLayerConfig } from '@core/index';
import CanvasChartLayoutLayer from './CanvasChartLayoutLayer';
import { useCanvasUtility } from '@stores/useCanvasUtility';

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };
// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number };

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
});
const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
});

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean;
  labelShown: boolean;
  getKey: (d: PieArcDatum<Datum>) => string;
  getColor: (d: PieArcDatum<Datum>) => string;
  onClickDatum?: (d: PieArcDatum<Datum>) => void;
  delay?: number;
};

function AnimatedPie({
  animate,
  arcs,
  path,
  labelShown,
  getKey,
  getColor,
  onClickDatum,
}: AnimatedPieProps<PieChartData>) {
  const transitions = useTransition<PieArcDatum<PieChartData>, AnimatedStyles>(arcs, {
    from: animate ? fromLeaveTransition : enterUpdateTransition,
    enter: enterUpdateTransition,
    update: enterUpdateTransition,
    leave: animate ? fromLeaveTransition : enterUpdateTransition,
    keys: getKey,
  });
  return transitions((props, arc, { key }) => {
    const [centroidX, centroidY] = path.centroid(arc);
    const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

    return (
      <g key={key}>
        <animated.path
          // compute interpolated path d attribute from intermediate angle values
          d={interpolate([props.startAngle, props.endAngle], (startAngle, endAngle) =>
            path({
              ...arc,
              startAngle,
              endAngle,
            })
          )}
          fill={getColor(arc)}
          onClick={() => onClickDatum && onClickDatum(arc)}
          onTouchStart={() => onClickDatum && onClickDatum(arc)}
        />
        {labelShown && hasSpaceForLabel && (
          <animated.g style={{ opacity: props.opacity }}>
            <text
              fill="white"
              x={centroidX}
              y={centroidY}
              dy=".33em"
              fontSize={9}
              textAnchor="middle"
              pointerEvents="none">
              {getKey(arc)}
            </text>
          </animated.g>
        )}
      </g>
    );
  });
}

const CanvasPieChartLayer: CanvasLayerComponent<any, CanvasPieChartConfig> = ({
  layer,
  ...props
}) => {
  const { config } = useLayerConfig(layer);
  const { getChildLayerId } = useCanvasUtility();
  const innerWidth = useMemo(() => layer.width - defaultMargin.left - defaultMargin.right, [layer]);
  const innerHeight = useMemo(
    () =>
      layer.height -
      200 -
      parseInt((layer.cssStyles?.paddingBottom as any) || 0) -
      defaultMargin.top -
      defaultMargin.bottom,
    [layer, getChildLayerId]
  );

  const radius = useMemo(() => Math.min(innerWidth, innerHeight) / 2, [innerWidth, innerHeight]);
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  const getColorOfDatum = useMemo(
    () =>
      scaleOrdinal({
        domain: config.data.map(datum => datum.label),
        range: config.data.map(datum => datum.color),
      }),
    [config]
  );

  const handleGetKey = (arc: PieArcDatum<PieChartData>) => {
    return arc.data.label as string;
  };

  const handleGetColor = (arc: PieArcDatum<PieChartData>) => {
    return getColorOfDatum(arc.data.label) as string;
  };

  return (
    <CanvasChartLayoutLayer layer={layer} {...props}>
      <svg width={layer.width} height={'100%'}>
        <Group top={centerY + defaultMargin.top} left={centerX + defaultMargin.left}>
          <Pie
            data={config.data}
            pieValue={datum => datum.value as number}
            outerRadius={radius}
            {...(config.donutMode
              ? {
                  innerRadius: radius - config.donutThickness,
                  cornerRadius: config.cornerRadius,
                }
              : {})}
            padAngle={config.donutPadding}>
            {pie => (
              <AnimatedPie
                {...pie}
                labelShown={config.labelShown}
                animate={false}
                getKey={handleGetKey}
                getColor={handleGetColor}
              />
            )}
          </Pie>
        </Group>
      </svg>
    </CanvasChartLayoutLayer>
  );
};

export default CanvasPieChartLayer;
