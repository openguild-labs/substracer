/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from "react";
import {
  CanvasChartGeneralConfig,
  CanvasLayerInfo,
  ChartData,
  DataColumn,
  DataType,
} from "@core/models";
import type { ColumnsType } from "antd/es/table";
import {
  Button,
  Input,
  InputNumber,
  Popover,
  Radio,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { useLayerConfig } from "@core/index";
import SolidColorButton from "./canvas/SolidColorButton";
import { ClearOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { generateRandomRgbaStr } from "@utils/string.util";
import moment from "moment";
import { MIDDLE_STYLE } from "@constants/responsive";
import { GLOBAL_THEME_COLOR } from "@constants/theme";
import { useModalStore } from "@stores/useModalStore";

type Props = {
  layer: CanvasLayerInfo;
};

const Spreadsheet = ({ layer }: Props) => {
  const { config } = useLayerConfig<CanvasChartGeneralConfig<ChartData>>(layer);
  const { handleUpdateConfig } =
    useLayerConfig<CanvasChartGeneralConfig<ChartData>>(layer);
  const { openModal } = useModalStore();

  const handleCleanData = () => {
    handleUpdateConfig("data", [config.data[0]]);
  };

  const handleDataTypeChange = (columnId: string, newDataType: DataType) => {
    handleUpdateConfig("columns", {
      ...config.columns,
      [columnId]: {
        ...config.columns[columnId],
        dataType: newDataType,
      } as DataColumn,
    });
  };

  const handleDelete = (index: number) => {
    const updatedDataList: ChartData[] = [];
    for (let i = 0; i < config.data.length; i++) {
      const currentDatum = config.data[i];
      if (i !== index) {
        updatedDataList.push(currentDatum);
      }
    }
    handleUpdateConfig("data", updatedDataList);
  };

  const handleUpdateDate = (index: number, field: string) => {
    const row = config.data[index][field];
    if (config.columns[field].dataType !== DataType.Date)
      throw new Error("Field is not a date type");
    openModal("dateTimePickerModal", {
      dateTime: row,
      onClose: (newValue: number) => {
        onSpreadsheetDataUpdated(index, field, newValue);
      },
    });
  };

  const handleAdd = () => {
    const newValue: ChartData = {};
    for (const field of Object.keys(config.columns)) {
      const data = config.columns[field];
      switch (data.dataType) {
        case DataType.Color:
          newValue[field] = generateRandomRgbaStr();
          break;
        case DataType.String:
          newValue[field] = "";
          break;
        case DataType.Number:
          newValue[field] = 0;
          break;
        case DataType.Date:
          newValue[field] = moment().unix();
          break;
      }
    }
    handleUpdateConfig("data", config.data.concat(newValue));
  };

  const onSpreadsheetDataUpdated = (
    index: number,
    columnId: string,
    value: any
  ) => {
    const updatedDataList: ChartData[] = [];
    for (let i = 0; i < config.data.length; i++) {
      const currentDatum = config.data[i];
      if (i === index) {
        updatedDataList.push({
          ...currentDatum,
          [columnId]: value,
        });
      } else {
        updatedDataList.push(currentDatum);
      }
    }
    handleUpdateConfig("data", updatedDataList);
  };

  const getDatumDataField = (datum: ChartData) => {
    const returnValue: Record<string, any> = {};
    for (const columnId of Object.keys(config.columns)) {
      returnValue[columnId] = datum[columnId];
    }
    return returnValue;
  };

  const columns = useMemo<ColumnsType<string>>(
    () => [
      ...Object.keys(config.columns).map((columnId) => ({
        title: (
          <div
            style={{
              ...MIDDLE_STYLE,
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div>{config.columns[columnId].fieldName}</div>{" "}
            <Popover
              content={
                <div>
                  <Radio.Group
                    onChange={(e) =>
                      handleDataTypeChange(columnId, e.target.value)
                    }
                    value={config.columns[columnId].dataType}
                  >
                    <Space direction="vertical">
                      {Object.keys(DataType).map((key) => (
                        <Radio value={(DataType as any)[key]}>{key}</Radio>
                      ))}
                    </Space>
                  </Radio.Group>
                </div>
              }
              title="Data Type"
              trigger={"click"}
              placement="left"
            >
              <Tooltip title="Click to change data type">
                <Tag
                  color="blue-inverse"
                  style={{
                    fontSize: 10,
                    borderRadius: 50,
                    margin: "10px 0px",
                    cursor: "pointer",
                  }}
                >
                  {config.columns[columnId].dataType}
                </Tag>
              </Tooltip>
            </Popover>
          </div>
        ),
        dataIndex: columnId,
        key: columnId,
        render(value: any, record: any, index: any) {
          const column = config.columns[columnId];
          const onColumnChange = (val: any) => {
            onSpreadsheetDataUpdated(index, columnId, val);
          };
          const data: any = config.data[index][columnId];
          if (column.dataType === DataType.Color) {
            return (
              <div style={{ ...MIDDLE_STYLE }}>
                <SolidColorButton
                  value={data}
                  onValueChanged={onColumnChange}
                />
              </div>
            );
          }
          if (column.dataType === DataType.Number) {
            return (
              <InputNumber
                className="spreadsheet-input"
                value={data}
                onChange={onColumnChange}
              />
            );
          }
          if (column.dataType === DataType.Date) {
            return (
              <div style={{ ...MIDDLE_STYLE }}>
                <Tooltip title="Edit date">
                  <div
                    className="spreadsheet-input"
                    style={{ cursor: "text" }}
                    onClick={() => handleUpdateDate(index, columnId)}
                  >
                    {moment.unix(data).format("DD/MM/YYYY HH:mm:ss")}
                  </div>
                </Tooltip>
              </div>
            );
          }
          return (
            <Input
              className="spreadsheet-input"
              value={data}
              onChange={(e) => onColumnChange(e.target.value)}
            />
          );
        },
      })),
      {
        title: "Other Actions",
        dataIndex: "action",
        render(value: any, record: any, index: any) {
          return (
            <div className="spreadsheet-input">
              <Tooltip title="Delete row">
                <DeleteOutlined
                  style={{ color: GLOBAL_THEME_COLOR.$dark_text_color }}
                  onClick={() => handleDelete(index)}
                />
              </Tooltip>
            </div>
          );
        },
      },
    ],
    [layer, config.data, config.columns]
  );

  const dataSource = useMemo(
    () =>
      config.data.map((datum, index) => ({
        key: index,
        ...getDatumDataField(datum),
      })),
    [layer, config.data]
  );

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button onClick={handleCleanData}>
          <ClearOutlined /> Clean table data
        </Button>
      </div>
      <Table
        sticky
        style={{ maxHeight: "100vh", overflow: "auto", marginTop: 20 }}
        pagination={false}
        columns={columns as any}
        dataSource={dataSource}
      />
      <Button onClick={handleAdd} style={{ width: "100%", marginTop: 20 }}>
        <PlusOutlined /> Add new row
      </Button>
    </div>
  );
};

export default Spreadsheet;
