// Middleware to validate request data
// This checks if the incoming request has the right format

import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"

// Generic validation middleware that works with any Zod schema
export const validateRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body against the schema
      const validatedData = schema.parse(req.body)

      // Replace req.body with validated data (removes extra fields)
      req.body = validatedData

      // Continue to the next middleware/controller
      next()
    } catch (error: any) {
      // If validation fails, return error
      console.log("❌ Validation failed:", error.errors) // Logging for debugging
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      })
    }
  }
}
