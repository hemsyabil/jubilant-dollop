// Instrument Controllers - handles HTTP requests and responses for instruments

import { Request, Response } from "express"
import { InstrumentService } from '../services/instrumentService.js';

// Create an instance of our service
const instrumentService = new InstrumentService()

export class InstrumentController {
  // GET /instruments - Get all instruments
  getAllInstruments = (req: Request, res: Response) => {
    try {
      const instruments = instrumentService.getAllInstruments()

      console.log(`✅ Returning ${instruments.length} instruments`)
      res.status(200).json(instruments)
    } catch (error) {
      console.error("❌ Error getting instruments:", error)
      res.status(500).json({ error: "Failed to get instruments" })
    }
  }

  // GET /instruments/:instrument_id - Get a specific instrument
  getInstrumentById = (req: Request, res: Response) => {
    try {
      const { instrument_id } = req.params
      const instrument = instrumentService.getInstrumentById(instrument_id)

      if (!instrument) {
        return res.status(404).json({ error: "Instrument not found" })
      }

      console.log(`✅ Returning instrument: ${instrument.name}`)
      res.status(200).json(instrument)
    } catch (error) {
      console.error("❌ Error getting instrument:", error)
      res.status(500).json({ error: "Failed to get instrument" })
    }
  }

  // POST /instruments - Create a new instrument
  createInstrument = (req: Request, res: Response) => {
    try {
      // req.body is already validated by middleware
      const newInstrument = instrumentService.createInstrument(req.body)

      console.log(
        `✅ Instrument created with ID: ${newInstrument.instrument_id}`
      )
      res.status(201).json(newInstrument)
    } catch (error) {
      console.error("❌ Error creating instrument:", error)
      res.status(500).json({ error: "Failed to create instrument" })
    }
  }

  // PUT /instruments/:instrument_id - Update an instrument
  updateInstrument = (req: Request, res: Response) => {
    try {
      const { instrument_id } = req.params
      const updatedInstrument = instrumentService.updateInstrument(
        instrument_id,
        req.body
      )

      if (!updatedInstrument) {
        return res.status(404).json({ error: "Instrument not found" })
      }

      console.log(`✅ Instrument updated: ${updatedInstrument.name}`)
      res.status(200).json(updatedInstrument)
    } catch (error) {
      console.error("❌ Error updating instrument:", error)
      res.status(500).json({ error: "Failed to update instrument" })
    }
  }

  // DELETE /instruments/:instrument_id - Delete an instrument
  deleteInstrument = (req: Request, res: Response) => {
    try {
      const { instrument_id } = req.params
      const deleted = instrumentService.deleteInstrument(instrument_id)

      if (!deleted) {
        return res.status(404).json({ error: "Instrument not found" })
      }

      // Return 204 (No Content) for successful deletion
      res.status(204).send()
    } catch (error) {
      console.error("❌ Error deleting instrument:", error)
      res.status(500).json({ error: "Failed to delete instrument" })
    }
  }
}
