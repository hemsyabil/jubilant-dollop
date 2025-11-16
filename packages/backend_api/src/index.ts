// Main server file - this is where everything starts
// Think of this as the foundation of our API

import express from "express"
import routes from './routes';
import { requestLogger, errorHandler } from './middleware/logging';

// Create Express application
const app = express()

// Set the port - use environment variable or default to 3000
const PORT = process.env.PORT || 3000

// Middleware Setup (these run for every request):

// 1. Parse JSON requests - allows us to read JSON data from requests
app.use(express.json())

// 2. Log all requests - helps us see what's happening
app.use(requestLogger)

// 3. Connect our routes - this handles all our API endpoints
app.use("/api", routes)

// 4. Welcome route for the root URL
app.get("/", (req, res) => {
  console.log("👋 Welcome route accessed")
  res.json({
    message: "Welcome to the Lab Management API!",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      sites: "/api/sites",
      instruments: "/api/instruments",
      applications: "/api/applications",
    },
  })
})

// 5. Handle 404 errors - when someone tries to access a route that doesn't exist
app.use("*", (req, res) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`)
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.method} ${req.originalUrl} does not exist`,
  })
})

// 6. Error handling - catches any errors that happen
app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
  console.log("🚀 ================================")
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`🚀 API URL: http://localhost:${PORT}/api`)
  console.log(`🚀 Health Check: http://localhost:${PORT}/api/health`)
  console.log("🚀 ================================")
})
