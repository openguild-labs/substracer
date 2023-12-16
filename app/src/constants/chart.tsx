import {
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { CanvasLayerType } from '@core/models';

export type ChartCanvasLayerType =
  | CanvasLayerType.LineChart
  | CanvasLayerType.BarChart
  | CanvasLayerType.AreaChart
  | CanvasLayerType.PieChart;

export const CHARTS: Record<
  ChartCanvasLayerType,
  {
    key: CanvasLayerType;
    chartIcon: React.ReactElement;
    name: string;
  }
> = {
  [CanvasLayerType.LineChart]: {
    key: CanvasLayerType.LineChart,
    chartIcon: <LineChartOutlined />,
    name: 'Line Chart',
  },
  [CanvasLayerType.AreaChart]: {
    key: CanvasLayerType.AreaChart,
    chartIcon: <AreaChartOutlined />,
    name: 'Area Chart',
  },
  [CanvasLayerType.BarChart]: {
    key: CanvasLayerType.BarChart,
    chartIcon: <BarChartOutlined />,
    name: 'Bar Chart',
  },
  [CanvasLayerType.PieChart]: {
    key: CanvasLayerType.PieChart,
    chartIcon: <PieChartOutlined />,
    name: 'Pie Chart',
  },
};

export function numberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
