import { Box, Paper, Typography } from "@mui/material"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js"
import React from "react"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface DataPoint {
  [key: string]: string | number
}

interface BarConfig {
  dataKey: string
  backgroundColor: string
  borderColor?: string
  label: string
}

interface CustomBarChartProps {
  data: DataPoint[]
  title: string
  xDataKey: string
  bars: BarConfig[]
  height?: number
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({
  data,
  title,
  xDataKey,
  bars,
  height = 400,
}) => {
  const chartData = {
    labels: data.map((item) => item[xDataKey]),
    datasets: bars.map((bar) => ({
      label: bar.label,
      data: data.map((item) => item[bar.dataKey] as number),
      backgroundColor: bar.backgroundColor,
      borderColor: bar.borderColor || bar.backgroundColor,
      borderWidth: 1,
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
        <Bar data={chartData} options={options} />
      </Box>
    </Paper>
  )
}

export default CustomBarChart
