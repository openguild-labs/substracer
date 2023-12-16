/* eslint-disable react-hooks/exhaustive-deps */
/* eslint jsx-a11y/label-has-associated-control: 'off', @typescript-eslint/no-explicit-any: 'off' */
import { useEffect, useMemo, useState } from 'react';
import { scaleTime, scaleLinear } from '@visx/scale';
import { extent } from '@visx/vendor/d3-array';
import { Annotation, EditableAnnotation } from '@visx/annotation';
import { CanvasStoreState } from '@stores/useCanvasStore';
import { CanvasLayerInfo, CanvasLineChartConfig } from '@core/models/canvas-type';
import { useLayerConfig } from './useLayerConfig';
import moment from 'moment';

export const useLineChartConfig = (
  layer: CanvasLayerInfo<any, CanvasLineChartConfig>,
  onConfigUpdated: CanvasStoreState['updateLayer']
) => {
  const { config } = useLayerConfig<CanvasLineChartConfig>(layer);
  const leftOffset = 55;
  const topOffset = 220;
  const annotateDatum = useMemo(
    () => config.data[Math.floor(config.data.length / 2) + 4],
    [config.data]
  );
  const approxTooltipHeight = 70;
  const xAxisScale = useMemo(
    () =>
      scaleTime({
        domain: extent(config.data, d => moment.unix(d.xAxis as number).toDate()) as Date[],
        range: [0, layer.width],
      }),
    [layer.width, config.data]
  );
  const xScale = useMemo(
    () =>
      scaleTime({
        domain: extent(config.data, d => d.xAxis as number) as number[],
        range: [leftOffset, layer.width],
      }),
    [layer.width, config.data]
  );
  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: extent(config.data, d => d.yAxis as number) as number[],
        range: [layer.height - topOffset, 100],
      }),
    [layer.height, config.data]
  );

  const [annotationPosition, setAnnotationPosition] = useState({
    x: annotateDatum?.xAxis ? xScale(annotateDatum.xAxis as number) : 0,
    y: annotateDatum?.yAxis ? yScale(annotateDatum.yAxis as number) : 0,
    dx: -150,
    dy: -100,
  });

  // update annotation position when scale's change
  useEffect(() => {
    setAnnotationPosition(currPosition => ({
      ...currPosition,
      x: annotateDatum?.xAxis ? xScale(annotateDatum.xAxis as number) : 0,
      y: annotateDatum?.yAxis ? yScale(annotateDatum.yAxis as number) : 0,
    }));
  }, [xScale, yScale, annotateDatum]);

  useEffect(() => {
    onConfigUpdated(layer.id, {
      extra: {
        ...config,
        annotationPosition,
      },
    });
  }, [annotationPosition, config.data]);

  return {
    AnnotationComponent:
      config.editLabelPosition || config.editSubjectPosition ? EditableAnnotation : Annotation,
    config,
    approxTooltipHeight,
    xScale,
    xAxisScale,
    yScale,
    setAnnotationPosition,
    leftOffset,
    topOffset,
  };
};
