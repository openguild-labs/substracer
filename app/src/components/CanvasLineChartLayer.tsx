/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { HtmlLabel, Connector, CircleSubject, LineSubject } from '@visx/annotation';
import { AreaClosed, LinePath } from '@visx/shape';
import { curveMonotoneX } from '@visx/curve';
import { useLayerConfig, useLineChartConfig } from '@core/hooks';
import { bisector } from '@visx/vendor/d3-array';
import { scaleLinear, scaleTime } from '@visx/scale';
import { useCanvasStore } from '@stores/useCanvasStore';
import { CanvasLayerComponent, CanvasLineChartConfig } from '@core/models/canvas-type';
import { GridColumns } from '@visx/grid';
import CanvasChartLayoutLayer from './CanvasChartLayoutLayer';
import { LineChartData } from '@core/models';
import { GLOBAL_THEME_COLOR } from '@constants/theme';
import { LinearGradient } from '@visx/gradient';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';

function findNearestDatum({
  value,
  scale,
  accessor,
  data,
}: {
  value: number;
  scale: ReturnType<typeof scaleLinear | typeof scaleTime>;
  accessor: (d: LineChartData) => number;
  data: LineChartData[];
}): LineChartData {
  const bisect = bisector(accessor).left;
  const nearestValue = scale.invert(value) as number;
  const nearestValueIndex = bisect(data, nearestValue, 1);
  const d0 = data[nearestValueIndex - 1];
  const d1 = data[nearestValueIndex];
  let nearestDatum = d0;
  if (d1 && accessor(d1)) {
    nearestDatum = nearestValue - accessor(d0) > accessor(d1) - nearestValue ? d1 : d0;
  }
  return nearestDatum;
}

const CanvasLineChartLayer: CanvasLayerComponent<CanvasLineChartConfig, CanvasLineChartConfig> = ({
  layer,
  ...props
}) => {
  const { updateLayer, updateLayerConfig } = useCanvasStore();
  const { config } = useLayerConfig(layer);
  const {
    AnnotationComponent,
    setAnnotationPosition,
    xScale,
    xAxisScale,
    yScale,
    approxTooltipHeight,
    leftOffset,
    topOffset,
  } = useLineChartConfig(layer, updateLayer);
  const {
    lineStrokeStyle,
    labelShown,
    annotationPosition,
    connectorType,
    editLabelPosition,
    editSubjectPosition,
    subjectType,
    annotationContainerWidth,
    annotationContainerStyle,
    annotationSubtitle,
    annotationSubtitleStyle,
    annotationTitle,
    annotationTitleStyle,
  } = config;

  useEffect(() => {
    const value = !(config.editLabelPosition || config.editSubjectPosition);
    updateLayer(layer.id, {
      resizable: value,
      draggable: value,
      editable: value,
    });
  }, [config]);

  useEffect(() => {
    updateLayerConfig<CanvasLineChartConfig>(layer.id, 'editLabelPosition', false);
    updateLayerConfig<CanvasLineChartConfig>(layer.id, 'editSubjectPosition', false);
  }, []);

  return (
    <CanvasChartLayoutLayer layer={layer} {...props}>
      <svg width={layer.width} height={'100%'}>
        <Group left={50}>
          {config.gridColumnsMode && (
            <GridColumns
              scale={xScale}
              height={layer.height}
              strokeDasharray="1,2"
              stroke={GLOBAL_THEME_COLOR.$dark_text_color}
              strokeOpacity={0.2}
              pointerEvents="none"
            />
          )}
          {config.areaMode ? (
            <React.Fragment>
              <LinearGradient
                id={`${layer.id}-area-gradient`}
                from={config.areaStyle?.backgroundColor || GLOBAL_THEME_COLOR.$highlight_color}
                to={config.areaStyle?.backgroundColor || GLOBAL_THEME_COLOR.$highlight_color}
                toOpacity={0.1}
              />
              <AreaClosed
                data={config.data}
                x={d => xScale(d.xAxis as number) ?? 0}
                y={d => yScale(d.yAxis as number) ?? 0}
                yScale={yScale}
                strokeWidth={lineStrokeStyle.strokeWidth}
                stroke={`url(#${layer.id}-area-gradient)`}
                fill={`url(#${layer.id}-area-gradient)`}
                curve={config.lineCurve ? curveMonotoneX : undefined}
              />
            </React.Fragment>
          ) : (
            <LinePath
              stroke={lineStrokeStyle.backgroundColor}
              strokeWidth={lineStrokeStyle.strokeWidth}
              style={lineStrokeStyle}
              xHeight={layer.height}
              data={config.data}
              x={d => xScale(d.xAxis as number) ?? 0}
              y={d => yScale(d.yAxis as number) ?? 0}
              curve={config.lineCurve ? curveMonotoneX : undefined}
            />
          )}
          {!config.hideXAxis && (
            <AxisBottom
              top={layer.height - topOffset}
              left={leftOffset}
              scale={xAxisScale}
              numTicks={layer.width / 150}
              stroke={config.axisStyle?.stroke || GLOBAL_THEME_COLOR.$highlight_color}
              strokeWidth={config.axisStyle?.strokeWidth}
              tickStroke={config.axisStyle?.color || GLOBAL_THEME_COLOR.$highlight_color}
              tickLabelProps={{
                textAnchor: 'middle' as const,
                fontFamily: config.axisStyle?.fontFamily,
                fontSize: config.axisStyle?.fontSize,
                fontStyle: config.axisStyle?.fontStyle,
                fill: config.axisStyle?.color,
              }}
            />
          )}
          {!config.hideYAxis && (
            <AxisLeft
              left={leftOffset}
              scale={yScale}
              numTicks={5}
              stroke={config.axisStyle?.stroke || GLOBAL_THEME_COLOR.$highlight_color}
              strokeWidth={config.axisStyle?.strokeWidth}
              tickLabelProps={{
                dx: '-0.25em',
                dy: '0.25em',
                textAnchor: 'end' as const,
                fontFamily: config.axisStyle?.fontFamily,
                fontSize: config.axisStyle?.fontSize,
                fontStyle: config.axisStyle?.fontStyle,
                fill: config.axisStyle?.color,
              }}
            />
          )}
          {labelShown && (
            <AnnotationComponent
              width={layer.width}
              height={layer.height}
              x={annotationPosition.x}
              y={annotationPosition.y}
              dx={annotationPosition.dx}
              dy={annotationPosition.dy}
              canEditLabel={editLabelPosition}
              canEditSubject={editSubjectPosition}
              onDragEnd={({ event, ...nextPosition }) => {
                event.stopPropagation();
                // snap Annotation to the nearest data point
                const nearestDatum = findNearestDatum({
                  accessor:
                    subjectType === 'horizontal-line'
                      ? d => d.yAxis as number
                      : d => d.xAxis as number,
                  data: config.data,
                  scale: subjectType === 'horizontal-line' ? yScale : xScale,
                  value: subjectType === 'horizontal-line' ? nextPosition.y : nextPosition.x,
                });
                const x = xScale(nearestDatum.xAxis as number) ?? 0;
                const y = yScale(nearestDatum.yAxis as number) ?? 0;
                // flip label to keep in view
                const shouldFlipDx =
                  (nextPosition.dx > 0 &&
                    x + nextPosition.dx + annotationContainerWidth > layer.width) ||
                  (nextPosition.dx < 0 && x + nextPosition.dx - annotationContainerWidth <= 0);
                const shouldFlipDy = // 100 is est. tooltip height
                  (nextPosition.dy > 0 &&
                    layer.height - (y + nextPosition.dy) < approxTooltipHeight) ||
                  (nextPosition.dy < 0 && y + nextPosition.dy - approxTooltipHeight <= 0);
                setAnnotationPosition({
                  x,
                  y,
                  dx: (shouldFlipDx ? -1 : 1) * nextPosition.dx,
                  dy: (shouldFlipDy ? -1 : 1) * nextPosition.dy,
                });
              }}>
              <Connector stroke={lineStrokeStyle.backgroundColor} type={connectorType} />
              <HtmlLabel
                anchorLineStroke={'transparent'}
                className="line-chart-title-annotation"
                containerStyle={{
                  width: annotationContainerWidth,
                  ...annotationContainerStyle,
                }}>
                <h3 style={annotationTitleStyle}>{annotationTitle}</h3>
                <p style={annotationSubtitleStyle}>{annotationSubtitle}</p>
              </HtmlLabel>
              {subjectType === 'circle' && (
                <CircleSubject stroke={lineStrokeStyle.backgroundColor} />
              )}
              {subjectType !== 'circle' && (
                <LineSubject
                  orientation={subjectType === 'vertical-line' ? 'vertical' : 'horizontal'}
                  stroke={lineStrokeStyle.backgroundColor}
                  min={0}
                  max={subjectType === 'vertical-line' ? layer.height : layer.width}
                />
              )}
            </AnnotationComponent>
          )}
        </Group>
      </svg>
    </CanvasChartLayoutLayer>
  );
};

export default CanvasLineChartLayer;
