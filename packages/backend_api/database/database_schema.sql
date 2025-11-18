-- Lookup Tables
CREATE TABLE statuses (
    status VARCHAR(50) PRIMARY KEY,
    description TEXT
);
COMMENT ON TABLE statuses IS 'Device status categories';
COMMENT ON COLUMN statuses.status IS 'Status';
COMMENT ON COLUMN statuses.description IS 'Description';

CREATE TABLE instrument_types (
    type VARCHAR(50) PRIMARY KEY,
    description TEXT
);
COMMENT ON TABLE instrument_types IS 'Instrument type categories';
COMMENT ON COLUMN instrument_types.type IS 'Instrument Type';
COMMENT ON COLUMN instrument_types.description IS 'Description';

CREATE TABLE functions (
    function VARCHAR(50) PRIMARY KEY,
    description TEXT
);
COMMENT ON TABLE functions IS 'Function categories';
COMMENT ON COLUMN functions.function IS 'Function';
COMMENT ON COLUMN functions.description IS 'Description';

CREATE TABLE networks (
    network_name VARCHAR(50) PRIMARY KEY,
    description TEXT
);
COMMENT ON TABLE networks IS 'Network categories';
COMMENT ON COLUMN networks.network_name IS 'Network Name';
COMMENT ON COLUMN networks.description IS 'Description';

CREATE TABLE site_codes (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(255)
);
COMMENT ON TABLE site_codes IS 'Site code categories';
COMMENT ON COLUMN site_codes.code IS 'Site Code';
COMMENT ON COLUMN site_codes.name IS 'Name';

-- Main Tables

CREATE TABLE sites (
    site_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    site_code VARCHAR(10) REFERENCES site_codes(code) ON DELETE SET NULL,
    server_location VARCHAR(255),
    btn_switch_port VARCHAR(50),
    comments TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100)
);
COMMENT ON TABLE sites IS 'Sites where instruments are located';
COMMENT ON COLUMN sites.site_id IS 'Site ID';
COMMENT ON COLUMN sites.name IS 'Site Name';
COMMENT ON COLUMN sites.address IS 'Full Address';
COMMENT ON COLUMN sites.site_code IS 'Site Code';
COMMENT ON COLUMN sites.server_location IS 'Server Room Location';
COMMENT ON COLUMN sites.btn_switch_port IS 'BTN Switch Port';
COMMENT ON COLUMN sites.comments IS 'General Comments/Notes';
COMMENT ON COLUMN sites.created_at IS 'Creation timestamp';
COMMENT ON COLUMN sites.created_by IS 'Created by user';
COMMENT ON COLUMN sites.updated_at IS 'Update timestamp';
COMMENT ON COLUMN sites.updated_by IS 'Updated by user';

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
    site_id INTEGER REFERENCES sites(site_id) ON DELETE CASCADE,
    room VARCHAR(50),
    network_name VARCHAR(50) REFERENCES networks(network_name) ON DELETE SET NULL,
    server_ip INET,
    server_ilo_ip INET,
    login_info TEXT,
    config_file TEXT,
    comments TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100)
);
COMMENT ON TABLE instruments IS 'Instruments on location';
COMMENT ON COLUMN instruments.instrument_id IS 'Instrument ID';
COMMENT ON COLUMN instruments.name IS 'Instrument Name';
COMMENT ON COLUMN instruments.serial_number IS 'Serial Number';
COMMENT ON COLUMN instruments.description IS 'Description';
COMMENT ON COLUMN instruments.status IS 'Device Status';
COMMENT ON COLUMN instruments.service_contract IS 'Service Contract Details';
COMMENT ON COLUMN instruments.device_type IS 'Instrument Type';
COMMENT ON COLUMN instruments.function IS 'Function';
COMMENT ON COLUMN instruments.model IS 'Model';
COMMENT ON COLUMN instruments.os_version IS 'OS Version';
COMMENT ON COLUMN instruments.site_id IS 'Site ID';
COMMENT ON COLUMN instruments.room IS 'Room';
COMMENT ON COLUMN instruments.network_name IS 'Network Name';
COMMENT ON COLUMN instruments.server_ip IS 'Server IP Address';
COMMENT ON COLUMN instruments.server_ilo_ip IS 'Server iLO IP Address';
COMMENT ON COLUMN instruments.login_info IS 'Login Information Notes';
COMMENT ON COLUMN instruments.config_file IS 'Configuration File Details/Path';
COMMENT ON COLUMN instruments.comments IS 'General Comments/Notes';
COMMENT ON COLUMN instruments.created_at IS 'Creation timestamp';
COMMENT ON COLUMN instruments.created_by IS 'Created by user';
COMMENT ON COLUMN instruments.updated_at IS 'Update timestamp';
COMMENT ON COLUMN instruments.updated_by IS 'Updated by user';

CREATE TABLE applications (
    application_id VARCHAR(100) PRIMARY KEY,  -- usually the license/serial string
    application_name VARCHAR(255) NOT NULL,
    vendor VARCHAR(255),
    description TEXT,
    instrument_id INTEGER REFERENCES instruments(instrument_id) ON DELETE CASCADE,
    license_details TEXT,
    comments TEXT,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100)
);
COMMENT ON TABLE applications IS 'Installed Applications';
COMMENT ON COLUMN applications.application_id IS 'Serial Number (Application ID)';
COMMENT ON COLUMN applications.application_name IS 'Application Name';
COMMENT ON COLUMN applications.vendor IS 'Vendor/Publisher';
COMMENT ON COLUMN applications.description IS 'Description';
COMMENT ON COLUMN applications.instrument_id IS 'Underlying instrument';
COMMENT ON COLUMN applications.license_details IS 'License Information';
COMMENT ON COLUMN applications.comments IS 'General Comments/Notes';
COMMENT ON COLUMN applications.created_at IS 'Creation timestamp';
COMMENT ON COLUMN applications.created_by IS 'Created by user';
COMMENT ON COLUMN applications.updated_at IS 'Update timestamp';
COMMENT ON COLUMN applications.updated_by IS 'Updated by user';

CREATE TABLE ipam_subnets (
    subnet_id SERIAL PRIMARY KEY,
    subnet_cidr CIDR NOT NULL UNIQUE,           -- e.g. 7.29.252.0/24
    subnet_name VARCHAR(255) NOT NULL,
    description TEXT,
    network_name VARCHAR(50) REFERENCES networks(network_name) ON DELETE SET NULL,
    vlan INTEGER,
    gateway INET,
    size INTEGER NOT NULL 
        GENERATED ALWAYS AS (2^(32 - masklen(subnet_cidr)) - 2) STORED,  -- usable hosts for IPv4
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100)
);
COMMENT ON TABLE ipam_subnets IS 'IPAM Subnets';
COMMENT ON COLUMN ipam_subnets.subnet_id IS 'Subnet ID';
COMMENT ON COLUMN ipam_subnets.subnet_cidr IS 'Subnet CIDR';
COMMENT ON COLUMN ipam_subnets.subnet_name IS 'Subnet Name';
COMMENT ON COLUMN ipam_subnets.description IS 'Description';
COMMENT ON COLUMN ipam_subnets.network_name IS 'Associated Network';
COMMENT ON COLUMN ipam_subnets.vlan IS 'VLAN ID';
COMMENT ON COLUMN ipam_subnets.gateway IS 'Gateway IP Address';
COMMENT ON COLUMN ipam_subnets.size IS 'Size (usable hosts)';
COMMENT ON COLUMN ipam_subnets.created_at IS 'Creation timestamp';
COMMENT ON COLUMN ipam_subnets.created_by IS 'Created by user';
COMMENT ON COLUMN ipam_subnets.updated_at IS 'Update timestamp';
COMMENT ON COLUMN ipam_subnets.updated_by IS 'Updated by user';

CREATE TABLE ipam_addresses (
    ip_address INET PRIMARY KEY,
    subnet_cidr CIDR NOT NULL REFERENCES ipam_subnets(subnet_cidr) ON DELETE CASCADE,
    
    object_name VARCHAR(255),           -- e.g. server name, switch, printer
    description TEXT,
    key_information TEXT,
    additional_comments TEXT,
    dns_name VARCHAR(255),
    status VARCHAR(50),
    
    instrument_id INTEGER REFERENCES instruments(instrument_id) ON DELETE SET NULL,
    site_id INTEGER REFERENCES sites(site_id) ON DELETE SET NULL,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    created_by VARCHAR(100),
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100),

    CONSTRAINT chk_ip_belongs_to_subnet 
        CHECK (ip_address << subnet_cidr)
);
COMMENT ON TABLE ipam_addresses IS 'IPAM Addresses';
COMMENT ON COLUMN ipam_addresses.ip_address IS 'IP Address';
COMMENT ON COLUMN ipam_addresses.subnet_cidr IS 'Subnet CIDR';
COMMENT ON COLUMN ipam_addresses.object_name IS 'Object Name';
COMMENT ON COLUMN ipam_addresses.description IS 'Description';
COMMENT ON COLUMN ipam_addresses.key_information IS 'Key Information';
COMMENT ON COLUMN ipam_addresses.additional_comments IS 'Additional Comments';
COMMENT ON COLUMN ipam_addresses.dns_name IS 'DNS Name';
COMMENT ON COLUMN ipam_addresses.status IS 'IP Status (e.g., assigned, reserved)';
COMMENT ON COLUMN ipam_addresses.instrument_id IS 'Instrument ID';
COMMENT ON COLUMN ipam_addresses.site_id IS 'Site ID';
COMMENT ON COLUMN ipam_addresses.created_at IS 'Creation timestamp';
COMMENT ON COLUMN ipam_addresses.created_by IS 'Created by user';
COMMENT ON COLUMN ipam_addresses.updated_at IS 'Update timestamp';
COMMENT ON COLUMN ipam_addresses.updated_by IS 'Updated by user';

-- Trigger Function

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create Triggers for All Tables
DO $$
DECLARE
    t text;
BEGIN
    FOREACH t IN ARRAY ARRAY['sites','instruments','applications','ipam_subnets','ipam_addresses']
    LOOP
        EXECUTE format('
            DROP TRIGGER IF EXISTS trg_%I_updated ON %I;
            CREATE TRIGGER trg_%I_updated
                BEFORE UPDATE ON %I
                FOR EACH ROW
                EXECUTE FUNCTION trigger_set_timestamp();
        ', t, t, t, t);
    END LOOP;
END $$;

-- Views

CREATE OR REPLACE VIEW v_ipam_subnet_overview AS
SELECT 
    subnet_cidr::text AS subnet_address,
    subnet_name,
    size,
    COALESCE(COUNT(a.ip_address), 0) AS used,
    size - COALESCE(COUNT(a.ip_address), 0) AS available,
    ROUND(100.0 * COALESCE(COUNT(a.ip_address), 0) / NULLIF(size, 0), 2) AS usage_percent,
    updated_at,
    updated_by
FROM ipam_subnets s
LEFT JOIN ipam_addresses a ON a.subnet_cidr = s.subnet_cidr
GROUP BY subnet_id, subnet_cidr, subnet_name, size, updated_at, updated_by
ORDER BY subnet_cidr;
COMMENT ON VIEW v_ipam_subnet_overview IS 'Overview of subnet usage';

CREATE OR REPLACE VIEW v_ipam_ip_details AS
SELECT 
    a.ip_address::text AS ip_address,
    a.subnet_cidr::text AS subnet_address,
    COALESCE(a.object_name, i.name, 'Available') AS object_name,
    COALESCE(a.description, '') AS description,
    COALESCE(a.key_information, '') AS key_information,
    COALESCE(a.additional_comments, '') AS additional_comments,
    a.updated_at,
    a.updated_by
FROM ipam_addresses a
LEFT JOIN instruments i ON i.instrument_id = a.instrument_id
ORDER BY a.ip_address;
COMMENT ON VIEW v_ipam_ip_details IS 'Details of assigned IP addresses';

-- Indexes

CREATE INDEX idx_instruments_site_id        ON instruments(site_id);
CREATE INDEX idx_instruments_status         ON instruments(status);
CREATE INDEX idx_instruments_device_type    ON instruments(device_type);
CREATE INDEX idx_instruments_network_name   ON instruments(network_name);
CREATE INDEX idx_instruments_server_ip       ON instruments(server_ip);
CREATE INDEX idx_instruments_server_ilo_ip  ON instruments(server_ilo_ip);

CREATE INDEX idx_applications_instrument_id ON applications(instrument_id);

CREATE INDEX idx_ipam_addresses_subnet      ON ipam_addresses(subnet_cidr);
CREATE INDEX idx_ipam_addresses_instrument  ON ipam_addresses(instrument_id);
CREATE INDEX idx_ipam_addresses_site        ON ipam_addresses(site_id);
CREATE INDEX idx_ipam_addresses_object_name ON ipam_addresses(object_name);

-- Additional Indexes for New Fields
CREATE INDEX idx_ipam_subnets_network_name ON ipam_subnets(network_name);
CREATE INDEX idx_ipam_addresses_dns_name   ON ipam_addresses(dns_name);
CREATE INDEX idx_ipam_addresses_status     ON ipam_addresses(status);
