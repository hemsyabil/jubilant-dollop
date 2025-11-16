// Site Routes - defines the URL endpoints for sites
// Routes connect URLs to controller functions

import { Router } from "express"
import { SiteController } from "../controllers/siteController"
import { validateRequest } from "../middleware/validation"
import { createSiteSchema, updateSiteSchema } from "../validation/schemas"

// Create router instance
const router = Router()

// Create controller instance
const siteController = new SiteController()

// Site Routes:

// GET /sites - Get all sites
router.get("/", siteController.getAllSites)

// GET /sites/:site_id - Get specific site
router.get("/:site_id", siteController.getSiteById)

// POST /sites - Create new site (with validation)
router.post("/", validateRequest(createSiteSchema), siteController.createSite)

// PUT /sites/:site_id - Update site (with validation)
router.put(
  "/:site_id",
  validateRequest(updateSiteSchema),
  siteController.updateSite
)

// DELETE /sites/:site_id - Delete site
router.delete("/:site_id", siteController.deleteSite)

export default router
