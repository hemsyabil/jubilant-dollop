// Mock data - this acts as our "database" for now
// In a real app, this would be replaced with actual database calls

import { Site, Instrument, Application } from "../types"

// Sample Sites Data
export const sitesData: Site[] = [
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

// Sample Instruments Data
export const instrumentsData: Instrument[] = [
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
  {
    instrument_id: "INS002",
    name: "Cisco Switch 2960",
    serial_number: "SN-78234",
    description: "Network switch for lab connectivity",
    status: "operational",
    device_type: "switch",
    function: "networking",
    model: "Catalyst 2960",
    location: "National Research Lab",
    room: "204B",
    server_ip: "10.0.0.10",
    comments: "Main lab switch",
  },
]

// Sample Applications Data
export const applicationsData: Application[] = [
  {
    application_id: "APP001",
    application_name: "Microsoft SQL Server",
    vendor: "Microsoft",
    description: "Database management system",
    license_details: "Volume License - 2025",
    comments: "Used for internal databases",
  },
  {
    application_id: "APP002",
    application_name: "VMware vSphere",
    vendor: "VMware",
    description: "Virtualization management platform",
    license_details: "Enterprise License 2025",
    comments: "Installed on server cluster",
  },
  {
    application_id: "APP003",
    application_name: "Windows Server",
    vendor: "Microsoft",
    description: "Server operating system",
    license_details: "Standard License 2025",
    comments: "Base OS for servers",
  },
]

// Helper function to generate new IDs
export const generateId = (prefix: string, data: any[]): string => {
  const maxId = data.reduce((max, item) => {
    const id = item[Object.keys(item)[0]] // Get the first property (ID field)
    const num = parseInt(id.slice(prefix.length))
    return num > max ? num : max
  }, 0)

  return `${prefix}${String(maxId + 1).padStart(3, "0")}`
}
