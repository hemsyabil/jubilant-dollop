-- Sample Data Insertion Script for Inventory Database
-- This script inserts sample data into all tables, ensuring foreign key constraints are satisfied.
-- Run this after creating the tables from the schema.

-- Insert into lookup tables first

-- statuses
INSERT INTO statuses
    (status, description)
VALUES
    ('operational', 'The device is fully functional and in use'),
    ('not configured', 'The device is installed but not yet set up for use'),
    ('idle', 'The device is functional but currently not in use'),
    ('non-operational', 'The device is broken or out of service'),
    ('discontinued', 'The device is no longer supported or used');

-- instrument_types
INSERT INTO instrument_types
    (type, description)
VALUES
    ('server', 'Server'),
    ('fortigate', 'Firewall/Security Appliance'),
    ('backup_unit', 'Backup'),
    ('switch', 'Network Switch'),
    ('ups', 'Uninterruptible Power Supply');

-- functions
INSERT INTO functions
    (function, description)
VALUES
    ('dhcp', 'Dynamic Host Configuration Protocol server role'),
    ('dns', 'Domain Name System server role'),
    ('wsus', 'Windows Server Update Service server role'),
    ('backup', 'Provides data backup services'),
    ('vm', 'Hosts virtual machines'),
    ('san', 'Storage Area Network device'),
    ('ups', 'Uninterruptible Power Supply unit'),
    ('xenapp', 'Hosts Citrix XenApp services');

-- networks
INSERT INTO networks
    (network_name, description)
VALUES
    ('omega', 'Omega Network'),
    ('lssd', 'LSSD Network'),
    ('btn', 'BTN Network'),
    ('internet', 'Internet Network'),
    ('ece', 'ECE Network');

-- site_codes
INSERT INTO site_codes
    (code, name)
VALUES
    ('H012', 'Headquarters - Varnier Tower'),
    ('H011', 'Engineering Lab'),
    ('S001', 'Satellite Office 1'),
    ('S002', 'Satellite Office 2');

-- Now insert into main tables

-- sites
INSERT INTO sites
    (name, address, site_code, server_location, btn_switch_port, comments, created_by, updated_by)
VALUES
    ('Headquarters', '123 Main St, City A, State X 12345', 'H012', 'Room 101', 'Port 1', 'Main HQ site', 'admin', 'admin'),
    ('Engineering Lab', '456 Tech Ave, City B, State Y 67890', 'H011', 'Lab 5', 'Port 2', 'R&D facility', 'admin', 'admin'),
    ('Satellite Office 1', '789 Remote Rd, City C, State Z 11223', 'S001', 'Server Closet', 'Port 3', 'Remote operations', 'admin', 'admin');

-- instruments (linked to sites)
INSERT INTO instruments
    (name, serial_number, description, status, service_contract, device_type, function, model, os_version, site_id, room, network_name, server_ip, server_ilo_ip, login_info, config_file, comments, created_by, updated_by)
VALUES
    ('Server1', 'SN12345', 'Main application server', 'operational', 'Contract until 2025', 'server', 'vm', 'Dell PowerEdge', 'Windows Server 2019', 1, 'Room 101', 'omega', '192.168.1.10', '192.168.1.11', 'admin/password', '/etc/config/server.conf', 'Critical server', 'admin', 'admin'),
    ('Firewall1', 'SN67890', 'Network firewall', 'operational', 'Extended warranty', 'fortigate', 'dns', 'FortiGate 60E', 'FortiOS 6.4', 1, 'Room 101', 'btn', '192.168.2.1', NULL, 'fwadmin/pass', '/config/firewall.cfg', 'Security appliance', 'admin', 'admin'),
    ('BackupUnit1', 'SN11223', 'Data backup device', 'idle', 'No contract', 'backup_unit', 'backup', 'Veeam Backup', 'V1.0', 2, 'Lab 5', 'lssd', '192.168.3.5', NULL, 'backupuser/secret', '/backup/config.json', 'For lab backups', 'admin', 'admin'),
    ('Switch1', 'SN44556', 'Network switch', 'operational', 'Contract 2024-2026', 'switch', 'dhcp', 'Cisco Catalyst', 'IOS 15.2', 3, 'Server Closet', 'internet', '192.168.4.2', NULL, 'netadmin/pass', '/config/switch.conf', 'Core switch', 'admin', 'admin'),
    ('UPS1', 'SN77889', 'Power supply backup', 'operational', 'Annual maintenance', 'ups', 'ups', 'APC Smart-UPS', 'Firmware 3.0', 1, 'Room 101', 'ece', '192.168.5.3', NULL, 'upsadmin/power', '/ups/config.ini', 'Power protection', 'admin', 'admin');

-- applications (linked to instruments)
INSERT INTO applications
    (application_id, application_name, vendor, description, instrument_id, license_details, comments, created_by, updated_by)
VALUES
    ('APP001', 'Microsoft Office', 'Microsoft', 'Productivity suite', 1, 'Enterprise license', 'Installed on Server1', 'admin', 'admin'),
    ('APP002', 'Antivirus Software', 'Symantec', 'Security software', 1, 'Annual subscription', 'Endpoint protection', 'admin', 'admin'),
    ('APP003', 'Database Server', 'Oracle', 'DBMS', 2, 'Perpetual license', 'For firewall logs', 'admin', 'admin'),
    ('APP004', 'Backup Software', 'Veeam', 'Backup tool', 3, 'Free edition', 'Basic backups', 'admin', 'admin'),
    ('APP005', 'Network Monitor', 'SolarWinds', 'Monitoring tool', 4, 'Trial license', 'Network oversight', 'admin', 'admin');

-- ipam_subnets
INSERT INTO ipam_subnets
    (subnet_cidr, subnet_name, description, network_name, vlan, gateway, created_by, updated_by)
VALUES
    ('192.168.1.0/24', 'HQ Servers', 'Server subnet at HQ', 'omega', 100, '192.168.1.1', 'admin', 'admin'),
    ('192.168.2.0/24', 'Security Devices', 'Firewall and security', 'btn', 200, '192.168.2.1', 'admin', 'admin'),
    ('192.168.3.0/24', 'Lab Network', 'Engineering lab subnet', 'lssd', 300, '192.168.3.1', 'admin', 'admin'),
    ('192.168.4.0/24', 'Remote Office', 'Satellite office subnet', 'internet', 400, '192.168.4.1', 'admin', 'admin'),
    ('192.168.5.0/24', 'Power Systems', 'UPS and power devices', 'ece', 500, '192.168.5.1', 'admin', 'admin');

-- ipam_addresses (linked to subnets, instruments, sites)
INSERT INTO ipam_addresses
    (ip_address, subnet_cidr, object_name, description, key_information, additional_comments, dns_name, status, instrument_id, site_id, created_by, updated_by)
VALUES
    ('192.168.1.10', '192.168.1.0/24', 'Server1', 'Main server IP', 'Primary IP', 'Assigned to HQ server', 'server1.hq.local', 'assigned', 1, 1, 'admin', 'admin'),
    ('192.168.1.11', '192.168.1.0/24', 'Server1 iLO', 'Management IP', 'iLO interface', 'For remote management', 'ilo-server1.hq.local', 'assigned', 1, 1, 'admin', 'admin'),
    ('192.168.2.1', '192.168.2.0/24', 'Firewall1', 'Firewall IP', 'Gateway IP', 'Security gateway', 'firewall1.hq.local', 'assigned', 2, 1, 'admin', 'admin'),
    ('192.168.3.5', '192.168.3.0/24', 'BackupUnit1', 'Backup device IP', 'Backup server', 'Lab backups', 'backup1.lab.local', 'assigned', 3, 2, 'admin', 'admin'),
    ('192.168.4.2', '192.168.4.0/24', 'Switch1', 'Switch management IP', 'Core switch', 'Remote office', 'switch1.remote.local', 'assigned', 4, 3, 'admin', 'admin'),
    ('192.168.5.3', '192.168.5.0/24', 'UPS1', 'UPS IP', 'Power backup', 'HQ power', 'ups1.hq.local', 'assigned', 5, 1, 'admin', 'admin'),
    ('192.168.1.20', '192.168.1.0/24', 'Reserved IP', 'Reserved for future server', 'Reserved', 'Not in use yet', NULL, 'reserved', NULL, 1, 'admin', 'admin'),
    ('192.168.2.10', '192.168.2.0/24', 'Printer1', 'Network printer', 'Office printer', 'Shared device', 'printer1.hq.local', 'assigned', NULL, 1, 'admin', 'admin');