import { Pie } from "@ant-design/plots"
import { Card } from "antd"
import React from "react"
import type { CategoryData } from "../../utils/web/chartService"

interface AntdPieChartProps {
  data: CategoryData[]
  title: string
  height?: number
}

const AntdPieChart: React.FC<AntdPieChartProps> = ({
  data,
  title,
  height = 400,
}) => {
  console.log("AntdPieChart data:", data)

  if (!data || data.length === 0) {
    return (
      <Card title={title} style={{ height: height + 80 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: height,
          }}
        >
          No data available
        </div>
      </Card>
    )
  }

  const config = {
    data,
    angleField: "value",
    colorField: "name",
    radius: 0.75,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }: { percent: number }) =>
        `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    legend: {
      position: "right" as const,
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    height: height - 20,
  }

  return (
    <Card title={title} style={{ height: height + 80 }}>
      <Pie {...config} />
    </Card>
  )
}

export default AntdPieChart
