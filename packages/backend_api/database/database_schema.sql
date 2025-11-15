-- Lookup table for statuses
CREATE TABLE statuses (
    status VARCHAR(50) PRIMARY KEY,
    description TEXT
);

-- Lookup table for instrument types
CREATE TABLE instrument_types (
    type VARCHAR(50) PRIMARY KEY,
    description TEXT
);

-- Lookup table for functions
CREATE TABLE functions (
    function VARCHAR(50) PRIMARY KEY,
    description TEXT
);

-- Lookup table for networks
CREATE TABLE networks (
    network_name VARCHAR(50) PRIMARY KEY,
    description TEXT
);

-- Lookup table for site codes
CREATE TABLE site_codes (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255)
);

-- Main table for sites
CREATE TABLE sites (
    site_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    site_code VARCHAR(10) REFERENCES site_codes(code) ON DELETE SET NULL,
    server_location VARCHAR(255),
    btn_switch_port VARCHAR(50),
    comments TEXT
);

-- Main table for instruments (one-to-many with sites)
CREATE TABLE instruments (
    instrument_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    serial_number VARCHAR(100) UNIQUE,
    description TEXT,
    status VARCHAR(50) REFERENCES statuses(status) ON DELETE SET NULL,
    service_contract TEXT,
    device_type VARCHAR(50) REFERENCES instrument_types(type) ON DELETE SET NULL,
    function VARCHAR(50) REFERENCES functions(function) ON DELETE SET NULL,
    model VARCHAR(100),
    os_version VARCHAR(50),
    site_id INTEGER REFERENCES sites(site_id) ON DELETE CASCADE,  -- Parent site
    room VARCHAR(50),
    network_name VARCHAR(50) REFERENCES networks(network_name) ON DELETE SET NULL,
    server_ip INET,
    server_ilo_ip INET,
    login_info TEXT,
    config_file TEXT,
    comments TEXT
);

-- Main table for applications (one-to-many with instruments)
CREATE TABLE applications (
    application_id VARCHAR(100) PRIMARY KEY,  -- Treated as serial number string for uniqueness
    application_name VARCHAR(255) NOT NULL,
    vendor VARCHAR(255),
    description TEXT,
    instrument_id INTEGER REFERENCES instruments(instrument_id) ON DELETE CASCADE,  -- Parent instrument
    license_details TEXT,
    comments TEXT
);

-- Table for IP list (assuming it's a separate inventory for IPs, with potential reference to networks)
CREATE TABLE ip_list (
    ip_address INET PRIMARY KEY,
    gateway_address INET,
    group_name VARCHAR(50),
    network VARCHAR(50) REFERENCES networks(network_name) ON DELETE SET NULL
);

-- Indexes for efficient querying (e.g., for foreign keys and common search fields)
CREATE INDEX idx_instruments_site_id ON instruments(site_id);
CREATE INDEX idx_instruments_status ON instruments(status);
CREATE INDEX idx_instruments_device_type ON instruments(device_type);
CREATE INDEX idx_instruments_network_name ON instruments(network_name);
CREATE INDEX idx_applications_instrument_id ON applications(instrument_id);
CREATE INDEX idx_sites_site_code ON sites(site_code);
CREATE INDEX idx_ip_list_network ON ip_list(network);