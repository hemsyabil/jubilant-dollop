// Simple logging middleware
// This logs every request that comes to our server

import { Request, Response, NextFunction } from "express"

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const timestamp = new Date().toISOString()
  const method = req.method
  const url = req.url

  console.log(`📝 [${timestamp}] ${method} ${url}`)

  // Continue to the next middleware
  next()
}

// Error handling middleware
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("❌ Error occurred:", err)

  res.status(500).json({
    error: "Internal server error",
    message: "Something went wrong on the server",
  })
}
