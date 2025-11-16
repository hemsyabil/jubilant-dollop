# Lab Management API

A simple Node.js backend API built with TypeScript and Express for managing laboratory sites, instruments, and applications. This project is designed to be beginner-friendly and easy to understand.

## ⚡ Quick Summary for Postman Testing

**🎯 TL;DR: For your friend to test in Postman:**

1. Run: `npm run dev` (uses the simple server - guaranteed to work!)
2. Test: `http://localhost:3000/api/health` in Postman
3. Use base URL: `http://localhost:3000/api` for all endpoints

**✅ Working endpoints:** `/sites`, `/instruments`, `/applications`

---

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Navigate to the backend directory:**

   ```bash
   cd packages/backend_api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   **Note:** This will start `simple-server.ts` which has everything in one file and is guaranteed to work!

4. **Your API is now running at:**

   ```
   http://localhost:3000
   ```

### Alternative Server Options

**For Beginners (Recommended):**

```bash
npm run dev          # Uses simple-server.ts with auto-restart
npm run dev:ts-node  # Uses simple-server.ts directly
```

**For Advanced Users:**

```bash
npm run dev:modular  # Uses modular structure (may have import issues)
```

## 📁 Project Structure

### Two Server Options Available

**1. Simple Server (Recommended for Beginners):**

```
src/
├── simple-server.ts     # 🟢 EVERYTHING IN ONE FILE (USE THIS!)
```

**2. Modular Server (Advanced):**

```
src/
├── controllers/          # Handle HTTP requests and responses
│   ├── siteController.ts
│   ├── instrumentController.ts
│   └── applicationController.ts
├── data/                 # Mock data (acts as our database)
│   └── mockData.ts
├── middleware/           # Functions that run between request and response
│   ├── logging.ts        # Logs requests and handles errors
│   └── validation.ts     # Validates incoming data
├── routes/               # Define URL endpoints
│   ├── index.ts          # Main routes file
│   ├── siteRoutes.ts
│   ├── instrumentRoutes.ts
│   └── applicationRoutes.ts
├── services/             # Business logic
│   ├── siteService.ts
│   ├── instrumentService.ts
│   └── applicationService.ts
├── types/                # TypeScript interfaces
│   └── index.ts
├── validation/           # Data validation schemas
│   └── schemas.ts
└── index.ts              # Main server file
```

## 🛣️ API Endpoints

### Health Check

- `GET /api/health` - Check if server is running

### Sites

- `GET /api/sites` - Get all sites
- `GET /api/sites/{site_id}` - Get specific site
- `POST /api/sites` - Create new site
- `PUT /api/sites/{site_id}` - Update site
- `DELETE /api/sites/{site_id}` - Delete site

### Instruments

- `GET /api/instruments` - Get all instruments
- `GET /api/instruments/{instrument_id}` - Get specific instrument
- `POST /api/instruments` - Create new instrument
- `PUT /api/instruments/{instrument_id}` - Update instrument
- `DELETE /api/instruments/{instrument_id}` - Delete instrument

### Applications

- `GET /api/applications` - Get all applications
- `GET /api/applications/{application_id}` - Get specific application
- `POST /api/applications` - Create new application
- `PUT /api/applications/{application_id}` - Update application
- `DELETE /api/applications/{application_id}` - Delete application

## 🧪 Testing with Postman

### ⚠️ IMPORTANT: Which Server to Use

**For Postman testing, use the SIMPLE SERVER:**

1. **Start the server:**

   ```bash
   npm run dev
   ```

   This automatically uses `simple-server.ts` which is guaranteed to work!

2. **Verify server is running:**
   Look for this output:

   ```
   🚀 Server is running on port 3000
   🚀 API URL: http://localhost:3000/api
   ```

3. **If the server doesn't start, try:**

   ```bash
   npm run dev:ts-node
   ```

### 1. Setup Postman Collection

Create a new collection called "Lab Management API" and set the base URL as a variable:

- Variable name: `baseUrl`
- Value: `http://localhost:3000/api`

### 2. Test Basic Connectivity

**Health Check:**

```http
GET {{baseUrl}}/health
```

Expected Response: Status 200 with server status information.

### 3. Test Sites Endpoints

**Get All Sites:**

```
GET {{baseUrl}}/sites
```

**Get Specific Site:**

```
GET {{baseUrl}}/sites/S001
```

**Create New Site:**

```
POST {{baseUrl}}/sites
Content-Type: application/json

{
  "name": "New Research Center",
  "address": "789 Tech Blvd, Montreal, QC, Canada",
  "server_location": "Room 12A",
  "btn_switch_port": "Port-05",
  "instruments": [],
  "comments": "Recently established"
}
```

**Update Site:**

```
PUT {{baseUrl}}/sites/S001
Content-Type: application/json

{
  "btn_switch_port": "Port-09",
  "comments": "Updated after network reconfiguration"
}
```

**Delete Site:**

```
DELETE {{baseUrl}}/sites/S001
```

### 4. Test Instruments Endpoints

**Get All Instruments:**

```
GET {{baseUrl}}/instruments
```

**Create New Instrument:**

```
POST {{baseUrl}}/instruments
Content-Type: application/json

{
  "name": "FortiGate 100E",
  "serial_number": "FGT-2025001",
  "status": "operational",
  "device_type": "fortigate",
  "function": "firewall",
  "location": "Satellite Office",
  "server_ip": "172.16.10.1"
}
```

**Update Instrument:**

```
PUT {{baseUrl}}/instruments/INS001
Content-Type: application/json

{
  "status": "non-operational",
  "comments": "Device sent for repair"
}
```

### 5. Test Applications Endpoints

**Get All Applications:**

```
GET {{baseUrl}}/applications
```

**Create New Application:**

```
POST {{baseUrl}}/applications
Content-Type: application/json

{
  "application_name": "VMware vSphere",
  "vendor": "VMware",
  "description": "Virtualization management platform",
  "license_details": "Enterprise License 2025",
  "comments": "Installed on server cluster"
}
```

## 📝 Expected HTTP Status Codes

- **200 OK** - Successful GET requests
- **201 Created** - Successful POST requests (resource created)
- **204 No Content** - Successful DELETE requests
- **400 Bad Request** - Validation errors or malformed requests
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server errors

## 🔍 Understanding the Code

### How Data Flows

1. **Request** comes in (e.g., GET /api/sites)
2. **Middleware** logs the request and validates data (if needed)
3. **Router** directs the request to the right controller
4. **Controller** calls the appropriate service method
5. **Service** handles business logic and data operations
6. **Response** is sent back to the client

### Key Files Explained

**`src/simple-server.ts`** - 🟢 **USE THIS!** Everything in one file - guaranteed to work
**`src/index.ts`** - The modular main server file (may have import issues)
**`src/routes/`** - Maps URLs to controller functions (modular version only)
**`src/controllers/`** - Handles HTTP requests and responses (modular version only)
**`src/services/`** - Contains business logic (modular version only)
**`src/data/mockData.ts`** - Our "database" with sample data (modular version only)
**`src/validation/schemas.ts`** - Validates incoming data (modular version only)

## 🐛 Troubleshooting

### Server Won't Start

**Problem:** `Error: Cannot find module` or import errors

**Solution:** Use the simple server instead:

```bash
npm run dev          # This uses simple-server.ts
# OR
npm run dev:ts-node  # Direct ts-node execution
```

### Port Already in Use

**Problem:** `EADDRINUSE: address already in use :::3000`

**Solution:**

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Then restart
npm run dev
```

### Cannot Connect in Postman

**Problem:** `Could not get any response` or connection refused

**Solution:**

1. Make sure server is running (check terminal output)
2. Use the correct URL: `http://localhost:3000/api/health`
3. Restart server: `Ctrl+C` then `npm run dev`

## 🐛 Debugging Tips

### Check Console Logs

The server logs every request and operation. Look for:

- 📝 Request logs (shows incoming requests)
- ✅ Success logs (shows successful operations)
- ❌ Error logs (shows what went wrong)

### Common Issues

**Server won't start:**

- Check if port 3000 is already in use
- Run `npm install` to ensure dependencies are installed

**404 Not Found:**

- Check the URL - make sure it includes `/api/`
- Verify the endpoint exists in the routes

**400 Bad Request:**

- Check request body format
- Ensure required fields are included
- Verify data types match the schema

## 🛠️ Development Commands

```bash
# Start development server with auto-reload
npm run dev

# Build TypeScript to JavaScript
npm build

# Start production server
npm start

# Install new dependencies
npm install <package-name>
```

## 📚 Learning Resources

- **Express.js Documentation:** <https://expressjs.com/>
- **TypeScript Documentation:** <https://www.typescriptlang.org/docs/>
- **Zod Validation:** <https://github.com/colinhacks/zod>
- **Postman Learning:** <https://learning.postman.com/>

## 🎯 Next Steps

Once comfortable with this basic setup, consider adding:

- Database integration (PostgreSQL, MongoDB)
- Authentication and authorization
- Unit and integration tests
- API documentation with Swagger
- Environment configuration
- Docker containerization

---

**Happy Coding! 🚀**
