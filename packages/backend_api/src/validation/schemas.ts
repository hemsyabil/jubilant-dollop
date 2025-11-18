// Validation schemas using Zod
// Zod is a simple validation library that checks if incoming data is correct

import { z } from "zod"

// Schema for creating a new site
export const createSiteSchema = z.object({
  name: z.string().min(1, "Site name is required"),
  address: z.string().min(1, "Address is required"),
  server_location: z.string().min(1, "Server location is required"),
  btn_switch_port: z.string().min(1, "Switch port is required"),
  instruments: z.array(z.string()).optional().default([]),
  comments: z.string().optional().default(""),
})

// Schema for updating a site (all fields optional)
export const updateSiteSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  server_location: z.string().min(1).optional(),
  btn_switch_port: z.string().min(1).optional(),
  instruments: z.array(z.string()).optional(),
  comments: z.string().optional(),
})

// Schema for creating a new instrument
export const createInstrumentSchema = z.object({
  name: z.string().min(1, "Instrument name is required"),
  serial_number: z.string().min(1, "Serial number is required"),
  description: z.string().optional(),
  status: z.enum(["operational", "non-operational", "maintenance"]),
  service_contract: z.string().optional(),
  device_type: z.string().min(1, "Device type is required"),
  function: z.string().optional(),
  model: z.string().optional(),
  os_version: z.string().optional(),
  location: z.string().optional(),
  room: z.string().optional(),
  network_name: z.string().optional(),
  server_ip: z.string().optional(),
  server_ilo_ip: z.string().optional(),
  applications: z.array(z.string()).optional().default([]),
  login_info: z.string().optional(),
  config_file: z.string().optional(),
  comments: z.string().optional(),
})

// Schema for updating an instrument
export const updateInstrumentSchema = z.object({
  name: z.string().min(1).optional(),
  serial_number: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["operational", "non-operational", "maintenance"]).optional(),
  service_contract: z.string().optional(),
  device_type: z.string().min(1).optional(),
  function: z.string().optional(),
  model: z.string().optional(),
  os_version: z.string().optional(),
  location: z.string().optional(),
  room: z.string().optional(),
  network_name: z.string().optional(),
  server_ip: z.string().optional(),
  server_ilo_ip: z.string().optional(),
  applications: z.array(z.string()).optional(),
  login_info: z.string().optional(),
  config_file: z.string().optional(),
  comments: z.string().optional(),
})

// Schema for creating a new application
export const createApplicationSchema = z.object({
  application_name: z.string().min(1, "Application name is required"),
  vendor: z.string().min(1, "Vendor is required"),
  description: z.string().optional(),
  license_details: z.string().optional(),
  comments: z.string().optional(),
})

// Schema for updating an application
export const updateApplicationSchema = z.object({
  application_name: z.string().min(1).optional(),
  vendor: z.string().min(1).optional(),
  description: z.string().optional(),
  license_details: z.string().optional(),
  comments: z.string().optional(),
})
