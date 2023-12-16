/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import CanvasChartLayoutLayer from './CanvasChartLayoutLayer';
import { CanvasBarChartConfig, CanvasLayerComponent } from '@core/models';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { useLayerConfig } from '@core/index';
import { round } from '@utils/canvas.util';

const CanavsBarChartLayer: CanvasLayerComponent<any, CanvasBarChartConfig> = ({
  layer,
  ...props
}) => {
  const { config } = useLayerConfig<CanvasBarChartConfig>(layer);
  const verticalMargin = 120;

  const handleBarClicked = () => {};

  const xMax = useMemo(() => layer.width, [layer.width]);
  const yMax = useMemo(() => layer.height - verticalMargin, [layer.height]);
  const xScale = useMemo(
    () =>
      scaleBand<any>({
        range: [0, xMax],
        domain: config.data.map(d => d.xAxis),
        padding: 0.4,
      }),
    [xMax, config.data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...config.data.map(d => d.yAxis as number))],
      }),
    [yMax, config.data]
  );

  return (
    <CanvasChartLayoutLayer layer={layer} {...props}>
      <svg width={layer.width} height={'100%'}>
        <Group top={verticalMargin / 2}>
          {config.data.map((d, index) => {
            const barWidth = xScale.bandwidth();
            const barHeight = (config.barHeight || yMax) - (yScale(d.yAxis as number) ?? 0);
            const barX = xScale(d.xAxis);
            const barY = yMax - barHeight;
            return (
              <React.Fragment>
                <Bar
                  key={`bar-${index}`}
                  x={barX}
                  y={barY}
                  width={config.barWidth || barWidth}
                  height={barHeight - 200}
                  fill={config.oneColorMode ? config.barColor : (d.color as string)}
                  onClick={handleBarClicked}
                />
                {config.barValueShown && (
                  <text
                    x={xScale(d.xAxis)}
                    y={yMax - barHeight}
                    fill={config.barValueStyle.fontStyle.color || 'black'}
                    fontSize={config.barValueStyle.fontStyle.fontSize}
                    dx={'0em'}
                    dy={'-.5em'}
                    style={{
                      fontFamily: config.barValueStyle.fontStyle.fontFamily || 'Inter',
                      fontWeight: config.barValueStyle.fontStyle.fontWeight,
                    }}>
                    {`${round(d.yAxis as number, 0)}`}
                  </text>
                )}
                {config.labelShown && (
                  <text
                    x={xScale(d.xAxis)}
                    y={yMax - 180}
                    fill={config.labelStyle.fontStyle.color || 'black'}
                    fontSize={config.labelStyle.fontStyle.fontSize}
                    dx={'0em'}
                    dy={'1em'}
                    style={{
                      fontFamily: config.labelStyle.fontStyle.fontFamily || 'Inter',
                      fontWeight: config.labelStyle.fontStyle.fontWeight,
                    }}>
                    {d.label as string}
                  </text>
                )}
              </React.Fragment>
            );
          })}
        </Group>
      </svg>
    </CanvasChartLayoutLayer>
  );
};

export default CanavsBarChartLayer;
