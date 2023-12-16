import { BarChartData, DataColumn, DataType, LineChartData, PieChartData } from '@core/models';
import { generateRandomRgbaStr } from '@utils/string.util';
import appleStock from '@visx/mock-data/lib/mocks/appleStock';
import browserUsage, { BrowserUsage as Browsers } from '@visx/mock-data/lib/mocks/browserUsage';
import moment from 'moment';

type BrowserNames = keyof Browsers;

export const getPieChartMockData = (): {
  columns: Record<string, DataColumn>;
  data: PieChartData[];
} => {
  const browserNames = Object.keys(browserUsage[0]).filter(k => k !== 'date') as BrowserNames[];
  const columns: Record<string, DataColumn> = {
    label: {
      fieldName: 'Label',
      dataType: DataType.String,
    },
    color: {
      fieldName: 'Color',
      dataType: DataType.Color,
    },
    value: {
      fieldName: 'Value',
      dataType: DataType.Number,
    },
  };
  const browsers: PieChartData[] = browserNames.map(name => ({
    label: name,
    color: generateRandomRgbaStr(),
    value: Number(browserUsage[0][name]),
  }));
  return {
    columns,
    data: browsers,
  };
};

export const getLineChartMockData = (): {
  columns: Record<string, DataColumn>;
  data: LineChartData[];
} => {
  const columns: Record<string, DataColumn> = {
    xAxis: {
      fieldName: 'X Axis',
      dataType: DataType.Date,
    },
    yAxis: {
      fieldName: 'Y Axis',
      dataType: DataType.Number,
    },
  };
  const data: LineChartData[] = appleStock.slice(-100).map(data => ({
    xAxis: moment(data.date).unix(),
    yAxis: data.close,
  }));

  return {
    columns,
    data,
  };
};

export const getBarChartMockData = (): {
  columns: Record<string, DataColumn>;
  data: BarChartData[];
} => {
  const columns: Record<string, DataColumn> = {
    xAxis: {
      dataType: DataType.Date,
      fieldName: 'X Axis',
    },
    yAxis: {
      dataType: DataType.String,
      fieldName: 'Y Axis',
    },
    label: {
      dataType: DataType.String,
      fieldName: 'Label',
    },
    color: {
      dataType: DataType.Color,
      fieldName: 'Bar Color',
    },
  };
  const data: BarChartData[] = appleStock.slice(-10).map((data, index) => ({
    xAxis: moment(data.date).unix(),
    yAxis: data.close,
    label: `Bar #${index}`,
    color: generateRandomRgbaStr(),
  }));
  return {
    columns,
    data,
  };
};
