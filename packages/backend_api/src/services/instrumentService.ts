// Business logic for Instruments
// This handles all instrument-related operations

import {
  Instrument,
  CreateInstrumentRequest,
  UpdateInstrumentRequest,
} from "../types"
import { instrumentsData, generateId } from "../data/mockData"

export class InstrumentService {
  // Get all instruments
  getAllInstruments(): Instrument[] {
    console.log("📋 Getting all instruments from data")
    return instrumentsData
  }

  // Get a specific instrument by ID
  getInstrumentById(instrumentId: string): Instrument | null {
    console.log(`🔍 Looking for instrument with ID: ${instrumentId}`)
    const instrument = instrumentsData.find(
      (inst) => inst.instrument_id === instrumentId
    )

    if (!instrument) {
      console.log(`❌ Instrument with ID ${instrumentId} not found`)
    }

    return instrument || null
  }

  // Create a new instrument
  createInstrument(instrumentData: CreateInstrumentRequest): Instrument {
    // Generate a new unique ID
    const newId = generateId("INS", instrumentsData)
    console.log(`✨ Creating new instrument with ID: ${newId}`)

    const newInstrument: Instrument = {
      instrument_id: newId,
      ...instrumentData,
      applications: instrumentData.applications || [],
    }

    // Add to our data array
    instrumentsData.push(newInstrument)
    console.log(`✅ Instrument created successfully: ${newInstrument.name}`)

    return newInstrument
  }

  // Update an existing instrument
  updateInstrument(
    instrumentId: string,
    updateData: UpdateInstrumentRequest
  ): Instrument | null {
    console.log(`🔄 Updating instrument with ID: ${instrumentId}`)

    const instrumentIndex = instrumentsData.findIndex(
      (inst) => inst.instrument_id === instrumentId
    )

    if (instrumentIndex === -1) {
      console.log(`❌ Instrument with ID ${instrumentId} not found for update`)
      return null
    }

    // Merge existing data with update data
    instrumentsData[instrumentIndex] = {
      ...instrumentsData[instrumentIndex],
      ...updateData,
    }

    console.log(
      `✅ Instrument updated successfully: ${instrumentsData[instrumentIndex].name}`
    )
    return instrumentsData[instrumentIndex]
  }

  // Delete an instrument
  deleteInstrument(instrumentId: string): boolean {
    console.log(`🗑️  Attempting to delete instrument with ID: ${instrumentId}`)

    const instrumentIndex = instrumentsData.findIndex(
      (inst) => inst.instrument_id === instrumentId
    )

    if (instrumentIndex === -1) {
      console.log(
        `❌ Instrument with ID ${instrumentId} not found for deletion`
      )
      return false
    }

    const deletedInstrument = instrumentsData.splice(instrumentIndex, 1)[0]
    console.log(`✅ Instrument deleted successfully: ${deletedInstrument.name}`)

    return true
  }
}
