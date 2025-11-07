import { Box, Paper, Typography } from "@mui/material"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import React from "react"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

interface DataPoint {
  [key: string]: string | number
}

interface LineConfig {
  dataKey: string
  borderColor: string
  backgroundColor?: string
  label: string
}

interface CustomLineChartProps {
  data: DataPoint[]
  title: string
  xDataKey: string
  lines: LineConfig[]
  height?: number
}

const CustomLineChart: React.FC<CustomLineChartProps> = ({
  data,
  title,
  xDataKey,
  lines,
  height = 400,
}) => {
  const chartData = {
    labels: data.map((item) => item[xDataKey]),
    datasets: lines.map((line) => ({
      label: line.label,
      data: data.map((item) => item[line.dataKey] as number),
      borderColor: line.borderColor,
      backgroundColor: line.backgroundColor || line.borderColor + "20",
      tension: 0.1,
      fill: false,
    })),
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <Paper elevation={3} sx={{ p: 3, height: height + 100 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: height }}>
        <Line data={chartData} options={options} />
      </Box>
    </Paper>
  )
}

export default CustomLineChart
