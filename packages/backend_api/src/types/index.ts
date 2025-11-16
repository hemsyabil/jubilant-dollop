// TypeScript interfaces for all our data models
// This file defines the shape of our data - like a blueprint

export interface Site {
  site_id: string
  name: string
  address: string
  server_location: string
  btn_switch_port: string
  instruments: string[] // Array of instrument IDs
  comments: string
}

export interface Instrument {
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
  applications?: string[] // Array of application IDs
  login_info?: string
  config_file?: string
  comments?: string
}

export interface Application {
  application_id: string
  application_name: string
  vendor: string
  description?: string
  license_details?: string
  comments?: string
}

// Request types - what we expect when creating/updating
export interface CreateSiteRequest {
  name: string
  address: string
  server_location: string
  btn_switch_port: string
  instruments?: string[]
  comments?: string
}

export interface UpdateSiteRequest {
  name?: string
  address?: string
  server_location?: string
  btn_switch_port?: string
  instruments?: string[]
  comments?: string
}

export interface CreateInstrumentRequest {
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

export interface UpdateInstrumentRequest {
  name?: string
  serial_number?: string
  description?: string
  status?: "operational" | "non-operational" | "maintenance"
  service_contract?: string
  device_type?: string
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

export interface CreateApplicationRequest {
  application_name: string
  vendor: string
  description?: string
  license_details?: string
  comments?: string
}

export interface UpdateApplicationRequest {
  application_name?: string
  vendor?: string
  description?: string
  license_details?: string
  comments?: string
}
