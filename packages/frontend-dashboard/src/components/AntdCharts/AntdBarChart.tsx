import { Column } from "@ant-design/plots"
import { Card } from "antd"
import React from "react"
import type { SalesData } from "../../utils/web/chartService"

interface AntdBarChartProps {
  data: SalesData[]
  title: string
  xDataKey: string
  bars: Array<{
    dataKey: string
    backgroundColor: string
    label: string
  }>
  height?: number
}

const AntdBarChart: React.FC<AntdBarChartProps> = ({
  data,
  title,
  xDataKey,
  bars,
  height = 400,
}) => {
  // Transform data for Ant Design plots
  const transformedData = data.flatMap((item) =>
    bars.map((bar) => ({
      [xDataKey]: item[xDataKey as keyof SalesData],
      type: bar.label,
      value: item[bar.dataKey as keyof SalesData],
    }))
  )

  const config = {
    data: transformedData,
    xField: xDataKey,
    yField: "value",
    seriesField: "type",
    columnStyle: {
      radius: [4, 4, 0, 0],
    },
    color: bars.map((bar) => bar.backgroundColor),
    legend: {
      position: "top-right" as const,
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 1000,
      },
    },
    height,
  }

  return (
    <Card title={title} style={{ height: height + 80 }}>
      <Column {...config} />
    </Card>
  )
}

export default AntdBarChart
