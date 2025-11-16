// Instrument Routes - defines the URL endpoints for instruments

import { Router } from "express"
import { InstrumentController } from "../controllers/instrumentController"
import { validateRequest } from "../middleware/validation"
import {
  createInstrumentSchema,
  updateInstrumentSchema,
} from "../validation/schemas"

// Create router instance
const router = Router()

// Create controller instance
const instrumentController = new InstrumentController()

// Instrument Routes:

// GET /instruments - Get all instruments
router.get("/", instrumentController.getAllInstruments)

// GET /instruments/:instrument_id - Get specific instrument
router.get("/:instrument_id", instrumentController.getInstrumentById)

// POST /instruments - Create new instrument (with validation)
router.post(
  "/",
  validateRequest(createInstrumentSchema),
  instrumentController.createInstrument
)

// PUT /instruments/:instrument_id - Update instrument (with validation)
router.put(
  "/:instrument_id",
  validateRequest(updateInstrumentSchema),
  instrumentController.updateInstrument
)

// DELETE /instruments/:instrument_id - Delete instrument
router.delete("/:instrument_id", instrumentController.deleteInstrument)

export default router
