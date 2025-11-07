import { Line } from "@ant-design/plots"
import { Card } from "antd"
import React from "react"
import type { SalesData } from "../../utils/web/chartService"

interface AntdLineChartProps {
  data: SalesData[]
  title: string
  xDataKey: string
  lines: Array<{
    dataKey: string
    borderColor: string
    label: string
  }>
  height?: number
}

const AntdLineChart: React.FC<AntdLineChartProps> = ({
  data,
  title,
  xDataKey,
  lines,
  height = 400,
}) => {
  // Transform data for Ant Design plots
  const transformedData = data.flatMap((item) =>
    lines.map((line) => ({
      [xDataKey]: item[xDataKey as keyof SalesData],
      type: line.label,
      value: item[line.dataKey as keyof SalesData],
    }))
  )

  const config = {
    data: transformedData,
    xField: xDataKey,
    yField: "value",
    seriesField: "type",
    smooth: true,
    color: lines.map((line) => line.borderColor),
    legend: {
      position: "top-right" as const,
    },
    point: {
      size: 4,
      shape: "circle",
      style: {
        fill: "white",
        stroke: "#5B8FF9",
        lineWidth: 2,
      },
    },
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    height,
  }

  return (
    <Card title={title} style={{ height: height + 80 }}>
      <Line {...config} />
    </Card>
  )
}

export default AntdLineChart
