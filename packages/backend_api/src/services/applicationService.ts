// Business logic for Applications
// This handles all application-related operations

import {
  Application,
  CreateApplicationRequest,
  UpdateApplicationRequest,
} from "../types"
import { applicationsData, generateId } from "../data/mockData"

export class ApplicationService {
  // Get all applications
  getAllApplications(): Application[] {
    console.log("📋 Getting all applications from data")
    return applicationsData
  }

  // Get a specific application by ID
  getApplicationById(applicationId: string): Application | null {
    console.log(`🔍 Looking for application with ID: ${applicationId}`)
    const application = applicationsData.find(
      (app) => app.application_id === applicationId
    )

    if (!application) {
      console.log(`❌ Application with ID ${applicationId} not found`)
    }

    return application || null
  }

  // Create a new application
  createApplication(applicationData: CreateApplicationRequest): Application {
    // Generate a new unique ID
    const newId = generateId("APP", applicationsData)
    console.log(`✨ Creating new application with ID: ${newId}`)

    const newApplication: Application = {
      application_id: newId,
      ...applicationData,
    }

    // Add to our data array
    applicationsData.push(newApplication)
    console.log(
      `✅ Application created successfully: ${newApplication.application_name}`
    )

    return newApplication
  }

  // Update an existing application
  updateApplication(
    applicationId: string,
    updateData: UpdateApplicationRequest
  ): Application | null {
    console.log(`🔄 Updating application with ID: ${applicationId}`)

    const applicationIndex = applicationsData.findIndex(
      (app) => app.application_id === applicationId
    )

    if (applicationIndex === -1) {
      console.log(
        `❌ Application with ID ${applicationId} not found for update`
      )
      return null
    }

    // Merge existing data with update data
    applicationsData[applicationIndex] = {
      ...applicationsData[applicationIndex],
      ...updateData,
    }

    console.log(
      `✅ Application updated successfully: ${applicationsData[applicationIndex].application_name}`
    )
    return applicationsData[applicationIndex]
  }

  // Delete an application
  deleteApplication(applicationId: string): boolean {
    console.log(
      `🗑️  Attempting to delete application with ID: ${applicationId}`
    )

    const applicationIndex = applicationsData.findIndex(
      (app) => app.application_id === applicationId
    )

    if (applicationIndex === -1) {
      console.log(
        `❌ Application with ID ${applicationId} not found for deletion`
      )
      return false
    }

    const deletedApplication = applicationsData.splice(applicationIndex, 1)[0]
    console.log(
      `✅ Application deleted successfully: ${deletedApplication.application_name}`
    )

    return true
  }
}
