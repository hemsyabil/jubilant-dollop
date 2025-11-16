// Main routes file - combines all route modules
// This is like a directory that points to different sections of our API

import { Router } from "express"
import siteRoutes from "./siteRoutes"
import instrumentRoutes from "./instrumentRoutes"
import applicationRoutes from "./applicationRoutes"

// Create main router
const router = Router()

// Health check endpoint - simple way to test if server is running
router.get("/health", (req, res) => {
  console.log("🏥 Health check requested")
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  })
})

// Connect all our route modules
router.use("/sites", siteRoutes)
router.use("/instruments", instrumentRoutes)
router.use("/applications", applicationRoutes)

export default router
