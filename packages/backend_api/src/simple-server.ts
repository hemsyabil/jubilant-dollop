// Simple working server for testing
// Everything in one file to avoid module resolution issues

import express, { Request, Response } from "express"
import { z } from "zod"

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Simple logging middleware
app.use((req, res, next) => {
  console.log(`📝 [${new Date().toISOString()}] ${req.method} ${req.url}`)
  next()
})

// Types
interface Site {
  site_id: string
  name: string
  address: string
  server_location: string
  btn_switch_port: string
  instruments: string[]
  comments: string
}

interface Instrument {
  instrument_id: string
  name: string
  serial_number: string
  description?: string
  status: "operational" | "non-operational" | "maintenance"
  service_contract?: string
  device_type: string
  function?: string
  model?: string
  os_version?: string
  location?: string
  room?: string
  network_name?: string
  server_ip?: string
  server_ilo_ip?: string
  applications?: string[]
  login_info?: string
  config_file?: string
  comments?: string
}

interface Application {
  application_id: string
  application_name: string
  vendor: string
  description?: string
  license_details?: string
  comments?: string
}

// Mock Data
const sitesData: Site[] = [
  {
    site_id: "S001",
    name: "National Research Lab",
    address: "123 Innovation Drive, Ottawa, ON, Canada",
    server_location: "Room 204, Building B",
    btn_switch_port: "Port-12",
    instruments: ["INS001", "INS002"],
    comments: "Primary R&D facility",
  },
  {
    site_id: "S002",
    name: "Satellite Office",
    address: "456 Discovery Ave, Toronto, ON, Canada",
    server_location: "Room 101",
    btn_switch_port: "Port-08",
    instruments: [],
    comments: "Remote office",
  },
]

const instrumentsData: Instrument[] = [
  {
    instrument_id: "INS001",
    name: "Dell PowerEdge R740",
    serial_number: "SN-98423",
    description: "High-performance compute server",
    status: "operational",
    service_contract: "Valid until 2026-09-30",
    device_type: "server",
    function: "vm",
    model: "PowerEdge R740",
    os_version: "Windows Server 2019",
    location: "National Research Lab",
    room: "204B",
    network_name: "omega",
    server_ip: "10.0.0.15",
    server_ilo_ip: "10.0.0.250",
    applications: ["APP001", "APP003"],
    login_info: "admin /********",
    config_file: "/configs/r740.conf",
    comments: "Used for VM hosting",
  },
]

const applicationsData: Application[] = [
  {
    application_id: "APP001",
    application_name: "Microsoft SQL Server",
    vendor: "Microsoft",
    description: "Database management system",
    license_details: "Volume License - 2025",
    comments: "Used for internal databases",
  },
]

// Validation schemas
const createSiteSchema = z.object({
  name: z.string().min(1, "Site name is required"),
  address: z.string().min(1, "Address is required"),
  server_location: z.string().min(1, "Server location is required"),
  btn_switch_port: z.string().min(1, "Switch port is required"),
  instruments: z.array(z.string()).optional().default([]),
  comments: z.string().optional().default(""),
})

// Helper function
const generateId = (prefix: string, data: any[]): string => {
  const maxId = data.reduce((max, item) => {
    const id = item[Object.keys(item)[0]]
    const num = parseInt(id.slice(prefix.length))
    return num > max ? num : max
  }, 0)

  return `${prefix}${String(maxId + 1).padStart(3, "0")}`
}

// Root route
app.get("/", (req: Request, res: Response) => {
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

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  console.log("🏥 Health check requested")
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  })
})

// Sites routes
app.get("/api/sites", (req: Request, res: Response) => {
  console.log(`✅ Returning ${sitesData.length} sites`)
  res.status(200).json(sitesData)
})

app.get("/api/sites/:site_id", (req: Request, res: Response) => {
  const { site_id } = req.params
  const site = sitesData.find((site) => site.site_id === site_id)

  if (!site) {
    return res.status(404).json({ error: "Site not found" })
  }

  console.log(`✅ Returning site: ${site.name}`)
  res.status(200).json(site)
})

app.post("/api/sites", (req: Request, res: Response) => {
  try {
    const validatedData = createSiteSchema.parse(req.body)
    const newId = generateId("S", sitesData)

    const newSite: Site = {
      site_id: newId,
      ...validatedData,
      instruments: validatedData.instruments || [],
      comments: validatedData.comments || "",
    }

    sitesData.push(newSite)
    console.log(`✅ Site created with ID: ${newSite.site_id}`)
    res.status(201).json(newSite)
  } catch (error: any) {
    console.log("❌ Validation failed:", error.errors)
    return res.status(400).json({
      error: "Validation failed",
      details: error.errors,
    })
  }
})

app.delete("/api/sites/:site_id", (req: Request, res: Response) => {
  const { site_id } = req.params
  const siteIndex = sitesData.findIndex((site) => site.site_id === site_id)

  if (siteIndex === -1) {
    return res.status(404).json({ error: "Site not found" })
  }

  const deletedSite = sitesData.splice(siteIndex, 1)[0]
  console.log(`✅ Site deleted: ${deletedSite.name}`)
  res.status(204).send()
})

// Instruments routes
app.get("/api/instruments", (req: Request, res: Response) => {
  console.log(`✅ Returning ${instrumentsData.length} instruments`)
  res.status(200).json(instrumentsData)
})

app.get("/api/instruments/:instrument_id", (req: Request, res: Response) => {
  const { instrument_id } = req.params
  const instrument = instrumentsData.find(
    (inst) => inst.instrument_id === instrument_id
  )

  if (!instrument) {
    return res.status(404).json({ error: "Instrument not found" })
  }

  console.log(`✅ Returning instrument: ${instrument.name}`)
  res.status(200).json(instrument)
})

// Applications routes
app.get("/api/applications", (req: Request, res: Response) => {
  console.log(`✅ Returning ${applicationsData.length} applications`)
  res.status(200).json(applicationsData)
})

app.get("/api/applications/:application_id", (req: Request, res: Response) => {
  const { application_id } = req.params
  const application = applicationsData.find(
    (app) => app.application_id === application_id
  )

  if (!application) {
    return res.status(404).json({ error: "Application not found" })
  }

  console.log(`✅ Returning application: ${application.application_name}`)
  res.status(200).json(application)
})

// 404 handler
app.use("*", (req: Request, res: Response) => {
  console.log(`❌ 404 - Route not found: ${req.method} ${req.originalUrl}`)
  res.status(404).json({
    error: "Route not found",
    message: `The route ${req.method} ${req.originalUrl} does not exist`,
  })
})

// Error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error("❌ Error occurred:", err)
  res.status(500).json({
    error: "Internal server error",
    message: "Something went wrong on the server",
  })
})

// Start server
app.listen(PORT, () => {
  console.log("🚀 ================================")
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`🚀 API URL: http://localhost:${PORT}/api`)
  console.log(`🚀 Health Check: http://localhost:${PORT}/api/health`)
  console.log("🚀 ================================")
  console.log("📝 Try these commands:")
  console.log(`   curl http://localhost:${PORT}/api/health`)
  console.log(`   curl http://localhost:${PORT}/api/sites`)
  console.log(`   curl http://localhost:${PORT}/api/instruments`)
  console.log(`   curl http://localhost:${PORT}/api/applications`)
  console.log("🚀 ================================")
})
