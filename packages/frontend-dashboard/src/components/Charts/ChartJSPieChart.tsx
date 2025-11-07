import { Box, Paper, Typography } from "@mui/material"
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js"
import React from "react"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieDataPoint {
  name: string
  value: number
  color: string
}

interface CustomPieChartProps {
  data: PieDataPoint[]
  title: string
  height?: number
  showLegend?: boolean
}

const CustomPieChart: React.FC<CustomPieChartProps> = ({
  data,
  title,
  height = 400,
  showLegend = true,
}) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        borderColor: data.map((item) => item.color),
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: {
            label: string
            parsed: number
            dataset: { data: number[] }
          }) {
            const label = context.label || ""
            const value = context.parsed
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0
            )
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <Paper elevation={3} sx={{ p: 3, height: height + 100 }}>
      <Typography variant="h6" component="h3" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ width: "100%", height: height }}>
        <Pie data={chartData} options={options} />
      </Box>
    </Paper>
  )
}

export default CustomPieChart
