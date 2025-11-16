// Simple test server to verify basic setup works
import express from "express"

const app = express()
const PORT = 3000

// Parse JSON requests
app.use(express.json())

// Simple test route
app.get("/", (req, res) => {
  res.json({
    message: "Backend API is working!",
    status: "success",
    timestamp: new Date().toISOString(),
  })
})

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
  })
})

// Simple sites endpoint with hardcoded data
app.get("/api/sites", (req, res) => {
  const sites = [
    {
      site_id: "S001",
      name: "National Research Lab",
      address: "123 Innovation Drive, Ottawa, ON, Canada",
      server_location: "Room 204, Building B",
      btn_switch_port: "Port-12",
      instruments: ["INS001", "INS002"],
      comments: "Primary R&D facility",
    },
  ]

  res.json(sites)
})

app.listen(PORT, () => {
  console.log("🚀 ================================")
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`🚀 Test: http://localhost:${PORT}`)
  console.log(`🚀 API: http://localhost:${PORT}/api/sites`)
  console.log("🚀 ================================")
})
