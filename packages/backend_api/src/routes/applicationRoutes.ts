// Application Routes - defines the URL endpoints for applications

import { Router } from "express"
import { ApplicationController } from "../controllers/applicationController"
import { validateRequest } from "../middleware/validation"
import {
  createApplicationSchema,
  updateApplicationSchema,
} from "../validation/schemas"

// Create router instance
const router = Router()

// Create controller instance
const applicationController = new ApplicationController()

// Application Routes:

// GET /applications - Get all applications
router.get("/", applicationController.getAllApplications)

// GET /applications/:application_id - Get specific application
router.get("/:application_id", applicationController.getApplicationById)

// POST /applications - Create new application (with validation)
router.post(
  "/",
  validateRequest(createApplicationSchema),
  applicationController.createApplication
)

// PUT /applications/:application_id - Update application (with validation)
router.put(
  "/:application_id",
  validateRequest(updateApplicationSchema),
  applicationController.updateApplication
)

// DELETE /applications/:application_id - Delete application
router.delete("/:application_id", applicationController.deleteApplication)

export default router
