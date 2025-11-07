import { Spin } from "antd"
import React from "react"

interface LoadingSpinnerProps {
  minHeight?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  minHeight = "400px",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight,
      }}
    >
      <Spin size="large" />
    </div>
  )
}

export default LoadingSpinner
