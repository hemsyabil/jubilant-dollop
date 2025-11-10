# 🧭 API Endpoint Reference

This document provides detailed information about all available API endpoints.  
All endpoints return data in **JSON** format unless otherwise stated.

---

## 🌐 Sites

### **GET /sites**
Retrieves a list of all sites in the system.  
**Response:** JSON array of site objects.

---

### **/sites/{site_id}**
Operations available:
- **GET** – Retrieve detailed information for a specific site.  
- **POST** – Add a new site.  
- **PUT** – Edit an existing site.  
- **DELETE** – Remove a site.

**Response:** Site metadata, address, and associated resources.

---

### **GET /sites/{site_id}/instruments**
Lists all instruments associated with a specific site.  
**Response:** JSON array of instruments at that site.

---

### **/sites/{site_id}/instruments/{instrument_id}**
Operations available:
- **GET** – Retrieve detailed information about a specific instrument.  
- **POST** – Add a new instrument under the site.  
- **PUT** – Update instrument information.  
- **DELETE** – Remove the instrument from the site.

**Response:** Instrument details, configuration, and status.

---

### **GET /sites/{site_id}/instruments/{instrument_id}/applications**
Lists all applications linked to a specific instrument at a site.  
**Response:** JSON array of application objects.

---

### **/sites/{site_id}/instruments/{instrument_id}/applications/{application_id}**
Operations available:
- **GET** – Retrieve details of a specific application.  
- **POST** – Add a new application under the instrument.  
- **PUT** – Edit existing application details.  
- **DELETE** – Remove the application.

**Response:** Application details such as version, dependencies, and status.

---

## 🧪 Instruments

### **GET /instruments**
Retrieves a list of all instruments in the system.  
**Response:** JSON array of instruments with summary information.

---

### **/instruments/{instrument_id}**
Operations available:
- **GET** – Retrieve detailed information about a specific instrument.  
- **POST** – Add a new instrument.  
- **PUT** – Edit existing instrument details.  
- **DELETE** – Remove the instrument.

**Response:** Instrument configuration, associated site(s), and metadata.

---

### **GET /instruments/{instrument_id}/applications**
Lists all applications associated with a specific instrument.  
**Response:** JSON array of applications.

---

### **/instruments/{instrument_id}/applications/{application_id}**
Operations available:
- **GET** – Retrieve details about a specific application.  
- **POST** – Add a new application.  
- **PUT** – Edit application details.  
- **DELETE** – Remove application.

**Response:** Application configuration and versioning details.

---

## 💻 Applications

### **GET /applications**
Retrieves a list of all applications in the system.  
**Response:** JSON array of applications.

---

### **/applications/{application_id}**
Operations available:
- **GET** – Retrieve detailed information about a specific application.  
- **POST** – Add a new application.  
- **PUT** – Edit application details.

**Response:** Application metadata, version, and linked instruments.

---

## 🌐 Network & Infrastructure

### **/ip_lists**
Operations available:
- **GET** – Retrieve a list of all IP addresses.  
- **POST** – Add a new IP entry.  
- **PUT** – Edit existing IP information.  
- **DELETE** – Remove an IP entry.

**Response:** JSON array of IPs (site, device, and type).

---

### **GET /ups**
Retrieves a list of all UPS (Uninterruptible Power Supply) units.  
**Response:** JSON array with UPS details such as model, capacity, and location.

---

### **GET /fortigates**
Retrieves a list of all Fortigate firewall devices.  
**Response:** JSON array with configuration and status information.

---

### **GET /servers**
Retrieves a list of all servers.  
**Response:** JSON array with server details (hostname, IP, OS, and status).

---

### **GET /backup_units**
Retrieves a list of all backup units.  
**Response:** JSON array with backup system information and storage details.

---

### **GET /switches**
Retrieves a list of all network switches.  
**Response:** JSON array with switch configuration and port information.

---

## ⚙️ System Monitoring

### **GET /active_servers**
Retrieves a list of all currently active servers.  
**Response:** JSON array of active servers.

---

### **GET /firewalls_online**
Retrieves a list of all online Fortigate firewalls.  
**Response:** JSON array of firewalls with uptime and status.

---

## ✅ Summary Table

| Category | Endpoint | Description | Methods |
|-----------|-----------|-------------|----------|
| **Sites** | `/sites` | List all sites | GET |
|  | `/sites/{site_id}` | Site details | GET, POST, PUT, DELETE |
|  | `/sites/{site_id}/instruments` | Instruments at a site | GET |
|  | `/sites/{site_id}/instruments/{instrument_id}` | Instrument details | GET, POST, PUT, DELETE |
|  | `/sites/{site_id}/instruments/{instrument_id}/applications` | Applications under instrument | GET |
|  | `/sites/{site_id}/instruments/{instrument_id}/applications/{application_id}` | Application details | GET, POST, PUT, DELETE |
| **Instruments** | `/instruments` | List all instruments | GET |
|  | `/instruments/{instrument_id}` | Instrument details | GET, POST, PUT, DELETE |
|  | `/instruments/{instrument_id}/applications` | Applications linked to instrument | GET |
|  | `/instruments/{instrument_id}/applications/{application_id}` | Application details | GET, POST, PUT, DELETE |
| **Applications** | `/applications` | List all applications | GET |
|  | `/applications/{application_id}` | Application details | GET, POST, PUT |
| **Infrastructure** | `/ip_lists` | IP address list | GET, POST, PUT, DELETE |
|  | `/ups` | UPS units | GET |
|  | `/fortigates` | Fortigate firewalls | GET |
|  | `/servers` | Servers | GET |
|  | `/backup_units` | Backup units | GET |
|  | `/switches` | Network switches | GET |
| **Monitoring** | `/active_servers` | Active servers | GET |
|  | `/firewalls_online` | Online firewalls | GET |

---

**Base URL:**  
