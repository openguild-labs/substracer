import React, { useState } from 'react';
import { useCanvasStore } from '@stores/useCanvasStore';
import { CANVAS_BACKGROUND_LAYER_ID } from '@utils/canvas-template';
import {
  CanvasBarChartConfig,
  CanvasLayerType,
  CanvasLineChartConfig,
} from '@core/models/canvas-type';
import { Button, Space } from 'antd';
import { useCanvasUtility } from '@stores/useCanvasUtility';
import { useCanvasTemplate } from '@stores/useCanvasTemplate';
import { getBarChartMockData, getLineChartMockData } from '@constants/chart-data';
import { CHARTS } from '@constants/chart';
import { iterateObject } from '@utils/canvas.util';
import { GLOBAL_THEME_COLOR } from '@constants/theme';

type Props = {};

const SiderChartAction = (props: Props) => {
  const [loading, setLoading] = useState<CanvasLayerType | undefined>();
  const { addNewLayer, layers } = useCanvasStore();
  const { getNextLayerId } = useCanvasUtility();
  const { getDefaultLineChartLayer, getDefaultBarChartLayer, getDefaultPieChartLayer } =
    useCanvasTemplate();

  const handleAddChart = async (layerType: CanvasLayerType) => {
    setLoading(layerType);
    const canvasBackground = layers[CANVAS_BACKGROUND_LAYER_ID];
    const nextIdIndex = getNextLayerId(layerType);
    let newLayerId = '';
    let layerName = '';
    switch (layerType) {
      case CanvasLayerType.PieChart:
        newLayerId = `pie-chart-${nextIdIndex}`;
        layerName = `Pie Chart ${nextIdIndex}`;
        addNewLayer<any, any>(
          newLayerId,
          getDefaultPieChartLayer(
            newLayerId,
            layerName,
            CANVAS_BACKGROUND_LAYER_ID,
            canvasBackground.width / 1.5,
            canvasBackground.height / 1.5,
            undefined,
            undefined
          )
        );
        break;
      case CanvasLayerType.BarChart:
        newLayerId = `bar-chart-${nextIdIndex}`;
        layerName = `Bar Chart ${nextIdIndex}`;
        addNewLayer<any, CanvasBarChartConfig>(
          newLayerId,
          getDefaultBarChartLayer(
            newLayerId,
            layerName,
            CANVAS_BACKGROUND_LAYER_ID,
            canvasBackground.width / 1.5,
            canvasBackground.height / 1.5,
            'Bar Chart Title',
            'Description of the bar chart',
            getBarChartMockData().data,
            undefined,
            undefined
          )
        );
        break;
      case CanvasLayerType.LineChart:
        newLayerId = `line-chart-${nextIdIndex}`;
        layerName = `Line Chart ${nextIdIndex}`;
        addNewLayer<any, CanvasLineChartConfig>(
          newLayerId,
          getDefaultLineChartLayer(
            newLayerId,
            layerName,
            CANVAS_BACKGROUND_LAYER_ID,
            canvasBackground.width / 1.5,
            canvasBackground.height / 1.5,
            'Line Chart Title',
            'Description of the line chart',
            getLineChartMockData().data,
            undefined,
            undefined
          )
        );
        break;
      case CanvasLayerType.AreaChart:
        newLayerId = `area-chart-${nextIdIndex}`;
        layerName = `Area Chart ${nextIdIndex}`;
        const lineChartConfig = getDefaultLineChartLayer(
          newLayerId,
          layerName,
          CANVAS_BACKGROUND_LAYER_ID,
          canvasBackground.width / 1.5,
          canvasBackground.height / 1.5,
          'Area Chart Title',
          'Description of the area chart',
          getLineChartMockData().data,
          undefined,
          undefined
        );
        addNewLayer<any, CanvasLineChartConfig>(newLayerId, {
          ...lineChartConfig,
          extra: {
            ...(lineChartConfig.extra as any),
            areaMode: true,
            areaStyle: {
              backgroundColor: GLOBAL_THEME_COLOR.$highlight_color,
            },
          },
        });
        break;
    }
    setLoading(undefined);
  };
  return (
    <div style={{ textAlign: 'left' }}>
      <h4>Charts</h4>
      <Space direction="vertical" style={{ width: '100%' }}>
        {iterateObject(CHARTS, chart => (
          <Button
            loading={chart.key === loading}
            onClick={() => handleAddChart(chart.key)}
            style={{ width: '100%', textAlign: 'left' }}>
            {chart.chartIcon}
            {chart.name}
          </Button>
        ))}
      </Space>
    </div>
  );
};

export default SiderChartAction;
