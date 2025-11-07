import { Box, CircularProgress } from "@mui/material"

interface LoadingSpinnerProps {
  minHeight?: string
}

const LoadingSpinner = ({ minHeight = "400px" }: LoadingSpinnerProps) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={minHeight}
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingSpinner
